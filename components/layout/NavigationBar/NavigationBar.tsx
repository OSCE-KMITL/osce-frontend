import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AuthenticationContext } from '@context/AuthContextProvider';
import NavLink from './NavLink';
import { Avatar, Divider, Dropdown, MenuProps } from 'antd';
import { useRouter } from 'next/router';

const NavigationBar: React.FC = () => {
    const { me, useLogout } = useContext(AuthenticationContext);
    const router = useRouter();

    useEffect(() => {}, [me]);
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <p>หน้าแรก</p>,
        },

        {
            key: '2',
            label: (
                <div onClick={useLogout}>
                    <p className="text-red-500">ออกจากระบบ</p>
                </div>
            ),
        },
    ];

    return (
        <header className=" w-full h-[85px] bg-white py-4 mx-auto  fixed z-50 shadow-md  flex justify-center text-md font-[500]  font-primary_noto ">
            <nav className="flex justify-between items-center w-full px-4 md:px-8 xl:px-14 mx-auto ">
                <Link href={'/'} className="text-primary-500 text-sm md:text-2xl font-bold py-5">
                    ระบบสหกิจออนไลน์
                </Link>
                <div className=" hidden xl:flex bg-white md:w-auto  w-full flex items-center px-5">{<NavLink />}</div>
                <div className="flex font-medium justify-center align-middle items-center gap-4">
                    {!me ? (
                        <Link href={'/auth/login'} className="bg-primary-500 hover:bg-black w-auto px-4 md:px-16 py-2 rounded-md font-sm text-[#ffff] ">
                            เข้าสู่ระบบ
                        </Link>
                    ) : (
                        <Dropdown menu={{ items }}>
                            <div className="flex flex-row gap-2 justify-center cursor-pointer items-center">
                                <span className="flex items-end flex-col  cursor-pointer text-xl ">
                                    <p className="text-sm font-primary_noto font-light bg-gray-200 px-2 py-1 rounded-md text-gray-500">
                                        {me.role.toLowerCase()}
                                    </p>
                                    <p className="text-sm font-primary_noto  font-semibold text-gray-800">{me.email.toLowerCase()}</p>
                                    {/* <UserAvatar email={user.email} />*/}
                                </span>
                                <Avatar className="bg-primary-500" src={me.profile_image ? me.profile_image : ''} size={'large'}>
                                    {me.is_student && me.is_student.name_eng}
                                    {me.is_company && me.is_company.full_name.charAt(0)}
                                    {me.is_advisor && me.is_advisor.name}
                                </Avatar>
                            </div>
                        </Dropdown>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default NavigationBar;
