const express = require("express");
const mw = require("./users-middleware");

const router = express.Router();
const Users = require("./users-model");

router.get("/", (req, res, next) => {
  let users = Users.getAllUsers();
  res
    .status(200)
    .json(users)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error);
    });
});

router.post(
  "/kayitol",
  mw.validateInput,
  mw.validateNewUser,
  async (req, res, next) => {
    try {
      let user = req.user;
      let createdUser = await Users.createUser(user);
      res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  mw.validateInput,
  mw.validateLoginUser,
  (req, res, next) => {
    try {
      res.json({ message: "hoşgeldn cnm" });
    } catch (error) {
      next(error);
    }
  }
);

router.use((err, req, res) => {
  res.status(err.status || 500).json({
    customMessage: "Bir hata oluştu.",
    message: err.message,
  });
});

module.exports = router;
