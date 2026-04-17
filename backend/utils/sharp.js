import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const TARGET_SIZE_BYTES = 100 * 1024; // 100KB

export const compressImg = async (file) => {
  if (!file || !file.path) {
    throw new Error("Invalid file object passed to compressImg");
  }

  const filePath = file.path;
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);
  const tempPath = path.join(dir, `${baseName}-compressed${ext}`);

  let quality = 80;
  let maxWidth = 1920;
  let compressed = false;

  // Try reducing quality first
  while (quality >= 30 && !compressed) {
    await sharp(filePath)
      .resize(maxWidth, maxWidth, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toFile(tempPath);

    const stats = await fs.stat(tempPath);
    
    if (stats.size <= TARGET_SIZE_BYTES) {
      compressed = true;
    } else {
      await fs.unlink(tempPath).catch(() => {});
      quality -= 10;
    }
  }

  // If still not compressed, reduce dimensions
  while (!compressed && maxWidth >= 400) {
    maxWidth -= 200;
    await sharp(filePath)
      .resize(maxWidth, maxWidth, { fit: 'inside' })
      .jpeg({ quality: 30, mozjpeg: true })
      .toFile(tempPath);

    const stats = await fs.stat(tempPath);
    
    if (stats.size <= TARGET_SIZE_BYTES) {
      compressed = true;
    } else {
      await fs.unlink(tempPath).catch(() => {});
    }
  }

  await fs.rename(tempPath, filePath);
  return filePath;
};

// Delete uploaded files on error
export const deleteUploadedFiles = async (files) => {
  if (!files) return;

  try {
    if (Array.isArray(files)) {
      for (const file of files) {
        if (file.path) {
          await fs.unlink(file.path).catch(() => {});
        }
      }
    } else if (files.path) {
      await fs.unlink(files.path).catch(() => {});
    }
  } catch (error) {
    console.error("Error deleting files:", error);
  }
};
