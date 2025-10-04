import axios from "axios";

const app = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

const http = {
  get: app.get,
  post: app.post,
  put: app.put,
  patch: app.patch,
  delete: app.delete,
};

export default http;
