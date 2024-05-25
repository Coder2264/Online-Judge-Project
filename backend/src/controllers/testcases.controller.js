import {ApiError} from "../utilities/ApiError.js";
import {ApiResponse} from "../utilities/ApiResponse.js";
import {Testcase} from "../models/testcases.model.js";

export const createTestcase = async (req, res, next) => {
    //creates a single testcase of a single problem
    try {
        if(!req.user.isAdmin){
            throw new ApiError(403, "You are not authorized to add testcases");
        }
        const {taskId, input, output} = req.body;
        const testcase = await Testcase.create({taskId, input, output});
        return res.status(201).json(new ApiResponse(201, testcase));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}

export const getTestcases = async (req, res, next) => {
    //finds testcases of a single problem only
    try {
        const taskId = req.query.taskId;
        const testcases = await Testcase.find({taskId: taskId});
        return res.status(200).json(new ApiResponse(200, testcases));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}

export const deleteTestcase = async (req, res, next) => {
    //deletes a single testcase of a single problem
    try {
        if(!req.user.isAdmin){
            throw new ApiError(403, "You are not authorized to delete testcases");
        }
        const id = req.query.id;
        const testcase = await Testcase.findByIdAndDelete(id);
        return res.status(200).json(new ApiResponse(200, testcase, "Testcase deleted successfully"));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}

export const deleteAllTestcases = async (req, res, next) => {
    //deletes all testcases of a single problem
    try {
        if(!req.user.isAdmin){
            throw new ApiError(403, "You are not authorized to delete testcases");
        }
        const taskId = req.query.taskId;
        const testcases = await Testcase.deleteMany({taskId: taskId});
        return res.status(200).json(new ApiResponse(200, testcases, "All testcases deleted successfully"));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}

export const updateTestcase = async (req, res, next) => {
    //updates a single testcase of a single problem
    try {
        if(!req.user.isAdmin){
            throw new ApiError(403, "You are not authorized to update testcases");
        }
        const id = req.query.id;
        const {input, output} = req.body;
        const testcase = await Testcase.findByIdAndUpdate(id, {input, output}, {new: true});
        return res.status(200).json(new ApiResponse(200, testcase, "Testcase updated successfully"));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}