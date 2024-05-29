import {Router} from 'express';
import { verifyJWT } from '../middlewares/authorization.js';
const router= Router();

import {createSubmission, getSubmissions, getSubmission, getUserSubmissions, EvaluateSubmission} from '../controllers/submissions.controller.js'
import { compileAndRun, compileAndRunMultiple } from '../compiler/compiler.js';
import { fetchTestcases } from '../controllers/testcases.controller.js';

router.route('/').get(getSubmissions);
router.route('/:id').get(getSubmission);
router.route('/compile').post(compileAndRun);
router.route('/submit').post(verifyJWT,fetchTestcases,compileAndRunMultiple,EvaluateSubmission);

export default router;
