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
    }
  });
  
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)