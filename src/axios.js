import axios from "axios";
import config from "./helpers/config";

const instance = axios.create({
  baseURL: config.apiUrl,
  timeout: 40 * 1000,
});

export default instance;
