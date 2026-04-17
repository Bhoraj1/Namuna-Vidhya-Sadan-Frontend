import express from "express";
import {
  createTeamMember,
  getTeamMembers,
  updateTeamMember,
  deleteTeamMember,
} from "../controller/team.controller.js";
import { upload, setUploadFolder } from "../utils/upload.js";
import { isLogin } from "../middlewares/isLogin.js";

const teamRouter = express.Router();

teamRouter.post(
  "/",
  isLogin,
  setUploadFolder("uploads/team"),
  upload.single("image"),
  createTeamMember
);
teamRouter.get("/", getTeamMembers);
teamRouter.put(
  "/:id",
  isLogin,
  setUploadFolder("uploads/team"),
  upload.single("image"),
  updateTeamMember
);
teamRouter.delete("/:id", isLogin, deleteTeamMember);

export default teamRouter;
