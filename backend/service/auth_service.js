import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { safeQuery, pool } from "../config/databaseConfig.js";

export const signUpService = async ({
  first_name,
  last_name,
  email,
  password,
}) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users(first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)",
      [first_name, last_name, email, hashedPassword],
    );
    return result;
  } catch (error) {
    console.log("Something went wrong.", error.message);
    return null;
  }
};

export const loginService = async ({ email, password }) => {
  const getUserQuery =
    "SELECT user_id, email, first_name, last_name, password_hash FROM users WHERE email = ?";
  const users = await safeQuery(getUserQuery, [email]);

  if (!users || users.length === 0) {

    return null;
  }

  const login = users[0];
  const isMatch = await bcrypt.compare(password, login.password_hash);

  const payload ={
    first_name:users.first_name,
    last_name: users.last_name
  }
  const token = jwt.sign(payload, "secrete_key")

  if (!isMatch) {
    return null;
  }

  return {
    user_id: login.user_id,
    email: login.email,
    first_name: login.first_name,
    last_name: login.last_name,
    token:token
  };
};
