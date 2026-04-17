import db from "../config/dbconnect.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendError, sendSuccess } from "../utils/response.js";
dotenv.config();

// Admin Login - Optimized
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return sendError(res, 400, "Email and Password are required");
    }

    // Optimized query - select only needed fields, LIMIT 1 for performance
    const [result] = await db.execute(
      "SELECT id, email, password, role FROM admin WHERE email = ? LIMIT 1",
      [email]
    );

    if (result.length === 0) {
      return sendError(res, 401, "Invalid credentials");
    }

    const admin = result[0];

    // Verify password
    const isMatch = await bcryptjs.compare(password, admin.password);

    if (!isMatch) {
      return sendError(res, 401, "Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.EXPIRE || "7d",
      }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Success response
    return sendSuccess(res, 200, "Login successful", {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Logout
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return sendSuccess(res, 200, "Logout successful");
  } catch (error) {
    next(error);
  }
};

// Get Admin Profile
export const getProfile = async (req, res, next) => {
  try {
    const adminId = req.user.id;

    const [result] = await db.execute(
      "SELECT id, email, role, created_at FROM admin WHERE id = ? LIMIT 1",
      [adminId]
    );

    if (result.length === 0) {
      return sendError(res, 404, "Admin not found");
    }

    return sendSuccess(res, 200, "Profile fetched successfully", result[0]);
  } catch (error) {
    next(error);
  }
};

// Change Password
export const changePassword = async (req, res, next) => {
  try {
    const adminId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return sendError(res, 400, "Current and new password are required");
    }

    const [result] = await db.execute(
      "SELECT password FROM admin WHERE id = ? LIMIT 1",
      [adminId]
    );

    if (result.length === 0) {
      return sendError(res, 404, "Admin not found");
    }

    const isMatch = await bcryptjs.compare(currentPassword, result[0].password);

    if (!isMatch) {
      return sendError(res, 400, "Current password is incorrect");
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    await db.execute("UPDATE admin SET password = ? WHERE id = ?", [
      hashedPassword,
      adminId,
    ]);

    return sendSuccess(res, 200, "Password changed successfully");
  } catch (error) {
    next(error);
  }
};

// Dashboard Stats
export const getDashboardStats = async (req, res, next) => {
  try {
    const [[{ studentCount }]] = await db.execute("SELECT COUNT(*) as studentCount FROM students");
    const [[{ teamCount }]] = await db.execute("SELECT COUNT(*) as teamCount FROM team WHERE role = 'teacher'");
    const [[{ classCount }]] = await db.execute("SELECT COUNT(*) as classCount FROM class_category");
    const [[{ noticeCount }]] = await db.execute("SELECT COUNT(*) as noticeCount FROM notice");
    const [[{ galleryCount }]] = await db.execute("SELECT COUNT(*) as galleryCount FROM gallery");
    const [[{ blogCount }]] = await db.execute("SELECT COUNT(*) as blogCount FROM blog");
    const [[{ subjectCount }]] = await db.execute("SELECT COUNT(*) as subjectCount FROM subjects");
    const [[{ eventCount }]] = await db.execute("SELECT COUNT(*) as eventCount FROM event");

    const [recentNotices] = await db.execute(
      "SELECT 'Notice' as category, title, created_at FROM notice ORDER BY created_at DESC LIMIT 5"
    );

    return sendSuccess(res, 200, "Dashboard stats fetched", {
      stats: {
        students: studentCount,
        teachers: teamCount,
        classes: classCount,
        notices: noticeCount,
        gallery: galleryCount,
        blogs: blogCount,
        subjects: subjectCount,
        events: eventCount,
      },
      recentActivities: recentNotices,
    });
  } catch (error) {
    next(error);
  }
};
