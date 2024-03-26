const express = require("express");
const { seedUser } = require("../controllers/seedUser.controller");
const seedRouter = express.Router();

seedRouter.get("/users", seedUser);

module.exports = seedRouter;
