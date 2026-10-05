import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req, res, next) => {

  const authorazation = req.headers.authorization;

  const jwtSecret = process.env.JWT_SECRETE
  if (!jwtSecret || !authorazation) {
    res.status(401).json({
    msg: "Authentication required.",
    });
  }

  const token = authorazation;

  try {
    const { first_name, last_name } = jwt.verify(token, jwtSecret);
    req.user = { first_name, last_name };
    res.status(200).json({
      msg: "Autorized user",
      first_name,
      last_name,
    });
  } catch (error) {
    return res.status(401).json({
      msg: "unautorized user",
    });
  }
  next();
};