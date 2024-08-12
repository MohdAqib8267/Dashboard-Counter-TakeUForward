import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { eventRouter } from "./routes/eventRoute.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;  

app.use(express.json());
app.use(cors());

//routes

//user Authentication
app.use('/api',eventRouter);

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})