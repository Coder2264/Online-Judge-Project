import mongoose, {Schema} from "mongoose";

const taskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Task name is required"],
        trim: true
    },
    statement:{
        type: String,
        required: [true, "Task statement is required"],
        trim: true
    },
    constraints: {
        type: [String],
        default: []
    },
    format: {
        type: String,
        default: []
    },
    testcases: {
        type: [Schema.Types.Mixed],
        default: []
    },
    tag: {
        type: [String],
        default: []
    },
    timeLimit: {
        type: String,
        default: 1
    },
    memoryLimit: {
        type: String,
        default: 256
    },
}, {timestamps: true}
)

export const Task = mongoose.model("Task", taskSchema);