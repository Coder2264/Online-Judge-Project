import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    Handle: {           //This is the user handle
      type: String,
      trim: true,
      required: true
    },
    Password: {
      type: String,
      required: [true,"Password is required"]
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true 
    },
    DOB: {
      type: Date
    },
    FullName:{
        type: String,
        trim: true,
        required: true
    }
  });
  
userSchema.pre("save", async function (next) {
    if(!this.isModified("Password")) return next();

    this.Password = await bcrypt.hash(this.Password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.Password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            Email: this.Email,
            Handle: this.Handle
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)