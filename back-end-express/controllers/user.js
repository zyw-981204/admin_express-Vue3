const {
  signup,
  isExit,
  getPwdByUsername_Email,
  findList,
  modifyUserInfoById,
  deleteUserById,
  checkUserAuth
} = require("../models/users.js")
const dateFormat = require("../utils/format/date")
const { checkPassword } = require("../utils/encryptTool/encrypt.js")
const { sign } = require("../utils/token.js")
/**
 * To deal with the user register logic
 * 
 */
const userRegister = async (req, res, next) => {
  let { username, password, email } = req.body
  const isAlreadyExit = !! await isExit(username, email)
  console.log(`${username}:是否存在 ${isAlreadyExit} `);
  // 用户名存在
  if (isAlreadyExit) {
    res.set("content-type", "application/json;charset='utf8'")
    res.render("errorSignup", {
      message: JSON.stringify("username has exitted"),
      data: JSON.stringify({
        isExit: isAlreadyExit,
        date: dateFormat(),
        message: JSON.stringify("username has exitted"),
      })
    })
  } else {
    // 将密码加密存到数据库中
    console.log(password);
    if (!password || !password.length) password = "admin"
    let isSuccess = await signup({ username, password, email })
    console.log(`${username}:是否保存成功 ${isSuccess} `);
    res.set("content-type", "application/json;charset='utf8'")
    res.render("success", {
      data: JSON.stringify({
        message: `用户${username}已注册成功`,
        date: dateFormat(),
        isExit: isAlreadyExit,
      })
    })
  }
}


/**
 * To handle user login logic
 * 1. 用户名/邮件是否存在
 * 2. 看密码是否正确
 * 3. 返回不同的结果
 */

const userLogin = async (req, res, next) => {
  const { username, password, email } = req.body
  let isAlreadyExit;
  try {
    isAlreadyExit = await isExit(username, username);
  } catch (error) {
    sendMsg()
  }
  // 用户名存在，则匹配账号密码
  if (isAlreadyExit) {
    const { password: passwordInDB } = await getPwdByUsername_Email(username, email);
    console.log(passwordInDB);
    // 2. 看密码是否正确
    const allowLogin = !! await checkPassword(password, passwordInDB)
    if (allowLogin) {
      // token 方案
      const token = sign(username);
      res.set("X-Token", token);

      // session-cookie方案
      // 用于判断是否已经成功的登录
      // req.session.username = username
      res.set("content-type", "application/json;charset='utf8'")
      res.render("success", {
        data: JSON.stringify({
          message: "恭喜登陆成功！",
          date: dateFormat(),
        })
      })
    } else {
      sendMsg()
    }
  } else {
    sendMsg()
  }
function sendMsg() {
  res.set("content-type", "application/json; charset=utf-8")
  res.render("success", {
    data: JSON.stringify({
      message: JSON.stringify("username or email is not exited"),
      date: dateFormat(),
    })
  })
}
}

/**
 *  To handle user singout logic
 *  1. 判断是否存在用户？
 *  2.1 存在？   2.2 不存在？ 直接返回
 *  2.1.1 已经登录？ 去除一登录标志 2.1.2 未登录  直接返回
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const userSingout = async (req, res, next) => {
  const { username, email } = req.body
  const isAlreadyExit = await isExit(username, username);
  req.session = null;
  res.set("content-type", "application/json;charset='utf8'")

  // 用户名存在
  if (isAlreadyExit) {
    res.render("success", {
      data: JSON.stringify({
        message: "已退出登录！",
        date: dateFormat(),
      })
    })
  } else {
    res.render("resingin", {
      data: JSON.stringify({
        message: JSON.stringify("username is not exited"),
        date: dateFormat(),
      })
    })
  }
}

/**
 * 用来获取用户列表
 */
const userList = async (req, res, next) => {
  const list = await findList();
  res.set("content-type", "application/json;charset='utf8'")
  res.render("success", {
    data: JSON.stringify({
      list,
      date: dateFormat(),
      message: JSON.stringify("get list successfully"),
      total: list.length
    })
  })
}


const modifyUserInfo = async (req, res, next) => {
  const { username, ewmail, _id } = req.body;
  console.log(username, email, _id);
  const result = await modifyUserInfoById(_id, { username, email })
  console.log("result:", result);
  res.set("content-type", "application/json;charset='utf8'")
  if (result) {
    res.render("success", {
      data: JSON.stringify({
        date: dateFormat(),
        message: `the information of ${username} has been modified successfully`,
      })
    })
  } else {
    res.render("success", {
      data: JSON.stringify({
        date: dateFormat(),
        message: `modify failed`,
      })
    })
  }
}


const deleteUser = async (req, res) => {
  const { _id } = req.body;
  const result = await deleteUserById(_id)
  console.log("result:", result);
  res.set("content-type", "application/json;charset='utf8'")
  if (result) {
    res.render("success", {
      data: JSON.stringify({
        date: dateFormat(),
        message: `deleted successfully`,
        isSuccess: true
      })
    })
  } else {
    res.render("success", {
      data: JSON.stringify({
        date: dateFormat(),
        message: `deleted failed`,
        isSuccess: false
      })
    })
  }
}

const getUserAuth = async (req, res) => {
  const { username } = req.body;
  const { isExit, isAdmin } = await checkUserAuth(username);
  if (isExit) {
    res.render("success", {
      data: JSON.stringify({
        isExit: true,
        username: username,
        role: isAdmin ? "admin" : "developer",
        message: "you have query successfully"
      })
    })
  } else {
    res.render("success", {
      data: JSON.stringify({
        isExit: false,
        username: null,
        role: null,
        message: "this username is not exit"
      })
    })
  }
}

module.exports = {
  userRegister,
  userLogin,
  userSingout,
  userList,
  modifyUserInfo,
  deleteUser,
  getUserAuth
}