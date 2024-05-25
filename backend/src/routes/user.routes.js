import {Router} from 'express';
const router= Router();
import { verifyJWT} from '../middlewares/authorization.js';
import {registerUser, loginUser,logoutUser, refreshAccessToken, getCurrentUser, getUserType} from '../controllers/user.controller.js'

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

//secure routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
//router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
//router.route("/reset-password").post(resetUserPassword)
//router.route("/reset-password-change/:id/:token").post(resetUserPasswordChange)
router.route("/isloggedin").post(verifyJWT,getUserType)



export default router;