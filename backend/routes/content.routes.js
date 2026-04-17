import express from "express";
import {
  createGallery,
  getGalleries,
  updateGallery,
  deleteGallery,
  createNotice,
  getNotices,
  updateNotice,
  deleteNotice,
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  createVacancy,
  getVacancies,
  updateVacancy,
  deleteVacancy,
} from "../controller/content.controller.js";
import { upload, setUploadFolder } from "../utils/upload.js";
import { isLogin } from "../middlewares/isLogin.js";

const contentRouter = express.Router();

// Gallery
contentRouter.post(
  "/gallery",
  isLogin,
  setUploadFolder("uploads/gallery"),
  upload.array("images", 50),
  createGallery
);
contentRouter.get("/gallery", getGalleries);
contentRouter.put(
  "/gallery/:id",
  isLogin,
  setUploadFolder("uploads/gallery"),
  upload.array("images", 50),
  updateGallery
);
contentRouter.delete("/gallery/:id", isLogin, deleteGallery);

// Notice
contentRouter.post(
  "/notice",
  isLogin,
  setUploadFolder("uploads/notice"),
  upload.single("attachment"),
  createNotice
);
contentRouter.get("/notice", getNotices);
contentRouter.put(
  "/notice/:id",
  isLogin,
  setUploadFolder("uploads/notice"),
  upload.single("attachment"),
  updateNotice
);
contentRouter.delete("/notice/:id", isLogin, deleteNotice);

// Blog
contentRouter.post(
  "/blog",
  isLogin,
  setUploadFolder("uploads/blog"),
  upload.single("image"),
  createBlog
);
contentRouter.get("/blog", getBlogs);
contentRouter.put(
  "/blog/:id",
  isLogin,
  setUploadFolder("uploads/blog"),
  upload.single("image"),
  updateBlog
);
contentRouter.delete("/blog/:id", isLogin, deleteBlog);

// Vacancy
contentRouter.post("/vacancy", isLogin, createVacancy);
contentRouter.get("/vacancy", getVacancies);
contentRouter.put("/vacancy/:id", isLogin, updateVacancy);
contentRouter.delete("/vacancy/:id", isLogin, deleteVacancy);

export default contentRouter;
