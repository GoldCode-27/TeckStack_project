import mysql from'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

export const pool = mysql.createPool({
    host:process.env.DB_HOST ,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    user:process.env.DB_USER,
})

export const safeQuery = async (sql,params)=>{

    const result = pool.query(sql, params);

    return result[0];
}