import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthenticationContext } from '../../../context/AuthContextProvider';
import { Tag } from 'antd';
import NavLink from './NavLink';

const NavigationBar: React.FC = () => {
    const { me, useLogout } = useContext(AuthenticationContext);

    return (
        <div className="bg-white w-full    shadow-md py-4 mx-auto shadow-md  flex justify-center text-md font-[500]  font-primary_noto ">
            <nav className="flex justify-between items-center w-full px-24 mx-auto ">
                <Link href={'/'} className="text-primary-500 text-2xl font-bold py-5">
                    ระบบสหกิจออนไลน์
                </Link>
                <div className="flex bg-white md:w-auto  w-full flex items-center px-5">{<NavLink />}</div>
                <div className="flex font-medium justify-center align-middle items-center gap-4">
                    {!me ? (
                        <Link href={`/auth/login`} className="bg-primary-500 hover:bg-black w-auto px-16 py-2 rounded-md font-sm text-[#ffff] ">
                            เข้าสู่ระบบ
                        </Link>
                    ) : (
                        <>
                            <span className="flex items-end gap-2 cursor-pointer font-bold text-white text-xl font-mono " onClick={useLogout}>
                                <Tag className="text-sm" color={'default'}>
                                    {me.role}
                                </Tag>
                                <Tag className="text-sm" color={'error'}>
                                    {me.email.toUpperCase()}
                                </Tag>
                                {/* <UserAvatar email={user.email} />*/}
                            </span>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default NavigationBar;
