import {ApiError} from "../middlewares/ApiError.js";
import {ApiResponse} from "../middlewares/ApiResponse.js";
import {Testcase} from "../models/testcases.model.js";

export const createTestcase = async (req, res, next) => {
    //creates a single testcase of a single problem
    try {
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
        const id = req.query.id;
        const testcase = await Testcase.findByIdAndDelete(id);
        return res.status(200).json(new ApiResponse(200, testcase, "Testcase deleted successfully"));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}

export const updateTestcase = async (req, res, next) => {
    //updates a single testcase of a single problem
    try {
        const id = req.query.id;
        const {input, output} = req.body;
        const testcase = await Testcase.findByIdAndUpdate(id, {input, output}, {new: true});
        return res.status(200).json(new ApiResponse(200, testcase, "Testcase updated successfully"));
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
}