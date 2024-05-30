import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { Submission } from "../models/submissions.model.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

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

const getMostRecentSubmission = async (req, res, next) => {
    try {
        const userId = req.user._id;
        //console.log(userId);
        const submissions = await Submission.find({ userId: userId }).sort({ submissionTime: -1 }).limit(1);
        req.body.submission = submissions[0];
        req.body.handle = req.user.handle;
        next();
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

const getUserStats = asyncHandler(async (req, res) => {

    let profile = JSON.parse(JSON.stringify(req.user));
    profile.problemsSolved = await Submission.countDocuments({ userId: req.user._id, verdict: "Accepted" });

    const submissions = await Submission.find({ userId: req.user._id });
    const uniqueProblemIds = [...new Set(submissions.map(submission => String(submission.problemId)))];
    profile.problemsAttempted = uniqueProblemIds.length;

    //console.log(profile);
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            profile,
            "Profile data fetched successfully"
        ))
})

const getHeatMapData = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const endDate = new Date(); // Today, 30 May 2024
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 1);
    startDate.setDate(endDate.getDate() + 1); // 31 May 2023
    const submissionsPerDay = await Submission.aggregate([
        {
            $match: {
                userId: userId,
                submissionTime: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: "$submissionTime" },
                    month: { $month: "$submissionTime" },
                    day: { $dayOfMonth: "$submissionTime" }
                },
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                date: {
                    $dateFromParts: {
                        year: '$_id.year',
                        month: '$_id.month',
                        day: '$_id.day'
                    }
                },
                count: {
                    $min: {
                        $cond: [
                            { $gt: ['$count', 4] },
                            4,
                            '$count'
                        ]
                    }
                }
            }
        },
        {
            $sort: { date: 1 }
        }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            submissionsPerDay,
            "Heatmap data fetched successfully"
        ))
})

export { createSubmission, getSubmissions, getSubmission, getMostRecentSubmission, EvaluateSubmission, getUserStats, getHeatMapData };
