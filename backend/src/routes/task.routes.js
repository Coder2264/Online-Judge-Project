import {Router} from 'express';
const router= Router();

import {createTask, getAllTasks, getTask, updateTask, deleteTask} from '../controllers/tasks.controller.js'

router.route('/').get(getAllTasks).post(createTask);
router.route('/:_id').get(getTask).put(updateTask).delete(deleteTask);

export default router;
