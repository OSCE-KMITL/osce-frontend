import axios from 'axios';
import { API_URI, ENDPOINT_URI } from '@constants';
import { CookieManager } from '../../utils/CookieManager';
const token = CookieManager.getCookieWithToken();

const requestAxios = axios.create({
    baseURL: 'http://localhost:4000/'!,
    responseType: 'json',
    withCredentials: true,
});
export default requestAxios;
