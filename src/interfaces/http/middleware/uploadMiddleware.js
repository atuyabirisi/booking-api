import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    files: 8,
    fileSize: 6 * 1024 * 1024,
  },
});

export default upload;
