import { uploadApi } from "../api";
import { post } from "../request"

function upload(file) {
  return post(uploadApi, file)
}
export default upload