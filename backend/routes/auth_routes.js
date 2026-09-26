import express from "express";
import { validateSignup, validateLogin } from "../middleware/authValidator.js";
import {
  signUpController,
  loginController,
} from "../controller/auth_controller.js";

const auth_router = express.Router();

auth_router.post("/signup", validateSignup, signUpController);
auth_router.post("/login", validateLogin, loginController);

export default auth_router;
