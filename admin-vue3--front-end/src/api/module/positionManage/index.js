import { post, get } from "../../request";
import { getPositionListApi, modifyPositionApi, deletePositionApi, addPositionApi, getPositionInfoByIdApi } from "../../api"


// 获取用户列表
const getPositionList = () => {
  return get(getPositionListApi)
}

const modifyPositionInfoById = (_id, positionInfo) => {
  console.log(_id, positionInfo);
  return post(modifyPositionApi, { _id, positionInfo })
}

const deletePositionById = (_id) => {
  return post(deletePositionApi, { _id })
}

const addPosition = (data) => {
  return post(addPositionApi, { ...data })
}
const getPositionInfoById = (data) => {
  return post(getPositionInfoByIdApi, { ...data })
}

export {
  getPositionList,
  modifyPositionInfoById,
  deletePositionById,
  addPosition,
  getPositionInfoById
}
