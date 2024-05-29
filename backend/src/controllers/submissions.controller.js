import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { Submission } from "../models/submissions.model.js";

const createSubmission = async (data) => {
    try {
        const submissionData = {
            userId: data.user._id,
            language: data.language,
            code: data.code,
            verdict: data.status,
            taskId: data.taskId
        };
        const submission = await Submission.create(submissionData);
        console.log(submission);
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}

const getSubmissions = async (req, res, next) => {
    try {
        const submissions = await Submission.find();
        return res.status(200).json(new ApiResponse(200, submissions));
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

const getSubmission = async (req, res, next) => {
    try {
        const submission = await Submission.findById(req.params.id);
        return res.status(200).json(new ApiResponse(200, submission));
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

const getUserSubmissions = async (req, res, next) => {
    try {
        const submissions = await Submission.find({ user: req.params.id });
        return res.status(200).json(new ApiResponse(200, submissions));
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

const EvaluateSubmission = async (req, res, next) => {
    try {
        const expectedOutputs = req.body.testcases.map(testcase => testcase.output);
        const outputs = req.body.outputs;
        let submissionData = {
            user: req.user,
            language: req.body.language,
            code: req.body.code,
            taskId: req.body.taskId || req.body.problem_id
        };

        for (let i = 0; i < expectedOutputs.length; i++) {
            if (outputs[i] !== expectedOutputs[i]) {
                submissionData.status = `Wrong Answer on testcase ${i + 1}`;
                await createSubmission(submissionData);
                return res.status(200).json(new ApiResponse(200, { status: "Wrong Answer", testcase: i + 1 }));
            }
        }

        submissionData.status = "Accepted";
        await createSubmission(submissionData);
        return res.status(200).json(new ApiResponse(200, { status: "Accepted" }));
    }
    catch (error) {
        next(new ApiError(400, error.message));
    }
};

export { createSubmission, getSubmissions, getSubmission, getUserSubmissions, EvaluateSubmission };
