import db from "../config/dbconnect.js";
import { sendError, sendSuccess } from "../utils/response.js";
import { compressImg, deleteUploadedFiles } from "../utils/sharp.js";
import fs from "fs/promises";
import path from "path";

// Create Home Slider
export const createHomeSlider = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return sendError(res, 400, "At least one image is required");
    }

    const titles = req.body.titles ? JSON.parse(req.body.titles) : [];

    // Compress all images
    await Promise.all(req.files.map((file) => compressImg(file)));

    // Insert all images into database
    const insertPromises = req.files.map((file, index) => {
      const imageUrl = file.path.replace(/\\/g, "/").split("/uploads/")[1];
      const title = titles[index] || null;
      return db.execute(
        "INSERT INTO home_slider (title, image_url) VALUES (?, ?)",
        [title, "uploads/" + imageUrl]
      );
    });

    await Promise.all(insertPromises);

    return sendSuccess(
      res,
      201,
      `${req.files.length} slider(s) created successfully`
    );
  } catch (error) {
    if (req.files) {
      await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
    }
    next(error);
  }
};

// Get All Home Sliders
export const getHomeSliders = async (req, res, next) => {
  try {
    const [sliders] = await db.execute(
      "SELECT id, title, image_url, created_at FROM home_slider ORDER BY created_at DESC"
    );

    return sendSuccess(res, 200, "Sliders fetched successfully", sliders);
  } catch (error) {
    next(error);
  }
};

// Delete Home Slider
export const deleteHomeSlider = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Get slider
    const [slider] = await db.execute(
      "SELECT image_url FROM home_slider WHERE id = ? LIMIT 1",
      [id]
    );

    if (slider.length === 0) {
      return sendError(res, 404, "Slider not found");
    }

    // Delete image file
    const imagePath = path.join(
      process.cwd(),
      slider[0].image_url.startsWith("/")
        ? slider[0].image_url.slice(1)
        : slider[0].image_url
    );
    await fs.unlink(imagePath).catch(() => {});

    // Delete from database
    await db.execute("DELETE FROM home_slider WHERE id = ?", [id]);

    return sendSuccess(res, 200, "Slider deleted successfully");
  } catch (error) {
    next(error);
  }
};

// Create Review
export const createReview = async (req, res, next) => {
  try {
    const { name, position, review_text } = req.body;

    if (!name || !review_text) {
      return sendError(res, 400, "Name and review text are required");
    }

    let imageUrl = null;
    if (req.file) {
      await compressImg(req.file);
      const pathParts = req.file.path.replace(/\\/g, "/").split("/uploads/");
      imageUrl = pathParts.length > 1 ? "uploads/" + pathParts[1] : null;
    }

    const [result] = await db.execute(
      "INSERT INTO reviews (name, position, review_text, image) VALUES (?, ?, ?, ?)",
      [name, position || null, review_text, imageUrl]
    );

    return sendSuccess(res, 201, "Review created successfully", {
      id: result.insertId,
    });
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

// Get All Reviews
export const getReviews = async (req, res, next) => {
  try {
    const { status } = req.query;
    let query =
      "SELECT id, name, position, review_text, status, image, created_at FROM reviews";
    const params = [];

    if (status) {
      query += " WHERE status = ?";
      params.push(status);
    }

    query += " ORDER BY created_at DESC";
    const [reviews] = await db.execute(query, params);

    return sendSuccess(res, 200, "Reviews fetched successfully", reviews);
  } catch (error) {
    next(error);
  }
};

// Update Review
export const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, position, review_text } = req.body || {};

    const [existing] = await db.execute(
      "SELECT name, position, review_text, image FROM reviews WHERE id = ? LIMIT 1",
      [id]
    );

    if (existing.length === 0) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(res, 404, "Review not found");
    }

    const updatedName = name || existing[0].name;
    const updatedPosition =
      position !== undefined ? position : existing[0].position;
    const updatedReviewText = review_text || existing[0].review_text;
    let imageUrl = existing[0].image;

    if (req.file) {
      await compressImg(req.file);
      const pathParts = req.file.path.replace(/\\/g, "/").split("/uploads/");
      imageUrl = pathParts.length > 1 ? "uploads/" + pathParts[1] : null;
    }

    await db.execute(
      "UPDATE reviews SET name = ?, position = ?, review_text = ?, image = ? WHERE id = ?",
      [updatedName, updatedPosition, updatedReviewText, imageUrl, id]
    );

    if (req.file && existing[0].image) {
      const oldImagePath = path.join(process.cwd(), existing[0].image);
      await fs.unlink(oldImagePath).catch(() => {});
    }

    return sendSuccess(res, 200, "Review updated successfully");
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

// Delete Review
export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [review] = await db.execute(
      "SELECT image FROM reviews WHERE id = ? LIMIT 1",
      [id]
    );

    if (review.length === 0) {
      return sendError(res, 404, "Review not found");
    }

    if (review[0].image) {
      const imagePath = path.join(process.cwd(), review[0].image);
      await fs.unlink(imagePath).catch(() => {});
    }

    await db.execute("DELETE FROM reviews WHERE id = ?", [id]);

    return sendSuccess(res, 200, "Review deleted successfully");
  } catch (error) {
    next(error);
  }
};

// Create FAQ
export const createFaq = async (req, res, next) => {
  try {
    const { question, answer, display_order } = req.body;

    if (!question || !answer) {
      return sendError(res, 400, "Question and answer are required");
    }

    const [result] = await db.execute(
      "INSERT INTO faqs (question, answer, display_order) VALUES (?, ?, ?)",
      [question, answer, display_order || 0]
    );

    return sendSuccess(res, 201, "FAQ created successfully", {
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

// Get All FAQs
export const getFaqs = async (req, res, next) => {
  try {
    const [faqs] = await db.execute(
      "SELECT id, question, answer, display_order, created_at FROM faqs ORDER BY display_order ASC, created_at DESC"
    );

    return sendSuccess(res, 200, "FAQs fetched successfully", faqs);
  } catch (error) {
    next(error);
  }
};

// Update FAQ
export const updateFaq = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { question, answer, display_order } = req.body;

    const [existing] = await db.execute(
      "SELECT question, answer, display_order FROM faqs WHERE id = ? LIMIT 1",
      [id]
    );

    if (existing.length === 0) {
      return sendError(res, 404, "FAQ not found");
    }

    const updatedQuestion = question || existing[0].question;
    const updatedAnswer = answer || existing[0].answer;
    const updatedDisplayOrder =
      display_order !== undefined ? display_order : existing[0].display_order;

    await db.execute(
      "UPDATE faqs SET question = ?, answer = ?, display_order = ? WHERE id = ?",
      [updatedQuestion, updatedAnswer, updatedDisplayOrder, id]
    );

    return sendSuccess(res, 200, "FAQ updated successfully");
  } catch (error) {
    next(error);
  }
};

// Delete FAQ
export const deleteFaq = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute("DELETE FROM faqs WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return sendError(res, 404, "FAQ not found");
    }

    return sendSuccess(res, 200, "FAQ deleted successfully");
  } catch (error) {
    next(error);
  }
};
