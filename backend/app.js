import express from "express";
import dotenv from "dotenv";
import db from "./config/dbconnect.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import cors from "cors";
import siteRouter from "./routes/site.routes.js";
import teamRouter from "./routes/team.routes.js";
import categoryRouter from "./routes/category.routes.js";
import contentRouter from "./routes/content.routes.js";
import academicRouter from "./routes/academic.routes.js";
import resultRouter from "./routes/result.routes.js";
import examCategoryRouter from "./routes/examCategory.routes.js";

dotenv.config();
const app = express();
app.use(cookieParser());
// To parse JSON request bodies
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://namunavidhyasadan.com",
      "https://admin.namunavidhyasadan.com",
    ],
    credentials: true,
  }),
);

// Serve static files from uploads directory
app.use("/uploads", express.static("uploads"));

// app.use(express.urlencoded({ extended: true }));

const port = process.env.port;

app.use("/api/auth", authRouter);
app.use("/api/site", siteRouter);
app.use("/api/team", teamRouter);
app.use("/api/category", categoryRouter);
app.use("/api/content", contentRouter);
app.use("/api/academic", academicRouter);
app.use("/api/result", resultRouter);
app.use("/api/exam", examCategoryRouter);
app.use(globalErrorHandler);

// Arrow Functioin is used here.
app.listen(port, async () => {
  console.log(`server is running in port ${port}`);
  try {
    await db.query("SELECT 1");
    console.log("MySQL Connected Successfully!");
  } catch (err) {
    console.error("MySQL Connection Failed:", err.message);
  }
});
