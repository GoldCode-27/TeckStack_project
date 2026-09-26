import { signUpService } from "../service/auth_service.js";
import { loginService } from '../service/auth_service.js'
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

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const loginServices = await loginService({ email, password });

  if(loginServices){
    return res.status(200).json({
       "msg":"loggedin"
    })
  }
};
