<<<<<<< HEAD
import express from'express'
// import dotenv from'dotenv'


import { pool } from './config/databaseConfig.js';
import mainRouter from'./routes/mainRouter.js'
const app = express();

// dotenv.config();
app.use(express.json())
app.use('/api', mainRouter)


const  PORT = process.env.port

const StartServer = async ()=>{

    const connection = await pool.getConnection();
      console.log("DB connected successfully.");
      connection.release();

      app.listen(PORT, (err)=>{
        if(err){
            console.log("Server is not established", err.message);
        }
        console.log(`Server is running on port:${PORT}`)
      })


}

 StartServer();
=======
console.log("Hello, teams");
>>>>>>> d59c5e29942318ba0f77a5b5648daa84089564c6
