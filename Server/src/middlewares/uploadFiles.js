const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
const {
  uploadUserImg,
  allowedUserImgTypes,
  maxUserImgSize,
} = require("../config/info");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadUserImg);
  },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname);
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(extName, "") + extName
    );
  },
});

const fileFilter = (req, file, cb) => {
  const extName = path.extname(file.originalname);
  if (!allowedUserImgTypes.includes(extName.substring(1))) {
    console.log("Types error");
    const error = createError(400, "File type not allowed.");
    return cb(error);
  }
  console.log("Upload Success");
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: maxUserImgSize },
  fileFilter,
});

module.exports = upload;
