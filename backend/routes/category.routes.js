import express from "express";
import {
  createGalleryCategory,
  getGalleryCategories,
  deleteGalleryCategory,
  createNoticeCategory,
  getNoticeCategories,
  deleteNoticeCategory,
  createBlogCategory,
  getBlogCategories,
  deleteBlogCategory,
  createVacancyCategory,
  getVacancyCategories,
  deleteVacancyCategory,
  createTeamCategory,
  getTeamCategories,
  deleteTeamCategory,
  createClassCategory,
  getClassCategories,
  deleteClassCategory,
} from "../controller/category.controller.js";
import { isLogin } from "../middlewares/isLogin.js";

const categoryRouter = express.Router();

// Gallery Categories
categoryRouter.post("/gallery", isLogin, createGalleryCategory);
categoryRouter.get("/gallery", getGalleryCategories);
categoryRouter.delete("/gallery/:id", isLogin, deleteGalleryCategory);

// Notice Categories
categoryRouter.post("/notice", isLogin, createNoticeCategory);
categoryRouter.get("/notice", getNoticeCategories);
categoryRouter.delete("/notice/:id", isLogin, deleteNoticeCategory);

// Blog Categories
categoryRouter.post("/blog", isLogin, createBlogCategory);
categoryRouter.get("/blog", getBlogCategories);
categoryRouter.delete("/blog/:id", isLogin, deleteBlogCategory);

// Vacancy Categories
categoryRouter.post("/vacancy", isLogin, createVacancyCategory);
categoryRouter.get("/vacancy", getVacancyCategories);
categoryRouter.delete("/vacancy/:id", isLogin, deleteVacancyCategory);

// Team Categories
categoryRouter.post("/team", isLogin, createTeamCategory);
categoryRouter.get("/team", getTeamCategories);
categoryRouter.delete("/team/:id", isLogin, deleteTeamCategory);

// Class Categories
categoryRouter.post("/class", isLogin, createClassCategory);
categoryRouter.get("/class", getClassCategories);
categoryRouter.delete("/class/:id", isLogin, deleteClassCategory);

export default categoryRouter;
