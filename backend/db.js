import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config();
export const db=await mysql.createPool({
        host:process.env.host,
        user:process.env.user,
        password:process.env.password,
        database:process.env.dbname,
        waitForConnections:true,
        connectionLimit:10
    });
console.log("database connected");