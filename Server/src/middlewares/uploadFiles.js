const multer = require("multer");
const path = require("path");
// const createError = require("http-errors");
const { allowedUserImgTypes, maxUserImgSize } = require("../config/info");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destPath = path.join(
      __dirname,
      "../../../client/public/images/users/"
    );
    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname);
    cb(null, file.originalname.replace(extName, "") + extName);
  },
});

const fileFilter = (req, file, cb) => {
  const extName = path.extname(file.originalname);
  if (!allowedUserImgTypes.includes(file.mimetype)) {
    return cb(Error("File type not allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: maxUserImgSize },
  // fileFilter,
});

module.exports = upload;
