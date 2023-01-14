import React, { useContext } from 'react';
import { Layout } from 'antd';
import SideBar from '../sidebar';
import NavigationBar from './NavigationBar/NavigationBar';
import { AuthenticationContext } from '../../context/AuthContextProvider';
import { ScriptProps } from 'next/script';
import Head from 'next/head';

const { Content, Sider } = Layout;

const PageLayout: React.FC<ScriptProps> = ({ children }) => {
    const { me } = useContext(AuthenticationContext);
    return (
        <div>
            <Head>
                <title>ระบบสหกิจออนไลน์ | สจล</title>
                <meta name="description" content="ระบบสหกิจออนไลน์" />
                <link rel="icon" href="/osce.ico" />
            </Head>
            <div className="w-screen max-h-full">
                <NavigationBar />
                <Layout>
                    {me && (
                        <Sider width={300} breakpoint="lg" style={{ backgroundColor: 'white' }} collapsedWidth="0" className={'bg-white'}>
                            <div className="logo" />
                            <SideBar />
                        </Sider>
                    )}
                    <Content className={'my-32  mx:8 md:mx-16'}>
                        <div className="">{children}</div>
                    </Content>
                </Layout>
            </div>
        </div>
    );
};

export default PageLayout;
