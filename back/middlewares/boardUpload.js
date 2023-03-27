const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "uploads/board");
  },
  filename: (req, file, done) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const filename = `${basename}_${new Date().getTime()}${ext}`;
    done(null, filename);
  },
});

const fileFilter = (req, file, done) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("이 파일형식은 사용할 수 없습니다");
    error.code = "LIMIT_FILE_TYPES";
    return done(error, false);
  }
  done(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5, // Maximum 5 files
  },
});

module.exports = upload;
