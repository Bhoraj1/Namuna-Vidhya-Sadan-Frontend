import db from "../config/dbconnect.js";
import { sendError, sendSuccess } from "../utils/response.js";

// Gallery Category
export const createGalleryCategory = async (req, res, next) => {
  try {
    const { category_name, description } = req.body;
    if (!category_name) return sendError(res, 400, "Category name is required");

    const [result] = await db.execute(
      "INSERT INTO gallery_category (category_name, description) VALUES (?, ?)",
      [category_name, description || null]
    );
    return sendSuccess(res, 201, "Gallery category created", {
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

export const getGalleryCategories = async (req, res, next) => {
  try {
    const [categories] = await db.execute(
      "SELECT id, category_name, description, created_at FROM gallery_category ORDER BY created_at DESC"
    );
    return sendSuccess(res, 200, "Gallery categories fetched", categories);
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [[gallery]] = await db.execute(
      "SELECT COUNT(*) as count FROM gallery WHERE category_id = ?",
      [id]
    );
    if (gallery.count > 0)
      return sendError(
        res,
        400,
        "Cannot delete category with existing galleries"
      );
    const [result] = await db.execute(
      "DELETE FROM gallery_category WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0)
      return sendError(res, 404, "Category not found");
    return sendSuccess(res, 200, "Gallery category deleted");
  } catch (error) {
    next(error);
  }
};

// Notice Category
export const createNoticeCategory = async (req, res, next) => {
  try {
    const { category_name, description } = req.body;
    if (!category_name) return sendError(res, 400, "Category name is required");

    const [result] = await db.execute(
      "INSERT INTO notice_category (category_name, description) VALUES (?, ?)",
      [category_name, description || null]
    );
    return sendSuccess(res, 201, "Notice category created", {
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoticeCategories = async (req, res, next) => {
  try {
    const [categories] = await db.execute(
      "SELECT category_id, category_name, description, created_at FROM notice_category ORDER BY created_at DESC"
    );
    return sendSuccess(res, 200, "Notice categories fetched", categories);
  } catch (error) {
    next(error);
  }
};

export const deleteNoticeCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [[notice]] = await db.execute(
      "SELECT COUNT(*) as count FROM notice WHERE category_id = ?",
      [id]
    );
    if (notice.count > 0)
      return sendError(
        res,
        400,
        "Cannot delete category with existing notices"
      );
    const [result] = await db.execute(
      "DELETE FROM notice_category WHERE category_id = ?",
      [id]
    );
    if (result.affectedRows === 0)
      return sendError(res, 404, "Category not found");
    return sendSuccess(res, 200, "Notice category deleted");
  } catch (error) {
    next(error);
  }
};

// Blog Category
export const createBlogCategory = async (req, res, next) => {
  try {
    const { category_name, description } = req.body;
    if (!category_name) return sendError(res, 400, "Category name is required");

    const [result] = await db.execute(
      "INSERT INTO blog_category (category_name, description) VALUES (?, ?)",
      [category_name, description || null]
    );
    return sendSuccess(res, 201, "Blog category created", {
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogCategories = async (req, res, next) => {
  try {
    const [categories] = await db.execute(
      "SELECT category_id, category_name, description, created_at FROM blog_category ORDER BY created_at DESC"
    );
    return sendSuccess(res, 200, "Blog categories fetched", categories);
  } catch (error) {
    next(error);
  }
};

export const deleteBlogCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [[blog]] = await db.execute(
      "SELECT COUNT(*) as count FROM blog WHERE category_id = ?",
      [id]
    );
    if (blog.count > 0)
      return sendError(res, 400, "Cannot delete category with existing blogs");
    const [result] = await db.execute(
      "DELETE FROM blog_category WHERE category_id = ?",
      [id]
    );
    if (result.affectedRows === 0)
      return sendError(res, 404, "Category not found");
    return sendSuccess(res, 200, "Blog category deleted");
  } catch (error) {
    next(error);
  }
};

// Vacancy Category
export const createVacancyCategory = async (req, res, next) => {
  try {
    const { category_name, description } = req.body;
    if (!category_name) return sendError(res, 400, "Category name is required");

    const [result] = await db.execute(
      "INSERT INTO vacancy_category (category_name, description) VALUES (?, ?)",
      [category_name, description || null]
    );
    return sendSuccess(res, 201, "Vacancy category created", {
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

export const getVacancyCategories = async (req, res, next) => {
  try {
    const [categories] = await db.execute(
      "SELECT category_id, category_name, description, created_at FROM vacancy_category ORDER BY created_at DESC"
    );
    return sendSuccess(res, 200, "Vacancy categories fetched", categories);
  } catch (error) {
    next(error);
  }
};

export const deleteVacancyCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [[vacancy]] = await db.execute(
      "SELECT COUNT(*) as count FROM vacancy WHERE category_id = ?",
      [id]
    );
    if (vacancy.count > 0)
      return sendError(
        res,
        400,
        "Cannot delete category with existing vacancies"
      );
    const [result] = await db.execute(
      "DELETE FROM vacancy_category WHERE category_id = ?",
      [id]
    );
    if (result.affectedRows === 0)
      return sendError(res, 404, "Category not found");
    return sendSuccess(res, 200, "Vacancy category deleted");
  } catch (error) {
    next(error);
  }
};

// Team Category
export const createTeamCategory = async (req, res, next) => {
  try {
    const { category_name, description } = req.body;
    if (!category_name) return sendError(res, 400, "Category name is required");

    const [result] = await db.execute(
      "INSERT INTO team_category (category_name, description) VALUES (?, ?)",
      [category_name, description || null]
    );
    return sendSuccess(res, 201, "Team category created", {
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

export const getTeamCategories = async (req, res, next) => {
  try {
    const [categories] = await db.execute(
      "SELECT id, category_name, description, created_at FROM team_category ORDER BY created_at DESC"
    );
    return sendSuccess(res, 200, "Team categories fetched", categories);
  } catch (error) {
    next(error);
  }
};

export const deleteTeamCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [[team]] = await db.execute(
      "SELECT COUNT(*) as count FROM team WHERE category_id = ?",
      [id]
    );
    if (team.count > 0)
      return sendError(
        res,
        400,
        "Cannot delete category with existing team members"
      );
    const [result] = await db.execute(
      "DELETE FROM team_category WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0)
      return sendError(res, 404, "Category not found");
    return sendSuccess(res, 200, "Team category deleted");
  } catch (error) {
    next(error);
  }
};

// Class Category
export const createClassCategory = async (req, res, next) => {
  try {
    const { category_name, description } = req.body;
    if (!category_name) return sendError(res, 400, "Category name is required");

    const [result] = await db.execute(
      "INSERT INTO class_category (category_name, description) VALUES (?, ?)",
      [category_name, description || null]
    );
    return sendSuccess(res, 201, "Class category created", {
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

export const getClassCategories = async (req, res, next) => {
  try {
    const [categories] = await db.execute(
      "SELECT id, category_name, description, created_at FROM class_category ORDER BY created_at DESC"
    );
    return sendSuccess(res, 200, "Class categories fetched", categories);
  } catch (error) {
    next(error);
  }
};

export const deleteClassCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [[category]] = await db.execute(
      "SELECT category_name FROM class_category WHERE id = ?",
      [id]
    );
    if (!category) return sendError(res, 404, "Category not found");
    const [[questionBank]] = await db.execute(
      "SELECT COUNT(*) as count FROM question_bank WHERE class_level = ?",
      [category.category_name]
    );
    if (questionBank.count > 0)
      return sendError(
        res,
        400,
        "Cannot delete category with existing question bank entries"
      );
    const [[resultCount]] = await db.execute(
      "SELECT COUNT(*) as count FROM result WHERE class_category_id = ?",
      [id]
    );
    if (resultCount.count > 0)
      return sendError(res, 400, "Cannot delete category with existing results");
    const [result] = await db.execute(
      "DELETE FROM class_category WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0)
      return sendError(res, 404, "Category not found");
    return sendSuccess(res, 200, "Class category deleted");
  } catch (error) {
    next(error);
  }
};
