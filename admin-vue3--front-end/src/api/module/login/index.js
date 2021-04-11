import { post } from "../../request";
import { loginApi, getUserInfoApi, singoutApi } from "../../api"

const goLogin = (data) => post(loginApi, {
  ...data
})

const getUserInfo = (data) => post(getUserInfoApi, {
  ...data
})


const singout = (data) => post(singoutApi, {
  ...data
})

export {
  goLogin,
  getUserInfo,
  singout
}