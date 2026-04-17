import db from "../config/dbconnect.js";
import { sendError, sendSuccess } from "../utils/response.js";
import { compressImg, deleteUploadedFiles } from "../utils/sharp.js";
import fs from "fs/promises";
import path from "path";

// Gallery
export const createGallery = async (req, res, next) => {
  try {
    const { category_id, caption } = req.body;
    if (!category_id) {
      if (req.files)
        await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
      return sendError(res, 400, "Category ID is required");
    }
    if (!req.files || req.files.length === 0)
      return sendError(res, 400, "At least one image is required");

    const [categoryExists] = await db.execute(
      "SELECT id FROM gallery_category WHERE id = ? LIMIT 1",
      [category_id],
    );
    if (categoryExists.length === 0) {
      if (req.files)
        await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
      return sendError(res, 404, "Gallery category not found");
    }

    await Promise.all(req.files.map((file) => compressImg(file)));
    const imageUrls = req.files
      .map(
        (file) =>
          "uploads/" + file.path.replace(/\\/g, "/").split("/uploads/")[1],
      )
      .join(",");

    const [result] = await db.execute(
      "INSERT INTO gallery (category_id, image_url, caption) VALUES (?, ?, ?)",
      [category_id, imageUrls, caption || null],
    );
    return sendSuccess(res, 201, "Gallery created", { id: result.insertId });
  } catch (error) {
    if (req.files)
      await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
    next(error);
  }
};

export const getGalleries = async (req, res, next) => {
  try {
    const { category_id } = req.query;
    let query =
      "SELECT id, category_id, image_url, caption, created_at FROM gallery";
    const params = [];
    if (category_id) {
      query += " WHERE category_id = ?";
      params.push(category_id);
    }
    query += " ORDER BY created_at DESC";
    const [galleries] = await db.execute(query, params);
    return sendSuccess(res, 200, "Galleries fetched", galleries);
  } catch (error) {
    next(error);
  }
};

export const updateGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category_id, caption } = req.body || {};

    const [existing] = await db.execute(
      "SELECT category_id, image_url, caption FROM gallery WHERE id = ? LIMIT 1",
      [id],
    );
    if (existing.length === 0) {
      if (req.files)
        await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
      return sendError(res, 404, "Gallery not found");
    }

    let imageUrls = existing[0].image_url;
    if (req.files && req.files.length > 0) {
      await Promise.all(req.files.map((file) => compressImg(file)));
      imageUrls = req.files
        .map(
          (file) =>
            "uploads/" + file.path.replace(/\\/g, "/").split("/uploads/")[1],
        )
        .join(",");

      if (existing[0].image_url) {
        const oldImages = existing[0].image_url.split(",");
        await Promise.all(
          oldImages.map((img) =>
            fs.unlink(path.join(process.cwd(), img)).catch(() => {}),
          ),
        );
      }
    }

    await db.execute(
      "UPDATE gallery SET category_id = ?, image_url = ?, caption = ? WHERE id = ?",
      [
        category_id || existing[0].category_id,
        imageUrls,
        caption !== undefined ? caption : existing[0].caption,
        id,
      ],
    );

    return sendSuccess(res, 200, "Gallery updated");
  } catch (error) {
    if (req.files)
      await Promise.all(req.files.map((file) => deleteUploadedFiles(file)));
    next(error);
  }
};

export const deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [gallery] = await db.execute(
      "SELECT image_url FROM gallery WHERE id = ? LIMIT 1",
      [id],
    );
    if (gallery.length === 0) return sendError(res, 404, "Gallery not found");

    if (gallery[0].image_url) {
      const images = gallery[0].image_url.split(",");
      await Promise.all(
        images.map((img) =>
          fs.unlink(path.join(process.cwd(), img)).catch(() => {}),
        ),
      );
    }
    await db.execute("DELETE FROM gallery WHERE id = ?", [id]);
    return sendSuccess(res, 200, "Gallery deleted");
  } catch (error) {
    next(error);
  }
};

// Notice
export const createNotice = async (req, res, next) => {
  try {
    const { category_id, title, notice_date } = req.body;
    if (!title || !notice_date) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(res, 400, "Title and notice date are required");
    }

    if (category_id) {
      const [categoryExists] = await db.execute(
        "SELECT category_id FROM notice_category WHERE category_id = ? LIMIT 1",
        [category_id],
      );
      if (categoryExists.length === 0) {
        if (req.file) await deleteUploadedFiles(req.file);
        return sendError(res, 404, "Notice category not found");
      }
    }

    let attachmentUrl = null;
    let attachmentType = null;
    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      attachmentType = ext === ".pdf" ? "pdf" : "image";
      if (attachmentType === "image") await compressImg(req.file);
      attachmentUrl =
        "uploads/" + req.file.path.replace(/\\/g, "/").split("/uploads/")[1];
    }

    const [result] = await db.execute(
      "INSERT INTO notice (category_id, title, notice_date, attachment_url, attachment_type) VALUES (?, ?, ?, ?, ?)",
      [category_id || null, title, notice_date, attachmentUrl, attachmentType],
    );
    return sendSuccess(res, 201, "Notice created", { id: result.insertId });
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

export const getNotices = async (req, res, next) => {
  try {
    const { category_id } = req.query;
    let query =
      "SELECT id, category_id, title, notice_date, attachment_url, attachment_type, created_at FROM notice";
    const params = [];
    if (category_id) {
      query += " WHERE category_id = ?";
      params.push(category_id);
    }
    query += " ORDER BY notice_date DESC";
    const [notices] = await db.execute(query, params);
    return sendSuccess(res, 200, "Notices fetched", notices);
  } catch (error) {
    next(error);
  }
};

export const updateNotice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category_id, title, notice_date } = req.body || {};

    const [existing] = await db.execute(
      "SELECT category_id, title, notice_date, attachment_url, attachment_type FROM notice WHERE id = ? LIMIT 1",
      [id],
    );
    if (existing.length === 0) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(res, 404, "Notice not found");
    }

    let attachmentUrl = existing[0].attachment_url;
    let attachmentType = existing[0].attachment_type;
    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      attachmentType = ext === ".pdf" ? "pdf" : "image";
      if (attachmentType === "image") await compressImg(req.file);
      attachmentUrl =
        "uploads/" + req.file.path.replace(/\\/g, "/").split("/uploads/")[1];
    }

    await db.execute(
      "UPDATE notice SET category_id = ?, title = ?, notice_date = ?, attachment_url = ?, attachment_type = ? WHERE id = ?",
      [
        category_id !== undefined ? category_id : existing[0].category_id,
        title || existing[0].title,
        notice_date || existing[0].notice_date,
        attachmentUrl,
        attachmentType,
        id,
      ],
    );

    if (req.file && existing[0].attachment_url) {
      await fs
        .unlink(path.join(process.cwd(), existing[0].attachment_url))
        .catch(() => {});
    }

    return sendSuccess(res, 200, "Notice updated");
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

export const deleteNotice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [notice] = await db.execute(
      "SELECT attachment_url FROM notice WHERE id = ? LIMIT 1",
      [id],
    );
    if (notice.length === 0) return sendError(res, 404, "Notice not found");

    if (notice[0].attachment_url) {
      await fs
        .unlink(path.join(process.cwd(), notice[0].attachment_url))
        .catch(() => {});
    }
    await db.execute("DELETE FROM notice WHERE id = ?", [id]);
    return sendSuccess(res, 200, "Notice deleted");
  } catch (error) {
    next(error);
  }
};

// Blog
export const createBlog = async (req, res, next) => {
  try {
    const { category_id, title, description, published_date } = req.body;
    if (!title || !description || !published_date) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(
        res,
        400,
        "Title, description, and published date are required",
      );
    }

    if (category_id) {
      const [categoryExists] = await db.execute(
        "SELECT category_id FROM blog_category WHERE category_id = ? LIMIT 1",
        [category_id],
      );
      if (categoryExists.length === 0) {
        if (req.file) await deleteUploadedFiles(req.file);
        return sendError(res, 404, "Blog category not found");
      }
    }

    let imageUrl = null;
    if (req.file) {
      await compressImg(req.file);
      imageUrl =
        "uploads/" + req.file.path.replace(/\\/g, "/").split("/uploads/")[1];
    }

    const [result] = await db.execute(
      "INSERT INTO blog (category_id, title, description, image_url, published_date) VALUES (?, ?, ?, ?, ?)",
      [category_id || null, title, description, imageUrl, published_date],
    );
    return sendSuccess(res, 201, "Blog created", { id: result.insertId });
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    const { category_id } = req.query;
    let query =
      "SELECT id, category_id, title, description, image_url, published_date, created_at FROM blog";
    const params = [];
    if (category_id) {
      query += " WHERE category_id = ?";
      params.push(category_id);
    }
    query += " ORDER BY published_date DESC";
    const [blogs] = await db.execute(query, params);
    return sendSuccess(res, 200, "Blogs fetched", blogs);
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category_id, title, description, published_date } = req.body || {};

    const [existing] = await db.execute(
      "SELECT category_id, title, description, image_url, published_date FROM blog WHERE id = ? LIMIT 1",
      [id],
    );
    if (existing.length === 0) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(res, 404, "Blog not found");
    }

    let imageUrl = existing[0].image_url;
    if (req.file) {
      await compressImg(req.file);
      imageUrl =
        "uploads/" + req.file.path.replace(/\\/g, "/").split("/uploads/")[1];
    }

    await db.execute(
      "UPDATE blog SET category_id = ?, title = ?, description = ?, image_url = ?, published_date = ? WHERE id = ?",
      [
        category_id !== undefined ? category_id : existing[0].category_id,
        title || existing[0].title,
        description || existing[0].description,
        imageUrl,
        published_date || existing[0].published_date,
        id,
      ],
    );

    if (req.file && existing[0].image_url) {
      await fs
        .unlink(path.join(process.cwd(), existing[0].image_url))
        .catch(() => {});
    }

    return sendSuccess(res, 200, "Blog updated");
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [blog] = await db.execute(
      "SELECT image_url FROM blog WHERE id = ? LIMIT 1",
      [id],
    );
    if (blog.length === 0) return sendError(res, 404, "Blog not found");

    if (blog[0].image_url) {
      await fs
        .unlink(path.join(process.cwd(), blog[0].image_url))
        .catch(() => {});
    }
    await db.execute("DELETE FROM blog WHERE id = ?", [id]);
    return sendSuccess(res, 200, "Blog deleted");
  } catch (error) {
    next(error);
  }
};

// Vacancy
export const createVacancy = async (req, res, next) => {
  try {
    const {
      category_id,
      title,
      description,
      application_deadline,
      posted_date,
      status,
    } = req.body;
    if (!title || !description || !posted_date)
      return sendError(
        res,
        400,
        "Title, description, and posted date are required",
      );

    if (category_id) {
      const [categoryExists] = await db.execute(
        "SELECT category_id FROM vacancy_category WHERE category_id = ? LIMIT 1",
        [category_id],
      );
      if (categoryExists.length === 0)
        return sendError(res, 404, "Vacancy category not found");
    }

    const [result] = await db.execute(
      "INSERT INTO vacancy (category_id, title, description, application_deadline, posted_date, status) VALUES (?, ?, ?, ?, ?, ?)",
      [
        category_id || null,
        title,
        description,
        application_deadline || null,
        posted_date,
        status || "open",
      ],
    );
    return sendSuccess(res, 201, "Vacancy created", { id: result.insertId });
  } catch (error) {
    next(error);
  }
};

export const getVacancies = async (req, res, next) => {
  try {
    const { category_id, status } = req.query;
    let query =
      "SELECT id, category_id, title, description, application_deadline, posted_date, status, created_at FROM vacancy WHERE 1=1";
    const params = [];
    if (category_id) {
      query += " AND category_id = ?";
      params.push(category_id);
    }
    if (status) {
      query += " AND status = ?";
      params.push(status);
    }
    query += " ORDER BY posted_date DESC";
    const [vacancies] = await db.execute(query, params);
    return sendSuccess(res, 200, "Vacancies fetched", vacancies);
  } catch (error) {
    next(error);
  }
};

export const updateVacancy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      category_id,
      title,
      description,
      application_deadline,
      posted_date,
      status,
    } = req.body || {};

    const [existing] = await db.execute(
      "SELECT category_id, title, description, application_deadline, posted_date, status FROM vacancy WHERE id = ? LIMIT 1",
      [id],
    );
    if (existing.length === 0) return sendError(res, 404, "Vacancy not found");

    await db.execute(
      "UPDATE vacancy SET category_id = ?, title = ?, description = ?, application_deadline = ?, posted_date = ?, status = ? WHERE id = ?",
      [
        category_id !== undefined ? category_id : existing[0].category_id,
        title || existing[0].title,
        description || existing[0].description,
        application_deadline !== undefined
          ? application_deadline
          : existing[0].application_deadline,
        posted_date || existing[0].posted_date,
        status || existing[0].status,
        id,
      ],
    );
    return sendSuccess(res, 200, "Vacancy updated");
  } catch (error) {
    next(error);
  }
};

export const deleteVacancy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute("DELETE FROM vacancy WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return sendError(res, 404, "Vacancy not found");
    return sendSuccess(res, 200, "Vacancy deleted");
  } catch (error) {
    next(error);
  }
};
