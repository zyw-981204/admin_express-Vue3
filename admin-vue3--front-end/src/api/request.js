import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus"
import { ERROR_CODE, SUCCESS_CODE } from "@/utils/ErrorCode/ErrorCode.js";
import router from "../router/index";
import store from "../store/index";
import { getToken, removeToken } from "../utils/cookie";

const service = axios.create({
  // 在请求地址前面加上baseURL
  baseURL: import.meta.env.VITE_BASE_API,
  // 当发送跨域请求时携带cookie
  // withCredentials: true,
  timeout: 1000 * 10,
});


service.interceptors.request.use(
  (config) => {
    // 模拟指定请求令牌
    // 携带Token
    config.headers["X-Token"] = getToken();
    console.log(getToken());
    return config;
  },
  (error) => {
    // 请求错误的统一处理
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  /**
   * 通过判断状态码统一处理响应，根据情况修改
   * 同时也可以通过HTTP状态码判断请求结果
   */
  (response) => {
    const res = response.data;
    const code = response.data.code
    if (code != SUCCESS_CODE) {
      // 先弹出消息
      if (code == ERROR_CODE || code == 50012 || code == 50014) {
        ElMessageBox.confirm("您已登出, 请重新登录", "确认", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          removeToken()
          store.dispatch("asyncClearAuth").then(() => {
            router.push("/login")
          })
        })
      }
    }
    else {
      return response
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    ElMessage({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

console.log(import.meta.env.VITE_BASE_API);

const get = service.get
const post = service.post
const _delete = service.delete

export default service;
export { get, post, _delete }

