import {Router} from 'express';
import { verifyJWT } from '../middlewares/authorization.js';
const router= Router();

import {createSubmission, getSubmissions, getSubmission, getMostRecentSubmission, EvaluateSubmission, getHeatMapData} from '../controllers/submissions.controller.js'
import { compileAndRun, compileAndRunMultiple } from '../compiler/compiler.js';
import { fetchTestcases } from '../controllers/testcases.controller.js';
import { getTaskName, getTasksName } from '../controllers/tasks.controller.js';

router.route('/').get(verifyJWT,getSubmissions, getTasksName);
router.route('/one').post(verifyJWT,getSubmission, getTaskName);
router.route('/compile').post(compileAndRun);
router.route('/submit').post(verifyJWT,fetchTestcases,compileAndRunMultiple,EvaluateSubmission);
router.route('/recentSubmission').get(verifyJWT,getMostRecentSubmission,getTaskName);
router.route('/heatmap').get(verifyJWT,getHeatMapData);
export default router;
