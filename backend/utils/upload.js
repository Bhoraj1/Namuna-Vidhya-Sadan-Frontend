import multer from "multer";
import path from "path";
import fs from "fs";
// Create upload directory if not exists
const createUploadDir = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Dynamic multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.uploadFolder || "uploads/others";
    const uploadPath = path.join(process.cwd(), folder);
    createUploadDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|xlsx|xls/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype) || file.mimetype.includes('spreadsheet') || file.mimetype.includes('excel');

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images, PDF, and Excel files are allowed"));
  }
};

// Upload middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Multiple images upload (max 3)
export const uploadMultiple = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).array("images", 3);

// Set upload folder middleware
export const setUploadFolder = (folder) => {
  return (req, res, next) => {
    req.uploadFolder = folder;
    next();
  };
};

// Multiple upload with folder
export const uploadMultipleWithFolder = (
  folder,
  fieldName = "images",
  maxCount = 3
) => {
  return [
    setUploadFolder(folder),
    multer({
      storage,
      fileFilter,
      limits: { fileSize: 10 * 1024 * 1024 },
    }).array(fieldName, maxCount),
  ];
};
