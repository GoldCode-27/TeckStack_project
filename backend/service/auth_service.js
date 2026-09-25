import jwt from'jsonwebtoken'
import bcrypt from 'bcrypt'
// import { safeQuery } from '../config/databaseConfig.js'
import { pool } from '../config/databaseConfig.js';
export const signUpService = async ({first_name, last_name, email, password})=>{
    try {
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);        
    const insertQuery = await pool.query("INSERT into users(first_name, last_name, email, password_hash) VALUES (?,?,?,?)",
    [first_name, last_name, email, hashedPassword]);
    // const result = await safeQuery(insertQuery, [first_name, last_name, email, hashedPassword]);

}catch(error){
    console.log("Something went wrong.", error.message);
 }
}

export const loginService = async ({email, password})=>{

const getUserQuery = "SELECT id, email, firstName ,hashed_password FROM students where email = ? "
const login = await safeQuery(getUserQuery, [email.trim().toLowerCase()]);
const isMatch = await jwt.compare(password, login.hashed_password);

if(isMatch){
    return res.status(200).json({
        message:'you are logged in',
        user:login
  })
 }
}