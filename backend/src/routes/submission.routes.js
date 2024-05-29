import {Router} from 'express';
import { verifyJWT } from '../middlewares/authorization.js';
const router= Router();

import {createSubmission, getSubmissions, getSubmission, getMostRecentSubmission, EvaluateSubmission} from '../controllers/submissions.controller.js'
import { compileAndRun, compileAndRunMultiple } from '../compiler/compiler.js';
import { fetchTestcases } from '../controllers/testcases.controller.js';
import { getTaskName } from '../controllers/tasks.controller.js';

router.route('/').get(getSubmissions);
//router.route('/:id').get(getSubmission);
router.route('/compile').post(compileAndRun);
router.route('/submit').post(verifyJWT,fetchTestcases,compileAndRunMultiple,EvaluateSubmission);
router.route('/recentSubmission').get(verifyJWT,getMostRecentSubmission,getTaskName);
export default router;
