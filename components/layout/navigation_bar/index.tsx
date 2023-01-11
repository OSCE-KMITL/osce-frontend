import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useLogout } from '../../../hooks/useLogout';
import { public_nav_contents } from '../../../constants/nav-content';
import UserAvatar from '../../Avatar';

const NavigationBar: React.FC = () => {
    const contents = public_nav_contents.map((content, index) => {
        return (
            <li key={index} className="hover:text-primary-500 text-">
                <Link href={content.link}>{content.title} </Link>
            </li>
        );
    });

    const { data: session } = useSession();
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
                    {!session?.user ? (
                        <Link href={'/auth/login'} className="bg-primary-500 hover:bg-amber-500 w-auto px-16 py-2 rounded-md font-sm text-[#ffff] ">
                            เข้าสู่ระบบ
                        </Link>
                    ) : (
                        <>
                            <span className="flex items-center gap-6" onClick={useLogout}>
                                <div>
                                    <p className="text-gray-70  ">{session.user.email.toLowerCase()}</p>
                                </div>
                                <UserAvatar email={session.user.email} />
                            </span>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default NavigationBar;
