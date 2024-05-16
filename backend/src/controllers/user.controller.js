import {User} from "../models/user.model.js";
import {ApiError} from "../middlewares/ApiError.js";
import {ApiResponse} from "../middlewares/ApiResponse.js";
import bcrypt from "bcrypt";

const registerUser= async (req,res)=>{
    try {
        let {handle,fullName, email, password, dob} = req.body;
        
        const existedUser = await  User.findOne({email});
        if(existedUser){
            throw new ApiError(409, "User already exists")
        }
        let hashedpassword=await bcrypt.hash(password, 10);
        password=hashedpassword;
        const user = await User.create({
            handle,
            fullName,
            email,
            password,
            dob
        });
        const createdUser=await User.findById(user._id).select("-password");
        if(!createdUser){
            throw new ApiError(500, "Something went wrong while registering user")
        }
        
        return res.status(201).json(
            new ApiResponse(
                201,
                createdUser,
                "User Registered Successfully"
            )
        )
    } catch (error) {
        throw new ApiError(400, error.message)
    }
}

const loginUser = async (req,res)=>{
   
        const {email, password} = req.body;
        
        const user = await User.findOne({
            email
        });
        if(!user){
            throw new ApiError(404, "User not found")
        }
        
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if(!isPasswordCorrect){
            throw new ApiError(400, "Invalid Password")
        }

        //Sending the data of user to client using api rather than cookie
        const loggedInUser = await User.findById(user._id).select("-password");
        return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                {
                    user: loggedInUser,
                },
                "User Logged In Successfully"
            )
        )
}

export {
    registerUser,
    loginUser,
    }