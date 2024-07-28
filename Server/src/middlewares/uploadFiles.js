const multer = require("multer");
const path = require("path");
// const createError = require("http-errors");

// for user profile image
const maxUserImgSize = 2097152;
const allowedUserImgTypes = ["jpg", "jpeg", "png"];

const userStorage = multer.diskStorage({
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
const userFileFilter = (req, file, cb) => {
  const extName = path.extname(file.originalname);
  if (!allowedUserImgTypes.includes(file.mimetype)) {
    return cb(Error("File type not allowed"), false);
  }
  cb(null, true);
};
const userProfileUpload = multer({
  storage: userStorage,
  limits: { fileSize: maxUserImgSize },
  userFileFilter,
});

// for product image
const maxProductsImgSize = 2097152;
const allowedProductsImgTypes = ["jpg", "jpeg", "png", "gif", "ico", "svg"];

const productsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destPath = path.join(
      __dirname,
      "../../../client/public/images/products/"
    );
    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname);
    cb(null, file.originalname.replace(extName, "") + extName);
  },
});
const productsFileFilter = (req, file, cb) => {
  if (!allowedProductsImgTypes.includes(file.mimetype)) {
    return cb(Error("File type not allowed"), false);
  }
  cb(null, true);
};
const productsProfileUpload = multer({
  storage: productsStorage,
  limits: { fileSize: maxProductsImgSize },
  productsFileFilter,
});

module.exports = { userProfileUpload, productsProfileUpload };
