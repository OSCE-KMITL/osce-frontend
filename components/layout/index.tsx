import React, { useEffect } from 'react';
import NavigationBar from './navigation_bar';
import { ScriptProps } from 'next/script';
import { Inter, IBM_Plex_Sans_Thai, Poppins } from '@next/font/google';
import { useSession } from 'next-auth/react';
import { TOKEN_NAME } from '../../constants';
import Head from 'next/head';
import SideBar from '../sidebar';

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
        <>
            <Head>
                <title>ระบบสหกิจออนไลน์ | สจล</title>
                <meta name="description" content="ระบบสหกิจออนไลน์" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-full min-h-fit bg-slate-200 ">
                <NavigationBar />
                <div className="flex flex-row justify-start bg-slate-200 h-screen">
                    <SideBar />
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;
