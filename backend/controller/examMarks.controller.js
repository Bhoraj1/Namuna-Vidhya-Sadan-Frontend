import db from "../config/dbconnect.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const configureExamMarks = async (req, res, next) => {
  try {
    const { exam_category_id, subject_id, th_credit_hrs, in_credit_hrs, total_marks, pass_marks } = req.body;

    if (!exam_category_id || !subject_id || !total_marks || !pass_marks) {
      return sendError(res, 400, "All fields are required");
    }

    const [[existing]] = await db.execute(
      "SELECT id FROM exam_subject_marks WHERE exam_category_id = ? AND subject_id = ? LIMIT 1",
      [exam_category_id, subject_id]
    );

    if (existing) {
      await db.execute(
        "UPDATE exam_subject_marks SET th_credit_hrs = ?, in_credit_hrs = ?, total_marks = ?, pass_marks = ? WHERE id = ?",
        [th_credit_hrs, in_credit_hrs, total_marks, pass_marks, existing.id]
      );
      return sendSuccess(res, 200, "Exam marks updated successfully");
    }

    await db.execute(
      "INSERT INTO exam_subject_marks (exam_category_id, subject_id, th_credit_hrs, in_credit_hrs, total_marks, pass_marks) VALUES (?, ?, ?, ?, ?, ?)",
      [exam_category_id, subject_id, th_credit_hrs, in_credit_hrs, total_marks, pass_marks]
    );

    return sendSuccess(res, 201, "Exam marks configured successfully");
  } catch (error) {
    next(error);
  }
};

export const getExamMarks = async (req, res, next) => {
  try {
    const { exam_category_id, class_category_id } = req.query;

    if (!exam_category_id || !class_category_id) {
      return sendError(res, 400, "Exam category and class category are required");
    }

    const [marks] = await db.execute(
      `SELECT esm.*, s.subject_name, s.class_id 
       FROM exam_subject_marks esm 
       JOIN subjects s ON esm.subject_id = s.id 
       WHERE esm.exam_category_id = ? AND s.class_id = ?
       ORDER BY s.subject_name`,
      [exam_category_id, class_category_id]
    );

    return sendSuccess(res, 200, "Exam marks fetched successfully", marks);
  } catch (error) {
    next(error);
  }
};

export const deleteExamMarks = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      "DELETE FROM exam_subject_marks WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return sendError(res, 404, "Exam marks configuration not found");
    }

    return sendSuccess(res, 200, "Exam marks configuration deleted");
  } catch (error) {
    next(error);
  }
};
