import {Router} from 'express';
import { verifyJWT } from '../middlewares/authorization.js';
const router= Router();
import axios from 'axios';

async function compileAndRun(req, res, next) {
    try {
        const response = await axios.post('http://localhost:5000/run', req.body);
        
        return res.json({output:response.data.output});
    } catch (error) {
        res.status(500).json({ message: 'Error compiling code', error: error.message });
    }
}

async function compileAndRunMultiple(req, res, next) {
    try {
        const response = await axios.post('http://localhost:5000/runOntest', req.body);
        req.body.outputs = response.data.outputs;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error compiling code', error: error.message });
    }
}

import {createSubmission, getSubmissions, getSubmission, getMostRecentSubmission, EvaluateSubmission, getHeatMapData} from '../controllers/submissions.controller.js';
import { fetchTestcases } from '../controllers/testcases.controller.js';
import { getTaskName, getTasksName } from '../controllers/tasks.controller.js';

router.route('/').get(verifyJWT,getSubmissions, getTasksName);
router.route('/one').post(verifyJWT,getSubmission, getTaskName);
router.route('/compile').post(compileAndRun);
router.route('/submit').post(verifyJWT,fetchTestcases,compileAndRunMultiple,EvaluateSubmission);
router.route('/recentSubmission').get(verifyJWT,getMostRecentSubmission,getTaskName);
router.route('/heatmap').get(verifyJWT,getHeatMapData);
export default router;
