import axios from "axios";
import { configuration } from "../config";

const api = axios.create({
  baseURL: configuration.apiUrl,
});

// console.log(api);
export { api };
