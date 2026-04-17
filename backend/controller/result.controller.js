import db from "../config/dbconnect.js";
import { sendError, sendSuccess } from "../utils/response.js";
import { deleteUploadedFiles } from "../utils/sharp.js";
import xlsx from "xlsx";
import fs from "fs/promises";

export const addSubject = async (req, res, next) => {
  try {
    const { class_id, subject_name } = req.body;

    if (!class_id || !subject_name) {
      return sendError(res, 400, "Class and subject name are required");
    }

    const [classExists] = await db.execute(
      "SELECT id FROM class_category WHERE id = ? LIMIT 1",
      [class_id]
    );

    if (classExists.length === 0) {
      return sendError(res, 404, "Class category not found");
    }

    const [result] = await db.execute(
      "INSERT INTO subjects (class_id, subject_name, th_credit_hrs, in_credit_hrs) VALUES (?, ?, 0, 0)",
      [class_id, subject_name]
    );

    return sendSuccess(res, 201, "Subject added successfully", {
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubjects = async (req, res, next) => {
  try {
    const { class_id, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    let query =
      "SELECT s.id, s.class_id, c.category_name, s.subject_name, s.th_credit_hrs, s.in_credit_hrs FROM subjects s LEFT JOIN class_category c ON s.class_id = c.id";
    let countQuery = "SELECT COUNT(*) as total FROM subjects s";
    const params = [];
    const countParams = [];

    if (class_id) {
      query += " WHERE s.class_id = ?";
      countQuery += " WHERE s.class_id = ?";
      params.push(class_id);
      countParams.push(class_id);
    }

    const [[{ total }]] = await db.execute(countQuery, countParams);

    query += ` ORDER BY s.id DESC LIMIT ${limitNum} OFFSET ${offset}`;
    const [subjects] = await db.execute(query, params);

    return sendSuccess(res, 200, "Subjects fetched successfully", {
      subjects,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [subject] = await db.execute(
      "SELECT id FROM subjects WHERE id = ? LIMIT 1",
      [id]
    );

    if (subject.length === 0) {
      return sendError(res, 404, "Subject not found");
    }

    await db.execute("DELETE FROM subjects WHERE id = ?", [id]);
    return sendSuccess(res, 200, "Subject deleted successfully");
  } catch (error) {
    next(error);
  }
};

//upload excel
export const uploadExcelResult = async (req, res, next) => {
  try {
    if (!req.file) return sendError(res, 400, "Excel file is required");

    const { class_category_id } = req.body;
    if (!class_category_id)
      return sendError(res, 400, "Class category is required");

    const [classExists] = await db.execute(
      "SELECT id FROM class_category WHERE id = ? LIMIT 1",
      [class_category_id]
    );
    if (classExists.length === 0) {
      await deleteUploadedFiles(req.file);
      return sendError(res, 404, "Class category not found");
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    if (rawData.length < 3) {
      await deleteUploadedFiles(req.file);
      return sendError(res, 400, "Excel file is empty or invalid");
    }

    const subjectRow = rawData[0];
    const headerRow = rawData[1];
    const dataRows = rawData.slice(2);

    const [subjects] = await db.execute(
      "SELECT id, subject_name FROM subjects WHERE class_id = ?",
      [class_category_id]
    );

    if (subjects.length === 0) {
      await deleteUploadedFiles(req.file);
      return sendError(
        res,
        400,
        "No subjects found for this class. Please add subjects first."
      );
    }

    const subjectMap = {};
    subjects.forEach((sub) => {
      subjectMap[sub.subject_name.toLowerCase().trim()] = sub.id;
    });

    const excelSubjects = [];
    const missingSubjects = [];
    let i = 7;

    while (i < headerRow.length - 1) {
      if (
        headerRow[i] &&
        headerRow[i].toString().toLowerCase().includes("in_marks")
      ) {
        if (subjectRow[i] && subjectRow[i].toString().trim()) {
          const subjectName = subjectRow[i].toString().trim();
          const subjectNameLower = subjectName.toLowerCase();
          if (subjectMap[subjectNameLower]) {
            excelSubjects.push(subjectMap[subjectNameLower]);
          } else {
            missingSubjects.push(subjectName);
          }
        }
        i += 3;
      } else {
        i++;
      }
    }

    if (missingSubjects.length > 0) {
      await deleteUploadedFiles(req.file);
      return sendError(
        res,
        400,
        `Missing subjects in database: ${missingSubjects.join(
          ", "
        )}. Please add these subjects first.`
      );
    }

    let studentCount = 0;
    for (const row of dataRows) {
      if (!row[0]) continue;

      const finalGpaIndex = row.length - 1;
      const examYear = row[6] || "2081";
      const finalGpa = row[finalGpaIndex] || null;

      const [student] = await db.execute(
        "INSERT INTO students (iemis_code, name, dob, father_name, mother_name, symbol_no, examination_year, final_gpa, class_category_id, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'final')",
        [
          row[0] || null,
          row[1] || null,
          row[2] || null,
          row[3] || null,
          row[4] || null,
          row[5] || null,
          examYear,
          finalGpa,
          class_category_id,
        ]
      );

      const studentId = student.insertId;
      let colIndex = 7;

      for (let i = 0; i < excelSubjects.length; i++) {
        const inMarks = row[colIndex] || null;
        const thMarks = row[colIndex + 1] || null;
        const totalMarks = row[colIndex + 2] || null;

        await db.execute(
          "INSERT INTO marks (student_id, subject_id, in_marks, th_marks, total_marks) VALUES (?, ?, ?, ?, ?)",
          [studentId, excelSubjects[i], inMarks, thMarks, totalMarks]
        );

        colIndex += 3;
      }
      studentCount++;
    }

    await deleteUploadedFiles(req.file);
    return sendSuccess(res, 201, "Results uploaded successfully", {
      fileName: req.file.originalname,
      studentCount,
    });
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

export const getStudentResults = async (req, res, next) => {
  try {
    const { class_category_id, search, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    let query =
      "SELECT s.*, c.category_name FROM students s LEFT JOIN class_category c ON s.class_category_id = c.id WHERE (s.source = 'final' OR s.source IS NULL)";
    let countQuery = "SELECT COUNT(*) as total FROM students s WHERE (s.source = 'final' OR s.source IS NULL)";
    const params = [];
    const countParams = [];
    const conditions = [];

    if (class_category_id) {
      conditions.push("s.class_category_id = ?");
      params.push(class_category_id);
      countParams.push(class_category_id);
    }

    if (search) {
      conditions.push(
        "(s.name LIKE ? OR s.iemis_code LIKE ? OR s.symbol_no LIKE ?)"
      );
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
      countParams.push(searchTerm, searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      const whereClause = " WHERE " + conditions.join(" AND ");
      query += whereClause;
      countQuery += whereClause;
    }

    const [[{ total }]] = await db.execute(countQuery, countParams);

    query += ` ORDER BY s.id DESC LIMIT ${limitNum} OFFSET ${offset}`;

    const [students] = await db.execute(query, params);

    return sendSuccess(res, 200, "Student results fetched", {
      students,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudentResult = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [student] = await db.execute(
      "SELECT id FROM students WHERE id = ? LIMIT 1",
      [id]
    );

    if (student.length === 0) {
      return sendError(res, 404, "Student not found");
    }

    await db.execute("DELETE FROM students WHERE id = ?", [id]);
    return sendSuccess(res, 200, "Student result deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteAllStudentsByClass = async (req, res, next) => {
  try {
    const { class_category_id } = req.params;

    const [students] = await db.execute(
      "SELECT COUNT(*) as count FROM students WHERE class_category_id = ?",
      [class_category_id]
    );

    if (students[0].count === 0) {
      return sendError(res, 404, "No students found for this class");
    }

    await db.execute("DELETE FROM students WHERE class_category_id = ?", [
      class_category_id,
    ]);

    return sendSuccess(
      res,
      200,
      `${students[0].count} student(s) deleted successfully`
    );
  } catch (error) {
    next(error);
  }
};

const calculateGradeAndGPA = (obtainedMarks, totalMarks) => {
  const percentage = (obtainedMarks / totalMarks) * 100;

  if (percentage >= 90)
    return { grade: "A+", gpa: 4.0, remarks: "Outstanding" };
  if (percentage >= 80) return { grade: "A", gpa: 3.6, remarks: "Excellent" };
  if (percentage >= 70) return { grade: "B+", gpa: 3.2, remarks: "Very Good" };
  if (percentage >= 60) return { grade: "B", gpa: 2.8, remarks: "Good" };
  if (percentage >= 50)
    return { grade: "C+", gpa: 2.4, remarks: "Satisfactory" };
  if (percentage >= 40) return { grade: "C", gpa: 2.0, remarks: "Acceptable" };
  if (percentage >= 35) return { grade: "D", gpa: 1.6, remarks: "Basic" };
  return { grade: "NG", gpa: null, remarks: "Not Graded" };
};

const excelDateToString = (value) => {
  if (!value && value !== 0) return null;
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") {
    // Excel serial date: days since 1899-12-30
    const date = new Date(Math.round((value - 25569) * 86400 * 1000));
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  return String(value);
};

export const uploadTerminalExamExcel = async (req, res, next) => {
  try {
    const { exam_category_id, class_category_id } = req.body;

    if (!exam_category_id || !class_category_id) {
      if (req.file) await deleteUploadedFiles(req.file);
      return sendError(
        res,
        400,
        "Exam category and class category are required"
      );
    }

    if (!req.file) {
      return sendError(res, 400, "Excel file is required");
    }

    const [[examCategory]] = await db.execute(
      "SELECT id FROM exam_instance WHERE id = ? LIMIT 1",
      [exam_category_id]
    );
    if (!examCategory) {
      await deleteUploadedFiles(req.file);
      return sendError(res, 404, "Exam instance not found");
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { raw: true, defval: null });

    if (data.length === 0) {
      await deleteUploadedFiles(req.file);
      return sendError(res, 400, "Excel file is empty");
    }

    const requiredFields = ["symbol_no", "name"];
    const firstRow = data[0];
    const missingFields = requiredFields.filter(
      (field) => !(field in firstRow)
    );

    if (missingFields.length > 0) {
      await deleteUploadedFiles(req.file);
      return sendError(
        res,
        400,
        `Excel missing required columns: ${missingFields.join(", ")}. Columns 'symbol_no' and 'name' are mandatory.`
      );
    }

    const [subjects] = await db.execute(
      "SELECT id, subject_name FROM subjects WHERE class_id = ?",
      [class_category_id]
    );

    if (subjects.length === 0) {
      await deleteUploadedFiles(req.file);
      return sendError(res, 400, "No subjects found for this class");
    }

    const [examMarks] = await db.execute(
      "SELECT esm.subject_id, esm.total_marks, esm.pass_marks, s.subject_name FROM exam_subject_marks esm JOIN subjects s ON esm.subject_id = s.id WHERE esm.exam_category_id = ? AND s.class_id = ?",
      [exam_category_id, class_category_id]
    );

    if (examMarks.length === 0) {
      await deleteUploadedFiles(req.file);
      return sendError(
        res,
        400,
        "No marks configured for this exam. Please configure marks first."
      );
    }

    const subjectMap = {};
    examMarks.forEach((mark) => {
      const normalizedName = mark.subject_name.toLowerCase().trim().replace(/\s+/g, ' ');
      subjectMap[normalizedName] = mark;
    });

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    for (const row of data) {
      try {
        const { iemis_code, name, dob, father_name, mother_name, symbol_no } = row;

        if (!symbol_no || !name) {
          errorCount++;
          errors.push(`Row skipped: 'symbol_no' and 'name' are required`);
          continue;
        }

        const [[existingStudent]] = await db.execute(
          "SELECT id FROM students WHERE symbol_no = ? LIMIT 1",
          [symbol_no]
        );

        let studentId;
        if (existingStudent) {
          studentId = existingStudent.id;
        } else {
          const [result] = await db.execute(
            "INSERT INTO students (iemis_code, name, dob, father_name, mother_name, symbol_no, class_category_id, source) VALUES (?, ?, ?, ?, ?, ?, ?, 'terminal')",
            [
              iemis_code || null,
              name,
              excelDateToString(dob),
              father_name || null,
              mother_name || null,
              symbol_no,
              class_category_id,
            ]
          );
          studentId = result.insertId;
        }

        for (const [subjectName, subjectData] of Object.entries(subjectMap)) {
          // Try multiple variations of the subject name from Excel
          const excelSubjectVariations = [
            subjectName,
            subjectName.toLowerCase(),
            subjectName.toLowerCase().trim(),
            subjectName.toLowerCase().trim().replace(/\s+/g, ' ')
          ];
          
          let obtainedMarks = null;
          
          // Check each variation to find the marks
          for (const variation of excelSubjectVariations) {
            if (row[variation] !== undefined && row[variation] !== null && row[variation] !== "") {
              obtainedMarks = row[variation];
              break;
            }
          }
          
          // Also check the original subject name from database
          const originalSubjectName = Object.keys(row).find(key => 
            key.toLowerCase().trim().replace(/\s+/g, ' ') === subjectName
          );
          
          if (originalSubjectName && row[originalSubjectName] !== undefined && row[originalSubjectName] !== null && row[originalSubjectName] !== "") {
            obtainedMarks = row[originalSubjectName];
          }

          if (
            obtainedMarks === undefined ||
            obtainedMarks === null ||
            obtainedMarks === ""
          )
            continue;

          const [[existing]] = await db.execute(
            "SELECT id FROM terminal_exam WHERE exam_category_id = ? AND student_id = ? AND subject_id = ? LIMIT 1",
            [exam_category_id, studentId, subjectData.subject_id]
          );

          if (existing) {
            // Update existing marks instead of skipping
            const { grade, gpa, remarks } = calculateGradeAndGPA(
              Number(obtainedMarks),
              Number(subjectData.total_marks)
            );
            await db.execute(
              "UPDATE terminal_exam SET obtained_marks = ?, grade = ?, gpa = ?, remarks = ? WHERE id = ?",
              [obtainedMarks, grade, gpa, remarks, existing.id]
            );
            continue;
          }

          const { grade, gpa, remarks } = calculateGradeAndGPA(
            Number(obtainedMarks),
            Number(subjectData.total_marks)
          );

          await db.execute(
            "INSERT INTO terminal_exam (exam_category_id, student_id, subject_id, obtained_marks, grade, gpa, remarks) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              exam_category_id,
              studentId,
              subjectData.subject_id,
              obtainedMarks,
              grade,
              gpa,
              remarks,
            ]
          );
        }
        successCount++;
      } catch (err) {
        errorCount++;
        errors.push(err.message);
      }
    }

    await fs.unlink(req.file.path).catch(() => {});

    return sendSuccess(res, 201, "Terminal exam data uploaded", {
      successCount,
      errorCount,
      total: data.length,
      errors: errors.slice(0, 5),
    });
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

export const getTerminalExams = async (req, res, next) => {
  try {
    const {
      exam_category_id,
      class_category_id,
      search,
      page = 1,
      limit = 10,
    } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    let query = `
      SELECT DISTINCT
        s.id as student_id, s.name as student_name, s.symbol_no, s.iemis_code, s.dob,
        te.exam_category_id, ei.name as exam_name, ay.year as exam_year
      FROM terminal_exam te
      JOIN students s ON te.student_id = s.id
      JOIN exam_instance ei ON te.exam_category_id = ei.id
      JOIN academic_year ay ON ei.exam_year_id = ay.id
    `;
    let countQuery = `SELECT COUNT(DISTINCT te.student_id) as total FROM terminal_exam te JOIN students s ON te.student_id = s.id`;
    const params = [];
    const countParams = [];
    const conditions = [];

    if (exam_category_id) {
      conditions.push("te.exam_category_id = ?");
      params.push(exam_category_id);
      countParams.push(exam_category_id);
    }

    if (class_category_id) {
      conditions.push("s.class_category_id = ?");
      params.push(class_category_id);
      countParams.push(class_category_id);
    }

    if (search) {
      conditions.push(
        "(s.name LIKE ? OR s.symbol_no LIKE ? OR s.iemis_code LIKE ?)"
      );
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
      countParams.push(searchTerm, searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      const whereClause = " WHERE " + conditions.join(" AND ");
      query += whereClause;
      countQuery += whereClause;
    }

    const [[{ total }]] = await db.execute(countQuery, countParams);

    query += ` ORDER BY s.name ASC LIMIT ${limitNum} OFFSET ${offset}`;

    const [students] = await db.execute(query, params);
    return sendSuccess(res, 200, "Terminal exams fetched", {
      exams: students,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTerminalExamDetails = async (req, res, next) => {
  try {
    const { student_id, exam_category_id } = req.query;

    if (!student_id || !exam_category_id) {
      return sendError(res, 400, "Student ID and exam category are required");
    }

    const [[student]] = await db.execute(
      "SELECT * FROM students WHERE id = ? LIMIT 1",
      [parseInt(student_id)]
    );

    if (!student) {
      return sendError(res, 404, "Student not found");
    }

    const [[examCategory]] = await db.execute(
      "SELECT ei.name as exam_name, ay.year as exam_year FROM exam_instance ei JOIN academic_year ay ON ei.exam_year_id = ay.id WHERE ei.id = ? LIMIT 1",
      [parseInt(exam_category_id)]
    );

    const [exams] = await db.execute(
      `SELECT te.*, sub.subject_name, esm.total_marks, esm.pass_marks
       FROM terminal_exam te
       JOIN subjects sub ON te.subject_id = sub.id
       JOIN exam_subject_marks esm ON esm.exam_category_id = te.exam_category_id AND esm.subject_id = te.subject_id
       WHERE te.student_id = ? AND te.exam_category_id = ?
       ORDER BY sub.subject_name`,
      [parseInt(student_id), parseInt(exam_category_id)]
    );

    if (exams.length === 0) {
      return sendError(res, 404, "No exam records found for this student in the selected exam category.");
    }

    return sendSuccess(res, 200, "Terminal exam details fetched", {
      ...student,
      exam_category_name: examCategory ? `${examCategory.exam_name}(${examCategory.exam_year})` : null,
      exams,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTerminalExamByStudent = async (req, res, next) => {
  try {
    const { student_id, exam_category_id } = req.params;

    // Delete terminal exam records
    const [result] = await db.execute(
      "DELETE FROM terminal_exam WHERE student_id = ? AND exam_category_id = ?",
      [student_id, exam_category_id]
    );
    if (result.affectedRows === 0)
      return sendError(res, 404, "Terminal exam records not found");

    // Check if student has any other terminal exams — if not, delete student too
    const [[remaining]] = await db.execute(
      "SELECT COUNT(*) as count FROM terminal_exam WHERE student_id = ?",
      [student_id]
    );
    if (remaining.count === 0) {
      await db.execute("DELETE FROM students WHERE id = ?", [student_id]);
    }

    return sendSuccess(res, 200, "Student terminal exam deleted");
  } catch (error) {
    next(error);
  }
};

export const deleteAllTerminalExamsByCategory = async (req, res, next) => {
  try {
    const { exam_category_id, class_category_id } = req.params;

    if (
      !exam_category_id ||
      isNaN(exam_category_id) ||
      !class_category_id ||
      isNaN(class_category_id)
    ) {
      return sendError(
        res,
        400,
        "Valid exam category ID and class category ID are required"
      );
    }

    // First get the student IDs that will be affected
    const [studentsToDelete] = await db.execute(
      `SELECT DISTINCT s.id FROM students s 
       JOIN terminal_exam te ON s.id = te.student_id 
       WHERE te.exam_category_id = ? AND s.class_category_id = ?`,
      [parseInt(exam_category_id), parseInt(class_category_id)]
    );

    if (studentsToDelete.length === 0) {
      return sendError(
        res,
        404,
        "No students found for this category and class"
      );
    }

    // Delete terminal exam records first
    const [terminalResult] = await db.execute(
      `DELETE te FROM terminal_exam te 
       JOIN students s ON te.student_id = s.id 
       WHERE te.exam_category_id = ? AND s.class_category_id = ?`,
      [parseInt(exam_category_id), parseInt(class_category_id)]
    );

    // Delete the students (this will cascade delete marks due to foreign key)
    const studentIds = studentsToDelete.map(s => s.id);
    const placeholders = studentIds.map(() => '?').join(',');
    const [studentResult] = await db.execute(
      `DELETE FROM students WHERE id IN (${placeholders})`,
      studentIds
    );

    return sendSuccess(
      res,
      200,
      `${studentResult.affectedRows} student(s) and ${terminalResult.affectedRows} terminal exam record(s) deleted`
    );
  } catch (error) {
    next(error);
  }
};

// Final Result Excel Upload
export const uploadFinalResultExcel = async (req, res, next) => {
  try {
    if (!req.file) return sendError(res, 400, "Excel file is required");

    const { exam_instance_id, class_category_id } = req.body;
    if (!exam_instance_id || !class_category_id)
      return sendError(res, 400, "exam_instance_id and class_category_id are required");

    const [[examInstance]] = await db.execute(
      "SELECT id FROM exam_instance WHERE id = ? LIMIT 1",
      [exam_instance_id]
    );
    if (!examInstance) {
      await deleteUploadedFiles(req.file);
      return sendError(res, 404, "Exam instance not found");
    }

    const [[classExists]] = await db.execute(
      "SELECT id FROM class_category WHERE id = ? LIMIT 1",
      [class_category_id]
    );
    if (!classExists) {
      await deleteUploadedFiles(req.file);
      return sendError(res, 404, "Class category not found");
    }

    const [dbSubjects] = await db.execute(
      "SELECT id, subject_name FROM subjects WHERE class_id = ?",
      [class_category_id]
    );
    if (dbSubjects.length === 0) {
      await deleteUploadedFiles(req.file);
      return sendError(res, 400, "No subjects found for this class. Please add subjects first.");
    }

    const normalize = (s) => s.toLowerCase().trim().replace(/\s+/g, ' ');

    const subjectMap = {};
    dbSubjects.forEach((s) => {
      subjectMap[normalize(s.subject_name)] = s.subject_name;
    });

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null });

    if (rawData.length < 3) {
      await deleteUploadedFiles(req.file);
      return sendError(res, 400, "Excel must have at least 3 rows");
    }

    const subjectRow = rawData[0];
    const excelSubjects = [];
    const missingSubjects = [];

    for (let i = 8; i < subjectRow.length - 1; i += 3) {
      const rawName = subjectRow[i];
      if (!rawName) continue;
      const name = rawName.toString().trim();
      const nameLower = normalize(name);
      if (subjectMap[nameLower]) {
        excelSubjects.push({ colIndex: i, subjectName: subjectMap[nameLower] });
      } else {
        missingSubjects.push(name);
      }
    }

    if (missingSubjects.length > 0) {
      await deleteUploadedFiles(req.file);
      return sendError(res, 400, `Subjects not found in DB for this class: ${missingSubjects.join(", ")}. Please add them first.`);
    }
    if (excelSubjects.length === 0) {
      await deleteUploadedFiles(req.file);
      return sendError(res, 400, "No subjects found in Excel Row 1 from column 9 onward.");
    }

    const dataRows = rawData.slice(2);
    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    let i = 0;
    while (i < dataRows.length) {
      const gradeRow = dataRows[i];
      if (!gradeRow || gradeRow[0] === null || gradeRow[0] === undefined) { i++; continue; }

      const gpaRow = dataRows[i + 1] || [];

      try {
        const school_name  = gradeRow[1] ? gradeRow[1].toString().trim() : null;
        const school_code  = gradeRow[2] ? gradeRow[2].toString().trim() : null;
        const student_name = gradeRow[3] ? gradeRow[3].toString().trim() : null;
        const dob          = gradeRow[4] ? gradeRow[4].toString().trim() : null;
        const father_name  = gradeRow[5] ? gradeRow[5].toString().trim() : null;
        const mother_name  = gradeRow[6] ? gradeRow[6].toString().trim() : null;
        const symbol_no    = gradeRow[7] ? gradeRow[7].toString().trim() : null;
        const final_gpa    = gradeRow[gradeRow.length - 1] != null ? parseFloat(gradeRow[gradeRow.length - 1]) : null;

        if (!student_name || !symbol_no) {
          errors.push(`Row ${i + 3}: student_name and symbol_no are required`);
          errorCount++;
          i += 2;
          continue;
        }

        // Insert into final_result_student — check existing first
        const [[existingStudent]] = await db.execute(
          "SELECT id FROM final_result_student WHERE exam_instance_id = ? AND symbol_no = ? LIMIT 1",
          [exam_instance_id, symbol_no]
        );

        let studentId;
        if (existingStudent) {
          // Update existing
          await db.execute(
            `UPDATE final_result_student SET
              school_name=?, school_code=?, student_name=?, dob=?,
              father_name=?, mother_name=?, final_gpa=?
             WHERE id=?`,
            [school_name, school_code, student_name, dob, father_name, mother_name, final_gpa, existingStudent.id]
          );
          studentId = existingStudent.id;
          // Delete old marks so they get re-inserted fresh
          await db.execute("DELETE FROM final_result_marks WHERE student_id = ?", [studentId]);
        } else {
          // Fresh insert
          const [studentResult] = await db.execute(
            `INSERT INTO final_result_student
              (exam_instance_id, class_category_id, school_name, school_code, student_name, dob, father_name, mother_name, symbol_no, final_gpa)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [exam_instance_id, class_category_id, school_name, school_code, student_name, dob, father_name, mother_name, symbol_no, final_gpa]
          );
          studentId = studentResult.insertId;
        }

        // Insert marks into final_result_marks
        for (const { colIndex, subjectName } of excelSubjects) {
          const in_grade    = gradeRow[colIndex]     ? gradeRow[colIndex].toString().trim()     : null;
          const th_grade    = gradeRow[colIndex + 1] ? gradeRow[colIndex + 1].toString().trim() : null;
          const total_grade = gradeRow[colIndex + 2] ? gradeRow[colIndex + 2].toString().trim() : null;
          const in_gpa      = gpaRow[colIndex]     != null ? parseFloat(gpaRow[colIndex])     : null;
          const th_gpa      = gpaRow[colIndex + 1] != null ? parseFloat(gpaRow[colIndex + 1]) : null;
          const total_gpa   = gpaRow[colIndex + 2] != null ? parseFloat(gpaRow[colIndex + 2]) : null;

          await db.execute(
            `INSERT INTO final_result_marks
              (student_id, subject_name, in_grade, in_gpa, th_grade, th_gpa, total_grade, total_gpa)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [studentId, subjectName, in_grade, in_gpa, th_grade, th_gpa, total_grade, total_gpa]
          );
        }
        successCount++;
      } catch (err) {
        errors.push(`Row ${i + 3}: ${err.message}`);
        errorCount++;
      }
      i += 2;
    }

    await fs.unlink(req.file.path).catch(() => {});

    return sendSuccess(res, 201, "Final result uploaded successfully", {
      successCount,
      errorCount,
      totalRows: successCount + errorCount,
      errors: errors.slice(0, 5),
    });
  } catch (error) {
    if (req.file) await deleteUploadedFiles(req.file);
    next(error);
  }
};

export const getFinalResults = async (req, res, next) => {
  try {
    const { exam_instance_id, class_category_id, symbol_no, page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    // Count distinct students
    let countQuery = "SELECT COUNT(*) as total FROM final_result_student frs WHERE 1=1";
    const countParams = [];
    if (exam_instance_id) { countQuery += " AND frs.exam_instance_id = ?"; countParams.push(exam_instance_id); }
    if (class_category_id) { countQuery += " AND frs.class_category_id = ?"; countParams.push(class_category_id); }
    if (symbol_no) { countQuery += " AND frs.symbol_no = ?"; countParams.push(symbol_no); }
    const [[{ total }]] = await db.execute(countQuery, countParams);

    // Paginated student IDs
    let studentQuery = "SELECT frs.id FROM final_result_student frs WHERE 1=1";
    const studentParams = [...countParams];
    if (exam_instance_id) studentQuery += " AND frs.exam_instance_id = ?";
    if (class_category_id) studentQuery += " AND frs.class_category_id = ?";
    if (symbol_no) studentQuery += " AND frs.symbol_no = ?";
    studentQuery += ` ORDER BY frs.student_name ASC LIMIT ${limitNum} OFFSET ${offset}`;
    const [studentIds] = await db.execute(studentQuery, studentParams);

    if (studentIds.length === 0) {
      return sendSuccess(res, 200, "Final results fetched", {
        students: [],
        pagination: { currentPage: pageNum, totalPages: Math.ceil(total / limitNum), totalItems: total },
      });
    }

    const ids = studentIds.map((s) => s.id);
    const placeholders = ids.map(() => "?").join(",");

    const [rows] = await db.execute(
      `SELECT
        frs.id as student_id, frs.exam_instance_id, frs.class_category_id,
        frs.school_name, frs.school_code, frs.student_name, frs.dob,
        frs.father_name, frs.mother_name, frs.symbol_no, frs.final_gpa,
        frm.id as mark_id, frm.subject_name,
        frm.in_grade, frm.in_gpa, frm.th_grade, frm.th_gpa, frm.total_grade, frm.total_gpa
       FROM final_result_student frs
       LEFT JOIN final_result_marks frm ON frm.student_id = frs.id
       WHERE frs.id IN (${placeholders})
       ORDER BY frs.student_name ASC, frm.subject_name ASC`,
      ids
    );

    return sendSuccess(res, 200, "Final results fetched", {
      students: rows,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFinalResultByExam = async (req, res, next) => {
  try {
    const { exam_instance_id, class_category_id } = req.params;
    // Cascade deletes final_result_marks via FK
    const [result] = await db.execute(
      "DELETE FROM final_result_student WHERE exam_instance_id = ? AND class_category_id = ?",
      [exam_instance_id, class_category_id]
    );
    if (result.affectedRows === 0)
      return sendError(res, 404, "No records found to delete");
    return sendSuccess(res, 200, `${result.affectedRows} student(s) deleted`);
  } catch (error) {
    next(error);
  }
};
