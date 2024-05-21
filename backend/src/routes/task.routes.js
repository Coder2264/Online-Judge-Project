import {Router} from 'express';
const router= Router();
import { verifyJWT } from '../middlewares/jwt.js';

import {createTask, getAllTasks, getTask, updateTask, deleteTask} from '../controllers/tasks.controller.js'

router.route('/').get(verifyJWT,getAllTasks).post(createTask);
router.route('/:_id').get(getTask).put(updateTask).delete(deleteTask);

export default router;
