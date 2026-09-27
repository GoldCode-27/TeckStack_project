import express from "express";
import {authMiddleware} from '../middleware/authMiddleware.js'
import { validateSignup, validateLogin } from "../middleware/authValidator.js";
import {
  signUpController,
  loginController,
  checkUser,
} from "../controller/auth_controller.js";

const auth_router = express.Router();

auth_router.post("/signup", validateSignup, signUpController);
auth_router.post("/login", validateLogin, loginController);

auth_router.post("/checkUser", authMiddleware, checkUser )

export default auth_router;
