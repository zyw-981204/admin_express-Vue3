import { post, get } from "../../request";
import { getListApi, modifyApi, deleteApi } from "../../api"


// 获取用户列表
const getList = () => {
  return get(getListApi)
}

const editUserInfoById = (data) => {
  return post(modifyApi, {
    ...data
  })
}

const deleteUserById = (data) => {
  return post(deleteApi, { ...data })
}

export {
  getList,
  editUserInfoById,
  deleteUserById
}
