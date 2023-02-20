import axios from "axios";

const http = () => {
  const instance = axios.create({
    baseURL: "https://todo.api.devcode.gethired.id",
  });
  return instance;
};

export default http;
