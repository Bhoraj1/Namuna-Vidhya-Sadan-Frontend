import express from "express";
import {
  addSubject,
  getSubjects,
  deleteSubject,
  uploadExcelResult,
  getStudentResults,
  deleteStudentResult,
  deleteAllStudentsByClass,
  uploadTerminalExamExcel,
  getTerminalExams,
  getTerminalExamDetails,
  deleteTerminalExamByStudent,
  deleteAllTerminalExamsByCategory,
  uploadFinalResultExcel,
  getFinalResults,
  deleteFinalResultByExam,
} from "../controller/result.controller.js";
import {
  configureExamMarks,
  getExamMarks,
  deleteExamMarks,
} from "../controller/examMarks.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { upload, setUploadFolder } from "../utils/upload.js";

const resultRouter = express.Router();

resultRouter.post("/subject", isLogin, addSubject);
resultRouter.get("/subject", getSubjects);
resultRouter.delete("/subject/:id", isLogin, deleteSubject);

resultRouter.post(
  "/upload-excel",
  isLogin,
  setUploadFolder("uploads/excel"),
  upload.single("excel"),
  uploadExcelResult
);
resultRouter.get("/students", getStudentResults);
resultRouter.delete("/student/:id", isLogin, deleteStudentResult);
resultRouter.delete(
  "/students/class/:class_category_id",
  isLogin,
  deleteAllStudentsByClass
);

resultRouter.post("/terminal/upload", isLogin, upload.single("excel"), uploadTerminalExamExcel);
resultRouter.get("/terminal", getTerminalExams);
resultRouter.get("/terminal/details", getTerminalExamDetails);
resultRouter.delete("/terminal/all/:exam_category_id/:class_category_id", isLogin, deleteAllTerminalExamsByCategory);
resultRouter.delete("/terminal/:student_id/:exam_category_id", isLogin, deleteTerminalExamByStudent);

resultRouter.post("/exam-marks", isLogin, configureExamMarks);
resultRouter.get("/exam-marks", getExamMarks);
resultRouter.delete("/exam-marks/:id", isLogin, deleteExamMarks);

// Final Result
resultRouter.post(
  "/final/upload",
  isLogin,
  setUploadFolder("uploads/excel"),
  upload.single("excel"),
  uploadFinalResultExcel
);
resultRouter.get("/final", getFinalResults);
resultRouter.delete("/final/:exam_instance_id/:class_category_id", isLogin, deleteFinalResultByExam);

export default resultRouter;
