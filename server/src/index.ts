import express, { Application } from "express";
import "dotenv/config";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import restaurantRoute from "./routes/restaurant.route.js";
import menuRoute from "./routes/menu.route.js";
import orderRoute from "./routes/order.route.js";
import connectDB from "./db/connectDB.js";
import bodyPaser from "body-parser"
import cookieParser from "cookie-parser";
import path from "path"

const app: Application = express();
const PORT = process.env.PORT || 3000;
const DIRNAME=path.resolve();
// * Middleware for any project
app.use(bodyPaser.json({limit:'10mb'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true,limit:'10mb' }));
app.use(cookieParser());

const corsOptions={
    origin:["http://localhost:5173",'https://dish-dash-ten.vercel.app'],
    credentials:true,
} 
app.use(cors(corsOptions));
// api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

app.use(express.static(path.join(DIRNAME,"/client/dist")));
app.use("*",(_,res)=>{
    res.sendFile(path.resolve(DIRNAME,"client","dist","index.html"));
})

app.get("/",(req,res)=>{
    res.send("API Working with /api/v1");
});

app.listen(PORT, () =>{
    connectDB(); 
     console.log(`Server is running on PORT ${PORT}`)
    });