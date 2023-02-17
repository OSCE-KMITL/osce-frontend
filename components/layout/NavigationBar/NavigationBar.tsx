import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthenticationContext } from '../../../context/AuthContextProvider';
import NavLink from './NavLink';
import { Avatar } from 'antd';

const NavigationBar: React.FC = () => {
    const { me, useLogout } = useContext(AuthenticationContext);
    console.log(me?.is_student?.student_id);

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
                        <>
                            <span className="flex items-end flex-col  cursor-pointer text-xl " onClick={useLogout}>
                                <p className="text-sm font-primary_noto font-light bg-gray-200 px-2 py-1 rounded-md text-gray-500">{me.role.toLowerCase()}</p>
                                <p className="text-sm font-primary_noto  font-semibold text-gray-800">{me.email.toLowerCase()}</p>
                                {/* <UserAvatar email={user.email} />*/}
                            </span>
                            <Avatar src={me.profile_image || 'A'} size={'large'} />
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default NavigationBar;
