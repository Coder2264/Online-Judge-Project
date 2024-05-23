import {Router} from 'express';
import { verifyJWT } from '../middlewares/authorization.js';
const router= Router();

import {createTestcase, getTestcases, updateTestcase, deleteTestcase} from '../controllers/testcases.controller.js'

router.route('/').post(verifyJWT,createTestcase);
router.route('').get(getTestcases).put(verifyJWT,updateTestcase).delete(verifyJWT,deleteTestcase);

export default router;