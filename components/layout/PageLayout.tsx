import React, { useContext } from 'react';
import { ConfigProvider, Layout } from 'antd';
import NavigationBar from './NavigationBar/NavigationBar';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { ScriptProps } from 'next/script';
import Head from 'next/head';
import SideBar from './Sidebar';

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
            <div className="w-screen max-h-full bg-primary-300 font-primary_noto">
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                colorPrimary: '#FF813E',
                            },
                            Steps: {
                                colorPrimary: '#FF813E',
                            },
                            Table: {
                                fontSize: 16,
                                colorTextHeading: '#333',
                                colorBgLayout: '#333',
                            },
                            Select: {
                                colorPrimary: '#FF813E',
                                fontSize: 18,
                                colorBgContainer: 'rgb(249 250 251 / var(--tw-bg-opacity));',
                            },
                            DatePicker: {
                                colorBgContainer: 'rgb(249 250 251 / var(--tw-bg-opacity));',
                            },
                        },
                        token: {
                            colorPrimary: '#FF813E',
                        },
                    }}
                >
                    <NavigationBar />
                    <Layout style={{ backgroundColor: '#f8f8f8' }}>
                        {me && (
                            <Sider width={300} breakpoint="lg" style={{ backgroundColor: 'white' }} collapsedWidth="0" className={'bg-white'}>
                                <div className="logo" />
                                <SideBar />
                            </Sider>
                        )}
                        <Content className={'my-32  mx:8 md:mx-16'}>
                            <div>{children}</div>
                        </Content>
                    </Layout>
                </ConfigProvider>
            </div>
        </div>
    );
};

export default PageLayout;
