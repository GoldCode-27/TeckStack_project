import mysql from'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

export const pool = mysql.createPool({
    host:process.env.DB_HOST ,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    user:process.env.DB_USER,
})


const ensureParams = params => {
  if (params === undefined || params === null) {
    throw new Error('SQL parameters are required');
  }
  const isArray = Array.isArray(params);
  const isObject = !isArray && typeof params === 'object';
  if (!isArray && !isObject) {
    throw new Error('SQL parameters must be an array or object');
  }
};

export const safeQuery = async (sql, params) => {
  if (typeof sql !== 'string' || sql.trim().length === 0) {
    throw new Error('SQL query must be a non-empty string');
  }
  ensureParams(params);
  const [result] = await pool.execute(sql, params);
  return result;
};
