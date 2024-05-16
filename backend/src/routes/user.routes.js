import {Router} from 'express';
const router= Router();

import {registerUser, loginUser} from '../controllers/user.controller.js'

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)



export default router;