import express from "express";
import {
  login,
  signout,
  getProfile,
  changePassword,
  getDashboardStats,
} from "../controller/auth.controller.js";
import { isLogin } from "../middlewares/isLogin.js";

const authRouter = express.Router();

// Public routes
authRouter.post("/login", login);
// Protected routes
authRouter.post("/signout", isLogin, signout);
authRouter.get("/profile", isLogin, getProfile);
authRouter.put("/change-password", isLogin, changePassword);
authRouter.get("/dashboard-stats", isLogin, getDashboardStats);

export default authRouter;
