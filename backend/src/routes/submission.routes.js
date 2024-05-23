import {Router} from 'express';
import { verifyJWT } from '../middlewares/authorization.js';
const router= Router();

import {createSubmission, getSubmissions, getSubmission, getUserSubmissions, EvaluateSubmission} from '../controllers/submissions.controller.js'

router.route('/').get(getSubmissions).post(verifyJWT,createSubmission);
router.route('/:id').get(getSubmission);
router.route('/submit').post(EvaluateSubmission);

export default router;
