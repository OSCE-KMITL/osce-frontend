import React, { useContext } from 'react';
import Link from 'next/link';
import { public_nav_contents } from '../../../constants/nav-content';
import UserAvatar from '../../Avatar';
import { AuthenticationContext } from '../../../context/AuthContextProvider';
import { Tag } from 'antd';
import { LiteralUnion } from 'type-fest';

const NavigationBar: React.FC = () => {
    const { user, useLogout } = useContext(AuthenticationContext);
    const contents = public_nav_contents.map((content, index) => {
        return (
            <li key={index} className="hover:text-primary-500 text-">
                <Link href={content.link}>{content.title} </Link>
            </li>
        );
    });

    return (
        <div className="bg-white w-full shadow-md  mx-auto  flex justify-center text-md font-[500]  font-primary_noto z-50">
            <nav className="flex justify-between items-center w-full px-24 shadow-md mx-auto z-50">
                <Link href={'/'} className="text-primary-500 text-2xl font-bold py-5">
                    ระบบสหกิจออนไลน์
                </Link>
                <div className="flex bg-white md:w-auto  w-full flex items-center px-5">
                    <ul className="flex items-center gap-[4vw]">{contents}</ul>
                </div>
                <div className="flex font-medium justify-center align-middle items-center gap-4">
                    {!user ? (
                        <Link href={'/auth/login'} className="bg-primary-500 hover:bg-amber-500 w-auto px-16 py-2 rounded-md font-sm text-[#ffff] ">
                            เข้าสู่ระบบ
                        </Link>
                    ) : (
                        <>
                            <span className="flex items-end gap-2 cursor-pointer font-bold text-white text-xl font-mono " onClick={useLogout}>
                                <Tag className="text-sm" color={'default'}>
                                    {user.role}
                                </Tag>
                                <Tag className="text-sm" color={'error'}>
                                    {user.email.toUpperCase()}
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
