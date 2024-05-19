require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 3001;
const mongodb_url =
  process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerceMernDB";

const defaultImagePath =
  process.env.DEFAULT_USER_IMAGE_PATH || "/images/users/defaultUsers.png";

const jwtActivationKey =
  process.env.JWT_ACTIVATION_KEY || "HDSTRET34895UHWER8934_@$%";

const smtpUser = process.env.SMTP_USERNAME || "";
const smtpPass = process.env.SMTP_PASSWORD || "";

const clientURL = process.env.CLIENT_URL || "";

module.exports = {
  serverPort,
  mongodb_url,
  defaultImagePath,
  jwtActivationKey,
  smtpUser,
  smtpPass,
  clientURL,
};
