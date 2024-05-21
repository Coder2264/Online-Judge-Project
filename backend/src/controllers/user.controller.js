import {User} from "../models/user.model.js";
import {ApiError} from "../middlewares/ApiError.js";
import {ApiResponse} from "../middlewares/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res, next) => {
    try {
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
            password : hashedpassword,
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
    } catch (error) {
        next(new ApiError(400, error.message));
    }
};

const loginUser = async (req, res, next) => {
    try {
        //take user details from frontend
        const {email, password} = req.body;

        //Validation
        if(!email || !password){
            throw new ApiError(400,"password and email are required")
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

        user.password=null;

        const token = jwt.sign({id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
        const options={
            expires: new Date(Date.now() + 24*60*60*1000),
            httpOnly:true
        }
        return res
            .status(200)
            .cookie("accessToken",token,options)
            .json(
                new ApiResponse(
                    200, 
                    {
                        user,
                        token
                    },
                    "User Logged In Successfully"
                )
            );
    } catch (error) {
        next(new ApiError(400, error.message));
    }
};



export {
    registerUser,
    loginUser,
}