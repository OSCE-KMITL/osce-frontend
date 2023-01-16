import axios from 'axios';
import { API_URI } from '../../constants';
import { CookieManager } from '../../utils/CookieManager';
const token = CookieManager.getCookieWithToken();

const requestAxios = axios.create({
    baseURL: API_URI,
    responseType: 'json',
    withCredentials: true,
    method: 'POST',
    headers: {
        Authorization: token ? `bearer ${token}` : '',
    },
});
export default requestAxios;
