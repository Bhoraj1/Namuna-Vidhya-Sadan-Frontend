import express from "express";
import {
  createResult,
  getResults,
  updateResult,
  deleteResult,
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  createAchievement,
  getAchievements,
  updateAchievement,
  deleteAchievement,
  createQuestionBank,
  getQuestionBanks,
  updateQuestionBank,
  deleteQuestionBank,
  createAcademicYear,
  getAcademicYears,
  updateAcademicYear,
  deleteAcademicYear,
} from "../controller/academic.controller.js";
import { upload, setUploadFolder } from "../utils/upload.js";
import { isLogin } from "../middlewares/isLogin.js";

const academicRouter = express.Router();

// Result
academicRouter.post(
  "/result",
  isLogin,
  setUploadFolder("uploads/result"),
  upload.array("attachments", 50),
  createResult,
);
academicRouter.get("/result", getResults);
academicRouter.put(
  "/result/:id",
  isLogin,
  setUploadFolder("uploads/result"),
  upload.array("attachments", 50),
  updateResult,
);
academicRouter.delete("/result/:id", isLogin, deleteResult);

// Event
academicRouter.post(
  "/event",
  isLogin,
  setUploadFolder("uploads/event"),
  upload.single("pdf"),
  createEvent,
);
academicRouter.get("/event", getEvents);
academicRouter.put(
  "/event/:id",
  isLogin,
  setUploadFolder("uploads/event"),
  upload.single("pdf"),
  updateEvent,
);
academicRouter.delete("/event/:id", isLogin, deleteEvent);

// Achievement
academicRouter.post(
  "/achievement",
  isLogin,
  setUploadFolder("uploads/achievement"),
  upload.array("images", 20),
  createAchievement,
);
academicRouter.get("/achievement", getAchievements);
academicRouter.put(
  "/achievement/:id",
  isLogin,
  setUploadFolder("uploads/achievement"),
  upload.array("images", 20),
  updateAchievement,
);
academicRouter.delete("/achievement/:id", isLogin, deleteAchievement);

// Question Bank
academicRouter.post(
  "/question-bank",
  isLogin,
  setUploadFolder("uploads/question-bank"),
  upload.single("file"),
  createQuestionBank,
);
academicRouter.get("/question-bank", getQuestionBanks);
academicRouter.put(
  "/question-bank/:id",
  isLogin,
  setUploadFolder("uploads/question-bank"),
  upload.single("file"),
  updateQuestionBank,
);
academicRouter.delete("/question-bank/:id", isLogin, deleteQuestionBank);

// Academic Year
academicRouter.post("/academic-year", isLogin, createAcademicYear);
academicRouter.get("/academic-year", getAcademicYears);
academicRouter.put("/academic-year/:id", isLogin, updateAcademicYear);
academicRouter.delete("/academic-year/:id", isLogin, deleteAcademicYear);

export default academicRouter;
