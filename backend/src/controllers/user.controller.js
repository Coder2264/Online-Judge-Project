import {User} from "../models/user.model.js";
import {ApiError} from "../middlewares/ApiError.js";


const registerUser= async (req,res)=>{
    try {
        const {Handle,FullName, Email, Password, DOB} = req.body;
        const user = await User.create({
            Handle,
            FullName,
            Email,
            Password,
            DOB
        });

        return res.status(201).json([user, "User Registered Successfully"])
    } catch (error) {
        throw new ApiError(400, error.message)
    }
}

const loginUser = async (req,res)=>{
    try {
        const {Email, Password} = req.body;
        const user = await User.findOne({
            Email
        });
        if(!user){
            throw new ApiError(404, "User not found")
        }
        const isPasswordCorrect = await user.isPasswordCorrect(Password);
        if(!isPasswordCorrect){
            throw new ApiError(400, "Invalid Password")
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        res.cookie("accessToken", accessToken, {httpOnly: true});
        res.cookie("refreshToken", refreshToken, {httpOnly: true});
        return res.status(200).json([user,"User Logged In Successfully"]);
    } catch (error) {
        throw new ApiError(400, error.message)
    }
}


/*const isLoggedIn = (req,res) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                throw new ApiError(409, "Not Logged In");
            }
            else{
                return res
                .status(200)
                .json("User is Logged In");
            }
        })
    } catch (error) {
        throw new ApiError(401, error)
    }
    
}*/


export {
    registerUser,
    loginUser,
    }