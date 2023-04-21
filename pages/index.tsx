import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { CookieManager } from '../utils/CookieManager';
import { Divider } from 'antd';
import { CoopStatus } from '@features/student/interfaces';
import { RoleOption } from '@constants/RoleOptions';
import { ENDPOINT_URI } from '@constants';

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
        <div className="w-full min-h-screen grid xl:grid-cols-2 grid-rows-1 gap-8 px-10 py-10  ">
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
                <div className="h-[70%] flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        <p className="font-semibold">ประกาศ</p>
                        <p>งานที่เปิดรับ</p>
                    </div>
                    <div className="w-full flex flex-col justify-center bg-white rounded-md">
                        <div className="px-4 pt-2 flex flex-col align-middle">
                            <p> ประกาศ 01</p>
                            <p className="text-md text-primary-500">description</p>
                            <Divider />
                        </div>{' '}
                        <div className="px-4 pt-2">
                            <p> ประกาศ 01</p>
                            <p className="text-md text-primary-500">description</p>
                            <Divider />
                        </div>{' '}
                        <div className="px-4 pt-2">
                            <p> ประกาศ 01</p>
                            <p className="text-md text-primary-500">description</p>
                            <Divider />
                        </div>{' '}
                        <div className="px-4 pt-2">
                            <p> ประกาศ 01</p>
                            <p className="text-md text-primary-500">description</p>
                            <Divider />
                        </div>{' '}
                        <div className="px-4 pt-2">
                            <p> ประกาศ 01</p>
                            <p className="text-md text-primary-500">description</p>
                            <Divider />
                        </div>{' '}
                    </div>
                    <div className="gap-4 border border-primary-500 border-1 w-1/6 text-center px-4 py-2 text-primary-500 rounded-md">
                        <p className="font-semibold">ดูเพิ่มเติม</p>
                    </div>
                </div>{' '}
            </div>

            <div>
                <div className={'h-1/4 w-full bg-primary-400 px-10 py-10 rounded-lg flex flex-col justify-between'}>
                    <h2 className="text-white font-semibold">ตรวจสอบรายชื่อผู้สมัครสหกิจศึกษา</h2>
                    <p className={'text-white '}>ปีการศึกษา{' '}{new Date().getFullYear() + 543}</p>
                    <div
                        onClick={() => router.push('/studentapply-status')}
                        className="text-center w-1/4 bg-primary-500 self-end rounded-2xl text-white px-2 py-4 cursor-pointer"
                    >
                        <p>ดูรายชื่อ</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
// <div className="grid grid-rows-3 gap-2">
//     <div
//       onClick={() => {
//           if (me) {
//               if (me.role === RoleOption.STUDENT) {
//                   router.push('coopregister');
//               } else {
//                   router.push('/');
//               }
//           } else {
//               router.push(ENDPOINT_URI + '/auth/google');
//           }
//       }}
//     >
//         <ActionCard goto={''} hero_content="สมัครเข้าร่วมสกิจศึกษา" button_title={'สมัครเข้าร่วมสหกิจ'} description={''} />
//     </div>{' '}
// </div>
