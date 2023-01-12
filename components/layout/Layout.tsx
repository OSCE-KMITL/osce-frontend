import React, { useContext } from 'react';
import NavigationBar from './NavigationBar/NavigationBar';
import { ScriptProps } from 'next/script';
import Head from 'next/head';
import SideBar from '../sidebar';
import { AuthenticationContext } from '../../context/AuthContextProvider';

const Layout: React.FC<ScriptProps> = ({ children }) => {
    const { user } = useContext(AuthenticationContext);
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
                    {user && <SideBar />}
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;
