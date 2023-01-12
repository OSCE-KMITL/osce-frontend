import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface NavContent {
    title: string;
    link: string;
}

export const PUBLIC_NAVIGATOR_LINK: NavContent[] = [
    {
        title: 'หน้าแรก',
        link: '/',
    },
    {
        title: 'ประชาสัมพันธ์',
        link: '/announcement',
    },
    {
        title: 'ประกาศรับสมัครงาน',
        link: '/announcement',
    },
    {
        title: 'กำหนดการสหกิจ',
        link: '/accounts',
    },
    {
        title: 'ดาวโหลดแบบฟอร์ม',
        link: '/',
    },
];

const NavLink: FC = () => {
    const router = useRouter();
    return (
        <ul className="flex items-center gap-[4vw]">
            {PUBLIC_NAVIGATOR_LINK.map((content, index) => {
                return (
                    <li key={index} className={`hover:text-primary-500 ${router.asPath === content.link ? 'text-primary-500 font-bold' : 'text-black'}`}>
                        <Link href={content.link}>{content.title} </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default NavLink;
