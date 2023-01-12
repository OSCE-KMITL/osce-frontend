import { TOKEN_NAME } from '../constants';
import Cookie from 'js-cookie';
export class CookieManager {
    static setCookieWithToken(token: string) {
        Cookie.set(TOKEN_NAME, token);
    }
    static getCookieWithToken(): string | undefined | null {
        const token = Cookie.get(TOKEN_NAME);
        if (!token) {
            return null;
        }
        return token;
    }
    static clearTokenFromCookie() {
        Cookie.remove(TOKEN_NAME);
    }
}
