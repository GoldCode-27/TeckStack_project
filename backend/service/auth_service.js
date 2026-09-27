import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { safeQuery, pool } from "../config/databaseConfig.js";

// function to check a user via email address
const getUserByEmail = async (email) => {
  const getQuery = "SELECT first_name FROM users WHERE email = ?";
  const result = await safeQuery(getQuery, [email]);
  return result; 
};

export const signUpService = async ({
  first_name,
  last_name,
  email,
  password,
}) => {
  try {
    // 1. checking if the user is already exist via email
    const existingUser = await getUserByEmail(email);

    if (existingUser && existingUser.length > 0) {
      throw new Error("User already exists with this email.");
    }

    // 2. password Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. register new user
    const [result] = await pool.query(
      "INSERT INTO users(first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)",
      [first_name, last_name, email, hashedPassword]
    );

    return result;
  } catch (error) {
    console.log("Something went wrong.", error.message);
    throw error; 
  }
};

export const loginService = async ({ email, password }) => {
  try {
    const getUserQuery =
      "SELECT user_id, email, first_name, last_name, password_hash FROM users WHERE email = ?";
    const users = await safeQuery(getUserQuery, [email]);

    // 1. checking users if not existed and return null
    if (!users || users.length === 0) {
      return null;
    }

    const user = users[0];

    // 2. checking the password is matched or not
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return null;
    }

    // 3. ፓስወርዱ ትክክል ከሆነ ብቻ Token መስራት
    const payload = {
      user_id: user.user_id, // user_id መካተቱ ለቀጣይ ጥያቄዎች ይጠቅማል
      first_name: user.first_name,
      last_name: user.last_name
    };

    const secretKey = process.env.JWT_SECRET || "secret_key";
    const generatedToken = jwt.sign(payload, secretKey, { expiresIn: '1d' });

    // 4. የተጠቃሚውን መረጃ ከ Token ጋር መመለስ
    return {
      user_id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      token: generatedToken
    };
  } catch (error) {
    console.log("Login error:", error.message);
    return null;
  }
};