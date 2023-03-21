const multer = require("multer");
const path = require("path");

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, done) => {
            done(null, "uploads/board");
        },
        filename: (req, file, done) => {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            const filename = `${basename}_${ext}`;
            done(null, filename);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;

