import React from 'react';
import styles from '../../../styles/navigation_bar/NavigationBar.module.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useLogout } from '../../../hooks/useLogout';

const NavigationBar: React.FC = () => {
    const { data: session } = useSession();
    return (
        <div>
            <div className={styles.container}>
                <Link href={'/'} className={styles.logo}>
                    ระบบสหกิจออนไลน์
                </Link>
                <div className={styles.link}>
                    <Link href={'/'}>หน้าแรก</Link>
                    <Link href={'/accounts'}>user list</Link>
                    <p>ประชาสัมพันธ์</p>
                    {session?.user && <p>{session.user.email}</p>}
                    {!session?.user ? (
                        <Link href={'api/auth/signin'} className={styles.action}>
                            เข้าสู่ระบบ
                        </Link>
                    ) : (
                        <p onClick={useLogout} className="bg-black w-auto px-4 py-2 rounded-xl text-white ">
                            ออกจากระบบ
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
