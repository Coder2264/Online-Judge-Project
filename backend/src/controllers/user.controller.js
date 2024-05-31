import { User } from "../models/user.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary"

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


const registerUser = asyncHandler(async (req, res) => {

    //take user details from frontend
    let { handle, fullName, email, password, dob } = req.body;

    // Validate fields
    if (!handle || !fullName || !email || !password || !dob) {
        throw new ApiError(400, "All fields are required");
    }

    // Validate email format
    let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format");
    }

    //check whether email exists in database
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    //create user in database
    let hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        handle,
        fullName,
        email,
        password,
        dob
    });

    //check whether user has been created or not
    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    //return response
    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User Registered Successfully"
        )
    );
});

const loginUser = asyncHandler(async (req, res) => {

    //take user details from frontend
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
        throw new ApiError(400, "password and email are required")
    }

    // Finding user in database
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Checking if password is correct

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Password");
    }

    //const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)
    user.password = undefined;
    user.refreshToken = undefined;
    let { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    const options = {
        httpOnly: true,

    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user
                },
                "User logged In Successfully"
            )
        )
});


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )
    return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        console.log(decodedToken);


        const user = await User.findById(decodedToken?._id);
        
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            // secure: true
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)
        

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: refreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ))
})

const getUserType = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                isAdmin: req.user.isAdmin
            },
            "User type fetched successfully"
        ))
})

const uploadProfilePhoto = asyncHandler(async (req, res) => {
    if(req.file){
        const imageUrl = req.file.path;
        const userId= req.user._id;

        // Fetch the user
        const user = await User.findById(userId);

        // If user already has a photo, delete it from Cloudinary
        if (user.photo) {
            let publicId = user.photo.split('/').pop().split('.')[0];
            publicId= 'onlineJudge/'+publicId;
            console.log(publicId);
            await cloudinary.uploader.destroy(publicId);
        }

        // Update the photo field
        user.photo = imageUrl;

        // Save the user
        await user.save();

        res.json(new ApiResponse(
            200,
            {imageUrl},
            "Profile photo uploaded successfully"
        ));
    } else {
        throw new ApiError(400, "Please upload a file")
    }
})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    getUserType,
    uploadProfilePhoto
}