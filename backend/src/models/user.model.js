import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    handle: {           //This is the user handle
      type: String,
      unique: true,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: [true,"password is required"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true 
    },
    dob: {
      type: Date
    },
    fullName:{
        type: String,
        trim: true,
        required: true
    },
    problemsSolved: {
        type: Number,
        default: 0
    },
    problemsAttempted: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
  });
  
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken =function(){
    return jwt.sign(
      {
        id: this._id,
        isAdmin: this.isAdmin,
        email: this.email
      }, 
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    )
}

userSchema.methods.generateRefreshToken =function(){
    return jwt.sign(
      {
        id: this._id,
      }, 
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    )
}


export const User = mongoose.model("User", userSchema)