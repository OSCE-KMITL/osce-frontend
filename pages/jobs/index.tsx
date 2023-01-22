import React, { useContext } from 'react';
import Link from 'next/link';
import { useQueryJobs } from '../../features/job/hooks/useQueryJobs';
import NotificationService from '../../lib/ant_service/NotificationService';
import MessageService from '../../lib/ant_service/MessageService';
import { AuthenticationContext } from '../../context/AuthContextProvider';
import { RoleOption } from '../../constants/RoleOptions';
import ContentContainer from '@ui/ContentContainer';
import SkeletonLoading from '@ui/SkeletonLoading';

const Jobs: React.FC = () => {
    const { data, loading, error } = useQueryJobs();
    const notification = NotificationService.getInstance();
    const message = MessageService.getInstance();
    const { me } = useContext(AuthenticationContext);

    if (error) {
        message.error(error.message);
        return (
            <>
                <h1>{error.message}</h1>
            </>
        );
    }

    return (
        <ContentContainer>
            {loading && <SkeletonLoading />}
            {me?.role === RoleOption.COMMITTEE ? (
                <Link href={'/jobs/new'} className=" bg-green-500 hover:bg-green-400 w-40 py-2 px-2 rounded-md font-sm text-[#ffff] text-center mt-8 ">
                    + เพิ่มงานที่เปิดรับ
                </Link>
            ) : (
                ''
            )}
            <button
                className=" bg-yellow-500 hover:bg-yellow-400 w-40 py-2 px-2 rounded-md font-sm text-[#ffff] text-center mt-8 "
                onClick={() => notification.error('Error', 'This is a custom success notification.')}
            >
                ทดสอบ notify
            </button>
            <button
                className=" bg-sky-500 hover:bg-sky-400 w-40 py-2 px-2 rounded-md font-sm text-[#ffff] text-center mt-8 "
                onClick={() => message.loading('This is a message loading.')}
            >
                ทดสอบ message
            </button>
            {data &&
                data?.getAllJob.map((prod) => (
                    <div className="w-full mt-8" key={prod.id}>
                        <div className=" px-6 py-6 overflow-hidden shadow-sm bg-white min-w-[800px] max-w-[1000px]  sm:rounded-lg  border-solid border-2 border-gray-300">
                            <div className="flex flex-row w-full">
                                <div className="flex flex-col ">
                                    <h1 className="text-xl font-medium leading-6 text-gray-700">{prod.job_title ? prod.job_title : '-'}</h1>

                                    <div className="flex flex-row gap-4 w-full min-w-[560px] mt-3">
                                        <p className="text-left min-w-[240px]">ค่าตอบแทน : {prod.compensation ? prod.compensation : '-'}</p>
                                        <p className="">ประเภท : ฝึกงาน + สหกิจศึกษา 6 เดือน </p>
                                    </div>
                                </div>
                                <div className="flex flex-col border-l-2 border-gray-200 ">
                                    {prod.company_id && (
                                        <Link href="#" className=" text-lg text-gray-700 pl-4">
                                            บริษัท : {prod.company_id.name}
                                        </Link>
                                    )}{' '}
                                    {!prod.company_id && <p className=" text-lg text-gray-700 pl-4">บริษัท : -</p>}
                                    <div className="flex flex-row w-full min-w-full py-2 pl-4  overflow-hidden relative">
                                        <p className="text-left min-w-[240px]">ที่อยู่ : {prod.company_id ? prod.company_id.address : '-'}</p>
                                        <Link
                                            href={`/jobs/` + prod.id}
                                            className=" bg-primary-500 hover:bg-amber-500 w-auto py-1 px-2 rounded-md font-sm text-[#ffff] right-0 absolute"
                                        >
                                            ดูข้อมูล
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </ContentContainer>
    );
};

export default Jobs;
