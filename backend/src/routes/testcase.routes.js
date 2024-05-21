import {Router} from 'express';
import { verifyJWT } from '../middlewares/jwt.js';
const router= Router();

import {createTestcase, getTestcases, updateTestcase, deleteTestcase} from '../controllers/testcases.controller.js'

router.route('/').post(createTestcase);
router.route('').get(getTestcases).put(updateTestcase).delete(deleteTestcase);

export default router;