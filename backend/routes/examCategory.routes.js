import express from "express";
import {
  createExamInstance,
  getExamInstances,
  updateExamInstance,
  deleteExamInstance,
} from "../controller/examCategory.controller.js";
import { isLogin } from "../middlewares/isLogin.js";

const examCategoryRouter = express.Router();

examCategoryRouter.post("/instance", isLogin, createExamInstance);
examCategoryRouter.get("/instance", getExamInstances);
examCategoryRouter.put("/instance/:id", isLogin, updateExamInstance);
examCategoryRouter.delete("/instance/:id", isLogin, deleteExamInstance);

export default examCategoryRouter;
