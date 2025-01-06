import express, { Application } from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./db/connectDB.js";
const app: Application = express();
const PORT = process.env.PORT || 3000;

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.listen(PORT, () =>{
    connectDB(); 
     console.log(`Server is running on PORT ${PORT}`)
    });