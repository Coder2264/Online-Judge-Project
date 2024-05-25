import {Router} from 'express';
const router= Router();
import { verifyJWT } from '../middlewares/authorization.js';

import {createTask, getAllTasks, getTask, updateTask, deleteTask} from '../controllers/tasks.controller.js';
import { deleteAllTestcases } from '../controllers/testcases.controller.js';

router.route('/').get(getAllTasks).post(verifyJWT,createTask);
router.route('/:_id').get(getTask).put(verifyJWT,updateTask).delete(verifyJWT,deleteTask,deleteAllTestcases);

export default router;
