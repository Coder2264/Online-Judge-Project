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
        type: [Schema.Types.Mixed],
        default: []
    },
    format: {
        type: [String],
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
}, {timestamps: true}
)

export const Task = mongoose.model("Task", taskSchema);