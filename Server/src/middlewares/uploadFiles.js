const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
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

<<<<<<< HEAD
const upload = multer({ storage: storage });

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

// const upload = multer({
//   storage: storage,
// limits: { fileSize: maxUserImgSize },
// fileFilter,
// });
=======
// const fileFilter = (req, file, cb) => {
//   const extName = path.extname(file.originalname);
//   if (!allowedUserImgTypes.includes(extName.substring(1))) {
//     console.log("Types error");
//     const error = createError(400, "File type not allowed.");
//     return cb(error);
//   }
//   console.log("Upload Success");
//   cb(null, true);
// };

const upload = multer({
  storage: storage,
  // limits: { fileSize: maxUserImgSize },
  // fileFilter,
});
>>>>>>> 6707704f045e36105d17115f4376c677a38031a2

module.exports = upload;
