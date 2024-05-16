import {ApiError} from "../middlewares/ApiError.js";
import {ApiResponse} from "../middlewares/ApiResponse.js";
import {Submission} from "../models/submissions.model.js";

const createSubmission = async (req, res) => {
    try {
        const {user, task, code, language, verdict, execTime, memory, submissionTime } = req.body;
        const submission = await Submission.create({
            user,
            task,
            code,
            language,
            verdict,
            execTime,
            memory,
            submissionTime
        });
        return res.status(201).json(new ApiResponse(201, submission));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}

const getSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find();
        return res.status(200).json(new ApiResponse(200, submissions));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}

const getSubmission = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        return res.status(200).json(new ApiResponse(200, submission));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}

const getUserSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({user: req.params.id});
        return res.status(200).json(new ApiResponse(200, submissions));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}

export {createSubmission, getSubmissions, getSubmission, getUserSubmissions};
