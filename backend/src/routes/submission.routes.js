import {Router} from 'express';
const router= Router();

import {createSubmission, getSubmissions, getSubmission, getUserSubmissions} from '../controllers/submissions.controller.js'

router.route('/').get(getSubmissions).post(createSubmission);
router.route('/:id').get(getSubmission);

export default router;
