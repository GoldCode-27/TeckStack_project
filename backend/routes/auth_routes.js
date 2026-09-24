import express from'express'
import {signUp_Validator, login_Validator} from'../middleware/authValidator.js'
import { signUpController, loginController } from '../controller/auth_controller.js';
const auth_router = express.Router();

auth_router.post('/signup',signUp_Validator, signUpController );
auth_router.post('/login', login_Validator, loginController);

export default auth_router;