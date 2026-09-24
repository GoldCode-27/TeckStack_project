import jwt from'jsonwebtoken'
import { safeQuery } from '../config/databaseConfig.js'

export const signUpService = async ({firstName, email, password})=>{

    try {
        
    const insertQuery = 'INSERT into students(firstName, email, hashed_password), values= ?,?,? '
    const result = await safeQuery(insertQuery, [firstName, email, password]);

    return result[0]
        
    } catch (error) {
        console.log("Eror when signuping you", error.message);
    }
}

export const loginService = async ({email, password})=>{

const getUserQuery =  "SELECT id, email, firstName ,hashed_password FROM students where email = ? "

const login = await safeQuery(getUserQuery, [email.trim().toLowerCase()]);


const isMatch = await jwt.compare(password, login.hashed_password );

if(isMatch){
    return res.status(200).json({
        message:'you are logged in',
        user:login
  })
 }
}