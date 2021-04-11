var express = require('express');
var router = express.Router();
const {
  userRegister,
  userLogin,
  userList,
  modifyUserInfo,
  deleteUser,
  userSingout,
  getUserAuth
} = require("../controllers/user.js")
const { auth } = require("../middlewares/auth")

router.post('/register', userRegister);

router.post('/login', userLogin);

router.get('/list', auth, userList);

router.post('/modify', auth, modifyUserInfo);

router.post('/delete', auth, deleteUser);

router.post('/singout', userSingout);

router.post('/getUserInfo', auth, getUserAuth);

module.exports = router;