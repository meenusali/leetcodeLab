import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/executeCode.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import cors from "cors";


dotenv.config();
const app = express();
app.use(
    cors({
      origin: process.env.FRONT_END_URL,
      credentials: true,
    })
  );
console.log("process.env.FRONT_END_URL ",typeof(process.env.FRONT_END_URL))
app.use(express.json());
app.use(cookieParser());

app.get("/" , (req , res)=>{
    res.send("Hello Guys welcome to leetlab");
})


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code", executionRoute);
app.use("/api/v1/submission", submissionRoutes)

app.use("/api/v1/playlist" , playlistRoutes)
app.use("/api/v1/profile" , profileRoutes)

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
  // Server started successfully
});