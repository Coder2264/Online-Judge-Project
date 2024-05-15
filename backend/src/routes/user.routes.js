import {Router} from 'express';
const router= Router();

import {registerUser, loginUser} from '../controllers/user.controller.js'

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

//Secure Routes
//router.route("/isloggedin").post(isLoggedIn)

export default router;