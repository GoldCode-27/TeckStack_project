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
      success: true,
      msg: "user created successfully.",
    });
  }

  return res.status(400).json({
    success: false,
    msg: "couldn't register you, please try again",
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginService({ email, password });

  if (!user) {
    return res.status(401).json({
      success: false,
      msg: "Invalid email or password",
    });
  }

  return res.status(200).json({
    success: true,
    msg: "logged in",
    user,
  });
};


export const checkUser = async(req, res)=>{

const {first_name} = req.user.first_name;
const {last_name}= req.user.last_name;

return res.status(200).json({
  "first_name":first_name,
  "last_name":last_name
})
}

