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
import { useGetJobs } from '@features/job/hooks/useGetJobs';
import { formatDateToThai } from '../utils/common';
import { ArrowRightIcon, BanknotesIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import Timeline from '@components/Timeline/Timeline';

const HomePage: React.FC = () => {
    const { me } = useContext(AuthenticationContext);
    const { data: jobs, loading: jobs_loading, error: jobs_error } = useGetJobs();
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

    if (jobs_loading) {
        return <h1>loading</h1>;
    }
    if (jobs_error) {
        return <h1>{jobs_error.message}</h1>;
    }
    return (
        <div className="w-full min-h-full grid xl:grid-cols-2 grid-rows-2 gap-20 px-10 py-10  ">
            <div className="w-full flex flex-col ">
                {showCoopRegisterButton && (
                    <div className={'h-[250px] w-full mb-8 bg-primary-400 px-10 py-10 rounded-lg flex flex-col justify-between'}>
                        <h2 className="text-white font-semibold">รับสมัครเข้าร่วมนักศึกษาโครงการสหกิจ</h2>
                        <div
                            onClick={() => router.push(ENDPOINT_URI + '/auth/google')}
                            className="text-center w-1/4 bg-primary-500 self-end rounded-2xl text-white px-2 py-4 cursor-pointer"
                        >
                            <p>สมัครเลย</p>
                        </div>
                    </div>
                )}
                <div className="h-[70%] flex flex-col gap-4 ">
                    <div className="w-full justify-between flex flex-row gap-4">
                        <p className="font-semibold text-[29px]">งานที่เปิดรับ</p>
                        <div
                            onClick={() => router.push('/jobs/')}
                            className="gap-4 cursor-pointer border border-primary-500 border-1 w-1/6 text-center px-4 py-2 text-primary-500 rounded-md"
                        >
                            <p className="font-semibold">ดูเพิ่มเติม</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center  bg-white rounded-md">
                        {jobs.getAllJob.slice(0, 5).map((job) => (
                            <div
                                onClick={() => router.push('/jobs/' + job.id)}
                                key={job.id}
                                className="h-[100px] px-8 pt-2 flex flex-row border border-b-1 justify-between items-center  cursor-pointer"
                            >
                                <div>
                                    <p> {job.job_title}</p>
                                    <p className="text-md text-primary-500">{formatDateToThai(job.created_at)}</p>
                                </div>

                                <div className="flex flex-row items-center gap-2">
                                    <p className="px-2  py-2 text-center bg-blue-100 rounded-xl text-blue-500 text-[14px] flex flex-row gap-2">
                                        <BuildingOfficeIcon className="w-5 h-5"></BuildingOfficeIcon>
                                        {job.company_id.name_eng}
                                    </p>
                                    <p className="px-2  py-2 text-center bg-slate-100 rounded-xl flex flex-row gap-2 text-slate-500 text-[14px]">
                                        <BanknotesIcon className="w-5 h-5 " />
                                        {job.compensation.split(',')[0] + ' บาท /' + job.compensation.split(',')[1]}{' '}
                                    </p>{' '}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col ">
                <AnnouncementList />
            </div>

            <div className="col-span-2">
                <Timeline />
            </div>
        </div>
    );
};

export default HomePage;
