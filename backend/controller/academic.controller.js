import db from "../config/dbconnect.js";
import { sendError, sendSuccess } from "../utils/response.js";
import { compressImg, deleteUploadedFiles } from "../utils/sharp.js";
import fs from "fs/promises";
import path from "path";

// Result
export const createResult = async (req, res, next) => {
  try {
    const { category, title, published_date, class_category_id } = req.body;

    if (!category || !title || !published_date) {
      if (req.files)
        await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
      return sendError(
        res,
        400,
        "Category, title, and published date are required",
      );
    }

    if (!["Terminal", "Final"].includes(category)) {
      if (req.files)
        await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
      return sendError(res, 400, "Category must be 'Terminal' or 'Final'");
    }

    if (!req.files || req.files.length === 0)
      return sendError(res, 400, "At least one attachment is required");

    const firstExt = path.extname(req.files[0].originalname).toLowerCase();
    const attachmentType = firstExt === ".pdf" ? "pdf" : "image";

    if (attachmentType === "image") {
      await Promise.all(req.files.map((file) => compressImg(file)));
    }
    const attachmentUrls = req.files
      .map(
        (file) =>
          "uploads/" + file.path.replace(/\\/g, "/").split("/uploads/")[1],
      )
      .join(",");

    const [result] = await db.execute(
      "INSERT INTO result (category, class_category_id, title, published_date, attachment_url, attachment_type) VALUES (?, ?, ?, ?, ?, ?)",
      [
        category,
        class_category_id || null,
        title,
        published_date,
        attachmentUrls,
        attachmentType,
      ],
    );
    return sendSuccess(res, 201, "Result created", { id: result.insertId });
  } catch (error) {
    if (req.files)
      await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
    next(error);
  }
};

export const getResults = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query =
      "SELECT r.id, r.category, r.class_category_id, c.category_name as class_name, r.title, r.published_date, r.attachment_url, r.attachment_type, r.created_at FROM result r LEFT JOIN class_category c ON r.class_category_id = c.id";
    const params = [];
    if (category) {
      query += " WHERE r.category = ?";
      params.push(category);
    }
    query += " ORDER BY r.published_date DESC";
    const [results] = await db.execute(query, params);
    return sendSuccess(res, 200, "Results fetched", results);
  } catch (error) {
    next(error);
  }
};

export const updateResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, title, published_date, class_category_id } =
      req.body || {};

    const [existing] = await db.execute(
      "SELECT category, class_category_id, title, published_date, attachment_url, attachment_type FROM result WHERE id = ? LIMIT 1",
      [id],
    );
    if (existing.length === 0) {
      if (req.files)
        await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
      return sendError(res, 404, "Result not found");
    }

    let attachmentUrls = existing[0].attachment_url;
    let attachmentType = existing[0].attachment_type;
    if (req.files && req.files.length > 0) {
      const firstExt = path.extname(req.files[0].originalname).toLowerCase();
      attachmentType = firstExt === ".pdf" ? "pdf" : "image";
      if (attachmentType === "image") {
        await Promise.all(req.files.map((file) => compressImg(file)));
      }
      attachmentUrls = req.files
        .map(
          (file) =>
            "uploads/" + file.path.replace(/\\/g, "/").split("/uploads/")[1],
        )
        .join(",");

      if (existing[0].attachment_url) {
        const oldFiles = existing[0].attachment_url.split(",");
        await Promise.all(
          oldFiles.map((file) =>
            fs.unlink(path.join(process.cwd(), file)).catch(() => {}),
          ),
        );
      }
    }

    await db.execute(
      "UPDATE result SET category = ?, class_category_id = ?, title = ?, published_date = ?, attachment_url = ?, attachment_type = ? WHERE id = ?",
      [
        category || existing[0].category,
        class_category_id !== undefined
          ? class_category_id
          : existing[0].class_category_id,
        title || existing[0].title,
        published_date || existing[0].published_date,
        attachmentUrls,
        attachmentType,
        id,
      ],
    );

    return sendSuccess(res, 200, "Result updated");
  } catch (error) {
    if (req.files)
      await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
    next(error);
  }
};

export const deleteResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute(
      "SELECT attachment_url FROM result WHERE id = ? LIMIT 1",
      [id],
    );
    if (result.length === 0) return sendError(res, 404, "Result not found");

    if (result[0].attachment_url) {
      const files = result[0].attachment_url.split(",");
      await Promise.all(
        files.map((file) =>
          fs.unlink(path.join(process.cwd(), file)).catch(() => {}),
        ),
      );
    }
    await db.execute("DELETE FROM result WHERE id = ?", [id]);
    return sendSuccess(res, 200, "Result deleted");
  } catch (error) {
    next(error);
  }
};

// Event
export const createEvent = async (req, res, next) => {
  try {
    const { category, title, description, event_date } = req.body;

    if (!category || !title || !event_date) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(
        res,
        400,
        "Category, title, and event date are required",
      );
    }

    if (!["Monthly", "Yearly"].includes(category)) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(res, 400, "Category must be 'Monthly' or 'Yearly'");
    }

    let pdfUrl = null;
    if (req.file) {
      pdfUrl =
        "uploads/" + req.file.path.replace(/\\/g, "/").split("/uploads/")[1];
    }

    const [result] = await db.execute(
      "INSERT INTO event (category, title, description, event_date, pdf_url) VALUES (?, ?, ?, ?, ?)",
      [category, title, description || null, event_date, pdfUrl],
    );
    return sendSuccess(res, 201, "Event created", { id: result.insertId });
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query =
      "SELECT id, category, title, description, event_date, pdf_url, created_at FROM event";
    const params = [];
    if (category) {
      query += " WHERE category = ?";
      params.push(category);
    }
    query += " ORDER BY event_date DESC";
    const [events] = await db.execute(query, params);
    return sendSuccess(res, 200, "Events fetched", events);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, title, description, event_date } = req.body || {};

    const [existing] = await db.execute(
      "SELECT category, title, description, event_date, pdf_url FROM event WHERE id = ? LIMIT 1",
      [id],
    );
    if (existing.length === 0) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(res, 404, "Event not found");
    }

    let pdfUrl = existing[0].pdf_url;
    if (req.file) {
      pdfUrl =
        "uploads/" + req.file.path.replace(/\\/g, "/").split("/uploads/")[1];
    }

    await db.execute(
      "UPDATE event SET category = ?, title = ?, description = ?, event_date = ?, pdf_url = ? WHERE id = ?",
      [
        category || existing[0].category,
        title || existing[0].title,
        description !== undefined ? description : existing[0].description,
        event_date || existing[0].event_date,
        pdfUrl,
        id,
      ],
    );

    if (req.file && existing[0].pdf_url) {
      await fs
        .unlink(path.join(process.cwd(), existing[0].pdf_url))
        .catch(() => {});
    }

    return sendSuccess(res, 200, "Event updated");
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [event] = await db.execute(
      "SELECT pdf_url FROM event WHERE id = ? LIMIT 1",
      [id],
    );
    if (event.length === 0) return sendError(res, 404, "Event not found");

    if (event[0].pdf_url) {
      await fs
        .unlink(path.join(process.cwd(), event[0].pdf_url))
        .catch(() => {});
    }
    await db.execute("DELETE FROM event WHERE id = ?", [id]);
    return sendSuccess(res, 200, "Event deleted");
  } catch (error) {
    next(error);
  }
};

// Achievement
export const createAchievement = async (req, res, next) => {
  try {
    const { title, description, achievement_date } = req.body;
    if (!title || !achievement_date)
      return sendError(res, 400, "Title and achievement date are required");
    if (!req.files || req.files.length === 0)
      return sendError(res, 400, "At least one image is required");

    await Promise.all(req.files.map((file) => compressImg(file)));
    const imageUrls = req.files
      .map(
        (file) =>
          "uploads/" + file.path.replace(/\\/g, "/").split("/uploads/")[1],
      )
      .join(",");

    const [result] = await db.execute(
      "INSERT INTO achievement (title, description, achievement_date, image_urls) VALUES (?, ?, ?, ?)",
      [title, description || null, achievement_date, imageUrls],
    );
    return sendSuccess(res, 201, "Achievement created", {
      id: result.insertId,
    });
  } catch (error) {
    if (req.files)
      await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
    next(error);
  }
};

export const getAchievements = async (req, res, next) => {
  try {
    const [achievements] = await db.execute(
      "SELECT id, title, description, achievement_date, image_urls, created_at FROM achievement ORDER BY achievement_date DESC",
    );
    return sendSuccess(res, 200, "Achievements fetched", achievements);
  } catch (error) {
    next(error);
  }
};

export const updateAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, achievement_date } = req.body || {};

    const [existing] = await db.execute(
      "SELECT title, description, achievement_date, image_urls FROM achievement WHERE id = ? LIMIT 1",
      [id],
    );
    if (existing.length === 0) {
      if (req.files)
        await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
      return sendError(res, 404, "Achievement not found");
    }

    let imageUrls = existing[0].image_urls;
    if (req.files && req.files.length > 0) {
      await Promise.all(req.files.map((file) => compressImg(file)));
      imageUrls = req.files
        .map(
          (file) =>
            "uploads/" + file.path.replace(/\\/g, "/").split("/uploads/")[1],
        )
        .join(",");

      if (existing[0].image_urls) {
        const oldImages = existing[0].image_urls.split(",");
        await Promise.all(
          oldImages.map((img) =>
            fs.unlink(path.join(process.cwd(), img)).catch(() => {}),
          ),
        );
      }
    }

    await db.execute(
      "UPDATE achievement SET title = ?, description = ?, achievement_date = ?, image_urls = ? WHERE id = ?",
      [
        title || existing[0].title,
        description !== undefined ? description : existing[0].description,
        achievement_date || existing[0].achievement_date,
        imageUrls,
        id,
      ],
    );

    return sendSuccess(res, 200, "Achievement updated");
  } catch (error) {
    if (req.files)
      await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
    next(error);
  }
};

export const deleteAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [achievement] = await db.execute(
      "SELECT image_urls FROM achievement WHERE id = ? LIMIT 1",
      [id],
    );
    if (achievement.length === 0)
      return sendError(res, 404, "Achievement not found");

    if (achievement[0].image_urls) {
      const images = achievement[0].image_urls.split(",");
      await Promise.all(
        images.map((img) =>
          fs.unlink(path.join(process.cwd(), img)).catch(() => {}),
        ),
      );
    }
    await db.execute("DELETE FROM achievement WHERE id = ?", [id]);
    return sendSuccess(res, 200, "Achievement deleted");
  } catch (error) {
    next(error);
  }
};

// Question Bank
export const createQuestionBank = async (req, res, next) => {
  try {
    const { title, subject, class_level, year, description } = req.body;

    if (!title || !subject) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(res, 400, "Title and subject are required");
    }

    let fileUrl = null;
    let fileType = null;

    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      fileType = ext === ".pdf" ? "pdf" : "image";

      if (fileType === "image") {
        await compressImg(req.file);
      }

      const pathParts = req.file.path.replace(/\\/g, "/").split("/uploads/");
      fileUrl = pathParts.length > 1 ? "uploads/" + pathParts[1] : null;
    }

    const [result] = await db.execute(
      "INSERT INTO question_bank (title, subject, class_level, year, description, file_url, file_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        subject,
        class_level || null,
        year || null,
        description || null,
        fileUrl,
        fileType,
      ],
    );

    return sendSuccess(res, 201, "Question bank created successfully", {
      id: result.insertId,
    });
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

export const getQuestionBanks = async (req, res, next) => {
  try {
    const { subject, class_level, year } = req.query;
    let query =
      "SELECT id, title, subject, class_level, year, description, file_url, file_type, created_at FROM question_bank WHERE 1=1";
    const params = [];

    if (subject) {
      query += " AND subject = ?";
      params.push(subject);
    }

    if (class_level) {
      query += " AND class_level = ?";
      params.push(class_level);
    }

    if (year) {
      query += " AND year = ?";
      params.push(year);
    }

    query += " ORDER BY created_at DESC";
    const [questions] = await db.execute(query, params);

    return sendSuccess(
      res,
      200,
      "Question banks fetched successfully",
      questions,
    );
  } catch (error) {
    next(error);
  }
};

export const updateQuestionBank = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, subject, class_level, year, description } = req.body || {};

    const [existing] = await db.execute(
      "SELECT title, subject, class_level, year, description, file_url, file_type FROM question_bank WHERE id = ? LIMIT 1",
      [id],
    );

    if (existing.length === 0) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(res, 404, "Question bank not found");
    }

    const updatedTitle = title || existing[0].title;
    const updatedSubject = subject || existing[0].subject;
    const updatedClassLevel =
      class_level !== undefined ? class_level : existing[0].class_level;
    const updatedYear = year !== undefined ? year : existing[0].year;
    const updatedDescription =
      description !== undefined ? description : existing[0].description;
    let fileUrl = existing[0].file_url;
    let fileType = existing[0].file_type;

    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      fileType = ext === ".pdf" ? "pdf" : "image";

      if (fileType === "image") {
        await compressImg(req.file);
      }

      const pathParts = req.file.path.replace(/\\/g, "/").split("/uploads/");
      fileUrl = pathParts.length > 1 ? "uploads/" + pathParts[1] : null;

      if (existing[0].file_url) {
        const oldFilePath = path.join(process.cwd(), existing[0].file_url);
        await fs.unlink(oldFilePath).catch(() => {});
      }
    }

    await db.execute(
      "UPDATE question_bank SET title = ?, subject = ?, class_level = ?, year = ?, description = ?, file_url = ?, file_type = ? WHERE id = ?",
      [
        updatedTitle,
        updatedSubject,
        updatedClassLevel,
        updatedYear,
        updatedDescription,
        fileUrl,
        fileType,
        id,
      ],
    );

    return sendSuccess(res, 200, "Question bank updated successfully");
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

export const deleteQuestionBank = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [question] = await db.execute(
      "SELECT file_url FROM question_bank WHERE id = ? LIMIT 1",
      [id],
    );

    if (question.length === 0) {
      return sendError(res, 404, "Question bank not found");
    }

    if (question[0].file_url) {
      const filePath = path.join(process.cwd(), question[0].file_url);
      await fs.unlink(filePath).catch(() => {});
    }

    await db.execute("DELETE FROM question_bank WHERE id = ?", [id]);

    return sendSuccess(res, 200, "Question bank deleted successfully");
  } catch (error) {
    next(error);
  }
};

// Academic Year
export const createAcademicYear = async (req, res, next) => {
  try {
    const { year } = req.body;
    if (!year) return sendError(res, 400, "Year is required");
    const [result] = await db.execute(
      "INSERT INTO academic_year (year) VALUES (?)",
      [year],
    );
    return sendSuccess(res, 201, "Academic year created", {
      id: result.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY")
      return sendError(res, 409, "Academic year already exists");
    next(error);
  }
};

export const getAcademicYears = async (req, res, next) => {
  try {
    const [years] = await db.execute(
      "SELECT id, year, created_at FROM academic_year ORDER BY year DESC",
    );
    return sendSuccess(res, 200, "Academic years fetched", years);
  } catch (error) {
    next(error);
  }
};

export const updateAcademicYear = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { year } = req.body;
    if (!year) return sendError(res, 400, "Year is required");
    const [existing] = await db.execute(
      "SELECT id FROM academic_year WHERE id = ? LIMIT 1",
      [id],
    );
    if (existing.length === 0)
      return sendError(res, 404, "Academic year not found");
    await db.execute("UPDATE academic_year SET year = ? WHERE id = ?", [
      year,
      id,
    ]);
    return sendSuccess(res, 200, "Academic year updated");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY")
      return sendError(res, 409, "Academic year already exists");
    next(error);
  }
};

export const deleteAcademicYear = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [existing] = await db.execute(
      "SELECT id FROM academic_year WHERE id = ? LIMIT 1",
      [id],
    );
    if (existing.length === 0)
      return sendError(res, 404, "Academic year not found");
    await db.execute("DELETE FROM academic_year WHERE id = ?", [id]);
    return sendSuccess(res, 200, "Academic year deleted");
  } catch (error) {
    next(error);
  }
};
