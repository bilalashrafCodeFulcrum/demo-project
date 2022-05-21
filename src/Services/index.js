import axios from "axios";
export const isLoging = () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

export const getToken = () => {
  const token = window.localStorage.getItem("token");
  return token;
};
export const saveToken = (token) => {
  window.localStorage.setItem("token", token);
};
export const removeToken = () => {
  window.localStorage.removeItem("token");
};

// Axios Services

export const axiosSetup = () => {
  // axios.interceptors.request.use(
  //   async (config) => {
  //     config.baseURL = process.env.REACT_APP_BASE_URL;
  //     // config.headers.Authorization = `Token ${getToken()}`
  //     config.headers["Access-Control-Allow-Origin"] = "*";
  //     config.headers["Content-Type"] = "application/json";
  //     return config;
  //   },
  //   (error) => Promise.reject(error)
  // );

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
};
