import {ApiError} from "../middlewares/ApiError.js";
import {ApiResponse} from "../middlewares/ApiResponse.js";
import {Task} from "../models/tasks.model.js";

const createTask = async (req, res, next) => {
    try {
        const { name, statement, constraints, format, testcases, tag } = req.body;
        const task = await Task.create({
            name,
            statement,
            constraints,
            format,
            testcases,
            tag
        });
        return res.status(201).json(new ApiResponse(201, task));
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

const updateTask = async (req, res, next) => {
    try {
        const {_id }= req.params;
        const {name, statement, constraints, format, testcases, tag } = req.body;
        const task = await Task.findByIdAndUpdate(_id, {
            name,
            statement,
            constraints,
            format,
            testcases,
            tag
        });
        const updatedTask = await Task.findById(_id);
        return res.status(200).json(new ApiResponse(200,updatedTask));
    }
    catch (error) {
        next(new ApiError(400, error.message));
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const task = await Task.findByIdAndDelete(_id);
        return res.status(200).json(new ApiResponse(200, task));
    }
    catch (error) {
        next(new ApiError(400, error.message));
    }
}

const getTask = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const task = await Task.findById(_id);
        return res.status(200).json(new ApiResponse(200, task));
    }
    catch (error) {
        next(new ApiError(400, error.message));
    }
}

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json(new ApiResponse(200, tasks));
    }
    catch (error) {
        next(new ApiError(400, error.message));
    }
}

export { createTask, updateTask, deleteTask, getTask, getAllTasks };