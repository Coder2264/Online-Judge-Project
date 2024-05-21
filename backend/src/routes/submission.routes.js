import {Router} from 'express';
const router= Router();

import {createSubmission, getSubmissions, getSubmission, getUserSubmissions, EvaluateSubmission} from '../controllers/submissions.controller.js'

router.route('/').get(getSubmissions).post(createSubmission);
router.route('/:id').get(getSubmission);
router.route('/submit').post(EvaluateSubmission);

export default router;
