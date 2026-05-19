import axios from "axios";
const BASE_URL = "https://api.makiabadi.com/api";

const app = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// generating new access token if it expires during an action
app.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config; //?The request on which the user got an error on
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true; // to avoid infinite loop
      try {
        const { data } = await axios.get(`${BASE_URL}/user/refresh-token`, {
          withCredentials: true,
        });
        if (data) return app(originalConfig); //? Sending the request again after setting new access token
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

const http = {
  get: app.get,
  post: app.post,
  put: app.put,
  patch: app.patch,
  delete: app.delete,
};

export default http;
