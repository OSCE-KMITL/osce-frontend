import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { CookieManager } from '../utils/CookieManager';
import { Divider } from 'antd';
import { CoopStatus } from '@features/student/interfaces';
import { RoleOption } from '@constants/RoleOptions';
import { ENDPOINT_URI } from '@constants';
import { useGetAnnouncements } from '@features/announcement/hooks/useGetAnnouncement';
import AnnouncementList from '@components/HomePage/AnnouncementList';

const HomePage: React.FC = () => {
    const { me } = useContext(AuthenticationContext);
    const router = useRouter();
    const [showCoopRegisterButton, setShowCoopRegisterButton] = useState(false);
    useEffect(() => {
        const checkUser = (): void => {
            if (!me) {
                setShowCoopRegisterButton(true);
            } else if (me.role !== RoleOption.STUDENT) {
                setShowCoopRegisterButton(false);
            } else if (me.is_student?.coop_status === CoopStatus.DEFAULT) {
                setShowCoopRegisterButton(true);
            }
        };
        checkUser();
    }, [me, router]);

    return (
        <div className="w-full min-h-screen grid xl:grid-cols-2 grid-rows-1 gap-20 px-10 py-10  ">
            <div className="w-full flex flex-col gap-6">
                {showCoopRegisterButton && (
                    <div className={'h-1/4 w-full bg-primary-400 px-10 py-10 rounded-lg flex flex-col justify-between'}>
                        <h2 className="text-white font-semibold">รับสมัครเข้าร่วมนักศึกษาโครงการสหกิจ</h2>
                        <p className={'text-white '}>สิ้นสุดวันที่ 12 พฤษภาคม</p>
                        <div
                            onClick={() => router.push(ENDPOINT_URI + '/auth/google')}
                            className="text-center w-1/4 bg-primary-500 self-end rounded-2xl text-white px-2 py-4 cursor-pointer"
                        >
                            <p>สมัครเลย</p>
                        </div>
                    </div>
                )}
                <AnnouncementList />
            </div>
        </div>
    );
};

export default HomePage;
