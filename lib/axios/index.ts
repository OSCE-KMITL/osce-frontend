import axios from "axios";
import { API_URI } from "../../constants";
const useAxios = axios.create({
  baseURL: API_URI,
  responseType: "json",
  withCredentials: true,
  method: "POST",
});
export default useAxios;
