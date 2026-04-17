import db from "../config/dbconnect.js";
import { sendError, sendSuccess } from "../utils/response.js";
import { compressImg, deleteUploadedFiles } from "../utils/sharp.js";
import fs from "fs/promises";
import path from "path";

// Create Team Member
export const createTeamMember = async (req, res, next) => {
  try {
    const {
      role,
      name,
      email,
      number,
      position,
      description,
      is_main,
      category_id,
    } = req.body;

    if (!role || !name || !number || !position) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(
        res,
        400,
        "Role, name, number, and position are required",
      );
    }

    if (!category_id) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(res, 400, "Category is required");
    }

    if (!["teacher", "committee"].includes(role)) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(res, 400, "Role must be 'teacher' or 'committee'");
    }

    let imageUrl = null;
    if (req.file) {
      await compressImg(req.file);
      const pathParts = req.file.path.replace(/\\/g, "/").split("/uploads/");
      imageUrl = pathParts.length > 1 ? "uploads/" + pathParts[1] : null;
    }

    const [result] = await db.execute(
      "INSERT INTO team (role, name, email, number, position, description, image, is_main, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        role,
        name,
        email || null,
        number,
        position,
        description || null,
        imageUrl,
        is_main === "1" || is_main === 1 || is_main === true ? 1 : 0,
        category_id || null,
      ],
    );

    return sendSuccess(res, 201, "Team member created successfully", {
      id: result.insertId,
    });
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

// Get All Team Members
export const getTeamMembers = async (req, res, next) => {
  try {
    const { role, is_main, category_id } = req.query;
    let query =
      "SELECT t.id, t.role, t.name, t.email, t.number, t.position, t.description, t.image, t.is_main, t.category_id, tc.category_name, t.created_at FROM team t LEFT JOIN team_category tc ON t.category_id = tc.id";
    const params = [];
    const conditions = [];

    if (role) {
      conditions.push("t.role = ?");
      params.push(role);
    }

    if (is_main === "1") {
      conditions.push("t.is_main = 1");
    }

    if (category_id) {
      conditions.push("t.category_id = ?");
      params.push(category_id);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at ASC";

    if (is_main === "1") {
      query += " LIMIT 4";
    }

    const [members] = await db.execute(query, params);

    return sendSuccess(res, 200, "Team members fetched successfully", members);
  } catch (error) {
    next(error);
  }
};

// Update Team Member
export const updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      role,
      name,
      email,
      number,
      position,
      description,
      is_main,
      category_id,
    } = req.body || {};

    const [existing] = await db.execute(
      "SELECT role, name, email, number, position, description, image, is_main, category_id FROM team WHERE id = ? LIMIT 1",
      [id],
    );

    if (existing.length === 0) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(res, 404, "Team member not found");
    }

    const updatedRole = role || existing[0].role;
    const updatedName = name || existing[0].name;
    const updatedEmail = email !== undefined ? email : existing[0].email;
    const updatedNumber = number || existing[0].number;
    const updatedPosition = position || existing[0].position;
    const updatedDescription =
      description !== undefined ? description : existing[0].description;
    const updatedIsMain =
      is_main !== undefined
        ? is_main === "1" || is_main === 1 || is_main === true
          ? 1
          : 0
        : existing[0].is_main;
    const updatedCategoryId =
      category_id !== undefined ? category_id : existing[0].category_id;
    let imageUrl = existing[0].image;

    if (!["teacher", "committee"].includes(updatedRole)) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(res, 400, "Role must be 'teacher' or 'committee'");
    }

    if (req.file) {
      await compressImg(req.file);
      const pathParts = req.file.path.replace(/\\/g, "/").split("/uploads/");
      imageUrl = pathParts.length > 1 ? "uploads/" + pathParts[1] : null;
    }

    await db.execute(
      "UPDATE team SET role = ?, name = ?, email = ?, number = ?, position = ?, description = ?, image = ?, is_main = ?, category_id = ? WHERE id = ?",
      [
        updatedRole,
        updatedName,
        updatedEmail,
        updatedNumber,
        updatedPosition,
        updatedDescription,
        imageUrl,
        updatedIsMain,
        updatedCategoryId || null,
        id,
      ],
    );

    if (req.file && existing[0].image) {
      const oldImagePath = path.join(process.cwd(), existing[0].image);
      await fs.unlink(oldImagePath).catch(() => {});
    }

    return sendSuccess(res, 200, "Team member updated successfully");
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

// Delete Team Member
export const deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [member] = await db.execute(
      "SELECT image FROM team WHERE id = ? LIMIT 1",
      [id],
    );

    if (member.length === 0) {
      return sendError(res, 404, "Team member not found");
    }

    if (member[0].image) {
      const imagePath = path.join(process.cwd(), member[0].image);
      await fs.unlink(imagePath).catch(() => {});
    }

    await db.execute("DELETE FROM team WHERE id = ?", [id]);

    return sendSuccess(res, 200, "Team member deleted successfully");
  } catch (error) {
    next(error);
  }
};
