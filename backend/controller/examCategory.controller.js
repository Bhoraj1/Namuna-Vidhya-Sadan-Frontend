import db from "../config/dbconnect.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const createExamInstance = async (req, res, next) => {
  try {
    const { exam_year_id, name, exam_type, exam_date } = req.body;
    if (!exam_year_id || !name)
      return sendError(res, 400, "exam_year_id and name are required");
    if (exam_type && !["terminal", "final"].includes(exam_type))
      return sendError(res, 400, "exam_type must be 'terminal' or 'final'");

    const [[year]] = await db.execute(
      "SELECT id FROM academic_year WHERE id = ? LIMIT 1",
      [exam_year_id],
    );
    if (!year) return sendError(res, 404, "Academic year not found");

    if ((exam_type || "terminal") === "final") {
      const [[existing]] = await db.execute(
        "SELECT id FROM exam_instance WHERE exam_year_id = ? AND exam_type = 'final' LIMIT 1",
        [exam_year_id],
      );
      if (existing)
        return sendError(
          res,
          409,
          "A Final exam instance already exists for this year. Only one Final exam is allowed per year.",
        );
    }

    const [result] = await db.execute(
      "INSERT INTO exam_instance (exam_year_id, name, exam_type, exam_date) VALUES (?, ?, ?, ?)",
      [exam_year_id, name, exam_type || "terminal", exam_date || null],
    );
    return sendSuccess(res, 201, "Exam instance created", {
      id: result.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY")
      return sendError(
        res,
        409,
        "An exam with this name already exists for the selected year.",
      );
    next(error);
  }
};

export const getExamInstances = async (req, res, next) => {
  try {
    const { exam_year_id } = req.query;
    let query = `SELECT ei.id, ei.name, ei.exam_type, ei.exam_date, ei.created_at,
      ay.year, ay.id as exam_year_id
      FROM exam_instance ei
      JOIN academic_year ay ON ei.exam_year_id = ay.id`;
    const params = [];
    if (exam_year_id) {
      query += " WHERE ei.exam_year_id = ?";
      params.push(exam_year_id);
    }
    query += " ORDER BY ay.year DESC, ei.name ASC";
    const [rows] = await db.execute(query, params);
    return sendSuccess(res, 200, "Exam instances fetched", rows);
  } catch (error) {
    next(error);
  }
};

export const updateExamInstance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { exam_year_id, name, exam_type, exam_date } = req.body;

    const [[existing]] = await db.execute(
      "SELECT * FROM exam_instance WHERE id = ? LIMIT 1",
      [id],
    );
    if (!existing) return sendError(res, 404, "Exam instance not found");

    await db.execute(
      "UPDATE exam_instance SET exam_year_id = ?, name = ?, exam_type = ?, exam_date = ? WHERE id = ?",
      [
        exam_year_id || existing.exam_year_id,
        name || existing.name,
        exam_type || existing.exam_type,
        exam_date !== undefined ? exam_date : existing.exam_date,
        id,
      ],
    );
    return sendSuccess(res, 200, "Exam instance updated");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY")
      return sendError(
        res,
        409,
        "This exam already exists for the selected year",
      );
    next(error);
  }
};

export const deleteExamInstance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute(
      "DELETE FROM exam_instance WHERE id = ?",
      [id],
    );
    if (result.affectedRows === 0)
      return sendError(res, 404, "Exam instance not found");
    return sendSuccess(res, 200, "Exam instance deleted");
  } catch (error) {
    next(error);
  }
};
