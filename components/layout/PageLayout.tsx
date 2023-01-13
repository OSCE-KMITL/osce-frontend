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
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NavigationBar />
                <Layout>
                    {me && (
                        <Sider
                            width={300}
                            breakpoint="lg"
                            collapsedWidth="0"
                            className={'bg-white'}
                            style={{ backgroundColor: '#fff' }}
                            onBreakpoint={(broken) => {
                                console.log(broken);
                            }}
                            onCollapse={(collapsed, type) => {
                                console.log(collapsed, type);
                            }}
                        >
                            <div className="logo" />
                            <SideBar />
                        </Sider>
                    )}
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="h-screen">{children}</div>
                    </Content>
                </Layout>
            </div>
        </div>
    );
};

export default PageLayout;
