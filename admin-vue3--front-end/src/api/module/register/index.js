import { registerApi } from "../../api";
import { post } from "../../request"

export function goRegister(data) {
  return post(registerApi, { ...data })
}