const data = require("../../data");
const user = require("../models/users.model");

const seedUser = async (req, res, next) => {
  try {
    // deleting all existing users
    await user.deleteMany({});

    // inserting new users
    const users = await user.insertMany(data.user);

    return res.status(201).json(users);
  } catch (error) {}
};

module.exports = { seedUser };
