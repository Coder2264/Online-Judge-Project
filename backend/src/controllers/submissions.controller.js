import {ApiError} from "../middlewares/ApiError.js";
import {ApiResponse} from "../middlewares/ApiResponse.js";
import {Submission} from "../models/submissions.model.js";

const createSubmission = async (req, res, next) => {
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
        next(new ApiError(400, error.message));
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
        const submissions = await Submission.find({user: req.params.id});
        return res.status(200).json(new ApiResponse(200, submissions));
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

const EvaluateSubmission = async (req, res, next) => {
    try {
        //console.log(req);
        let data={
            sourceCode:"int main(){\n    int a,b;\n    scanf(\"%d %d\",&a,&b);\n    printf(\"%d\",a+b);\n    return 0;\n}",
            status:"AC",
            time:"0.1s",
            memory:"64MB",
            message:"Accepted",
            submissionTime: "2021-09-01T12:00:00Z",
            language:"C",
            User:"Tourist",
            problemName:"A+B"
        };

        return res.status(200).json(new ApiResponse(200, data ,"Submission evaluated successfully"));
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

export {createSubmission, getSubmissions, getSubmission, getUserSubmissions, EvaluateSubmission};
