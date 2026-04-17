import express from "express";
import {
  createHomeSlider,
  getHomeSliders,
  deleteHomeSlider,
  createReview,
  getReviews,
  updateReview,
  deleteReview,
  createFaq,
  getFaqs,
  updateFaq,
  deleteFaq,
} from "../controller/site.controller.js";
import { upload, setUploadFolder } from "../utils/upload.js";
import { isLogin } from "../middlewares/isLogin.js";

const siteRouter = express.Router();

// Home Slider Routes
siteRouter.post(
  "/home-slider",
  isLogin,
  setUploadFolder("uploads/home_slider"),
  upload.array("images", 10),
  createHomeSlider
);
siteRouter.get("/home-slider", getHomeSliders);
siteRouter.delete("/home-slider/:id", isLogin, deleteHomeSlider);

// Review Routes
siteRouter.post(
  "/reviews",
  setUploadFolder("uploads/reviews"),
  upload.single("image"),
  createReview
);
siteRouter.get("/reviews", getReviews);
siteRouter.patch(
  "/reviews/:id",
  isLogin,
  setUploadFolder("uploads/reviews"),
  upload.single("image"),
  updateReview
);
siteRouter.delete("/reviews/:id", isLogin, deleteReview);

// FAQ Routes
siteRouter.post("/faqs", isLogin, createFaq);
siteRouter.get("/faqs", getFaqs);
siteRouter.put("/faqs/:id", isLogin, updateFaq);
siteRouter.delete("/faqs/:id", isLogin, deleteFaq);

export default siteRouter;
