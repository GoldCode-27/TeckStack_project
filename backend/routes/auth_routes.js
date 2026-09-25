import express from'express'
import {validateSignup, validateLogin} from'../middleware/authValidator.js'
import { signUpController, loginController } from '../controller/auth_controller.js';
import { loginService, signUpService } from '../service/auth_service.js';
const auth_router = express.Router();

auth_router.post('/signup',validateSignup, signUpController, signUpService );
auth_router.post('/login', validateLogin, loginController, loginService);

export default auth_router;