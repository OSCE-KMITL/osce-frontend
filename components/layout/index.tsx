import React, { useEffect } from 'react';
import NavigationBar from './navigation_bar';
import { ScriptProps } from 'next/script';
import { Noto_Sans_Thai } from '@next/font/google';
import { useSession } from 'next-auth/react';
import { TOKEN_NAME } from '../../constants';

const font_setting = Noto_Sans_Thai({
    subsets: ['thai'],
});
const Layout: React.FC<ScriptProps> = ({ children }) => {
    const { data: session, status } = useSession();
    useEffect(() => {
        if (session) {
            if (typeof window !== 'undefined') {
                localStorage.setItem(TOKEN_NAME, session.user.token);
            }
        }
    }, [session]);
    return (
        <div className="w-full h-screen bg-slate-50">
            <NavigationBar />
            <div className="w-full h-screen"> {children}</div>
        </div>
    );
};

export default Layout;
