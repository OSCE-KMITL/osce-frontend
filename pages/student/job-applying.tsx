import ContentContainer from '@ui/ContentContainer';
import { Link } from '@ui/Link';
import BreadcrumbComponent from 'components/common/Beardcrumb/Beardcrumb';
import { useGetMe } from '@features/auth/hooks/useGetMe';
import React from 'react';
import { Space, Tag } from 'antd';
import { useCancelApplyJob } from 'features/job/hooks/useCancelApplyJob';
import NotificationService from '@lib/ant_service/NotificationService';

export default function JobApplying() {
    const { data, loading, error } = useGetMe();
    const [cancelApplyJob, { loading: cancel_job_loading }] = useCancelApplyJob();
    const notification = NotificationService.getInstance();

    const handleCancelApplyJob = (id: string) => {
        cancelApplyJob({
            variables: { cancelApplyInfo: { job_id: id } },
            onCompleted: (result) => {
                if (result) {
                    notification.success('Success', 'ยกเลิกสมัครงานเสร็จสิ้น');
                }
            },
            onError: (error) => {
                console.log(error);
                if (error) {
                    notification.error('Error', error.message);
                }
            },
        });
    };
    return (
        <ContentContainer>
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1 className=" text-4xl md:text-5xl font-primary_noto font-semibold">งานที่สมัคร</h1>
                <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
            </div>
            {data ? (
                data?.getMe?.is_student?.job?.map((job) => (
                    <div
                        key={job.id}
                        className=" w-[80%] h-fit p-8 grid grid-cols-12  shadow-sm sm:rounded-lg border-solid border-1 border-gray-300 overflow-hidden bg-white font-primary_noto"
                    >
                        <div className=" w-full h-full col-span-8 gap-4 flex ">
                            <Space size={[0, 8]} wrap className=" justify-center align-middle items-center">
                                <Tag color="processing">รอการตอบรับ</Tag>
                            </Space>
                            <div className="grid grid-cols-2 w-full align-middle items-center   ">
                                <div className=" w-full h-full grid items-center">
                                    <h1 className="text-md font-medium leading-6 text-gray-700">{job.job_title ? job.job_title : 'ไม่ระบุตำแหน่งงาน'}</h1>
                                </div>
                                <div className=" w-full h-full grid items-center justify-end pr-4">
                                    <h1 className="text-md font-medium leading-6 text-gray-700">
                                        {' '}
                                        {job.company_id?.name_eng ? job.company_id.name_eng : 'ไม่ระบุข้อมูล'}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full h-full col-span-4 gap-4 grid grid-rows-1 border-l-2 pl-4">
                            <div className=" flex justify-end gap-x-4 items-center">
                                <div className="text-right items-end">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-2xl text-sm  cursor-pointer"
                                        onClick={() => handleCancelApplyJob(job.id)}
                                    >
                                        ยกเลิกการสมัคร
                                    </button>
                                </div>
                                <div className="text-right items-end">
                                    <Link href={`/jobs/` + job.id} className=" bg-primary-100 text-primary-500 px-4 py-2 rounded-2xl text-sm  cursor-pointer">
                                        {'ดูรายละเอียด'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className=" w-full h-full font-primary_noto text-4xl text-gray-400">
                    <h1 className="">ไม่พบงานที่สมัคร !</h1>
                </div>
            )}
        </ContentContainer>
    );
}
