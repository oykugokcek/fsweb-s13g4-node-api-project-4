const {
  getAllUsers,
  createUser,
  findUser,
  checkUserName,
} = require("./users-model");

function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toLocaleString();
  console.log(`${method}--${url}--${timestamp}`);
  next();
}

function validateInput(req, res, next) {
  const { kullaniciadi, sifre } = req.body;
  if (!kullaniciadi || !sifre) {
    res.status(400).json({ message: "Eksik alan var" });
  } else {
    next();
  }
}

function validateNewUser(req, res, next) {
  const { kullaniciadi, sifre } = req.body;
  let isExistUserName = checkUserName(kullaniciadi);
  if (isExistUserName) {
    res
      .status(400)
      .json({ message: `${kullaniciadi} daha önce kullanılmıştır.` });
  } else {
    req.user = { kullaniciadi: kullaniciadi, sifre: sifre };
    next();
  }
}

function validateLoginUser(req, res, next) {
  const { kullaniciadi, sifre } = req.body;
  let isExistUser = findUser({ kullaniciadi: kullaniciadi, sifre: sifre });
  if (!isExistUser) {
    res.status(404).json({ message: "Böyle bir kullanıcı adı yok" });
  } else {
    req.user = { kullaniciadi: kullaniciadi, sifre: sifre };
    next();
  }
}

module.exports = { logger, validateInput, validateNewUser, validateLoginUser };
