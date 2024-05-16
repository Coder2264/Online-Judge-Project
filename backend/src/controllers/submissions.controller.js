import {ApiError} from "../middlewares/ApiError.js";
import {ApiResponse} from "../middlewares/ApiResponse.js";
import {Submission} from "../models/submissions.model.js";

const createSubmission = async (req, res) => {
    try {
        const { code, language, task } = req.body;
        const submission = await Submission.create({
            code,
            language,
            task
        });
        return res.status(201).json(new ApiResponse(201, submission));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}