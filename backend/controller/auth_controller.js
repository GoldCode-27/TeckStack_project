import { signUpService, loginService } from "../service/auth_service.js";

export const signUpController = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const signupServices = await signUpService({
    first_name,
    last_name,
    email,
    password,
  });

  if (signupServices) {
    return res.status(201).json({
      msg: "user created successfully.",
    });
  } else {
    return res.status(400).json({
      msg: "couldn't register you,  pleease try again",
    });
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  const loginService = await loginService({ email, password });

  next();
  return res.send("Hello from login");
};
