import ContentContainer from '@ui/ContentContainer';
import { Link } from '@ui/Link';
import SkeletonLoading from '@ui/SkeletonLoading';
import { Divider, Space, Tag } from 'antd';
import { useGetMe } from '@features/auth/hooks/useGetMe';
import React, { useContext, useEffect } from 'react';
import NotificationService from 'lib/ant_service/NotificationService';
import { useRouter } from 'next/router';
import { useGetStudentApplyJob } from '@features/job/hooks/useGetStudentApplyJob';
import { JobStatus } from '@constants/Job/JobStatus';

export default function MyStudents() {
    const { data, loading, error, refetch } = useGetMe();
    const notification = NotificationService.getInstance();
    const router = useRouter();
    const { data: stu_apply_job_data, loading: stu_apply_job_loading, error: stu_apply_job_error, refetch: stu_apply_job_refetch } = useGetStudentApplyJob();
    const company_id = data?.getMe?.is_company?.company_id?.id;

    useEffect(() => {
        refetch();
    }, []);

    const filter_stu_data = stu_apply_job_data?.getAllStudentApplyJob.filter(
        (i) => i.job_status === JobStatus.COMMITTEEAPPROVE && i.job.company_id.id === company_id
    );

    // const handleEdit = (id: string) => {
    //     if (id) {
    //         router.push(`/jobs/update/${id}`);
    //     }
    // };

    return (
        <ContentContainer>
            <div className="w-[80%] h-fit">
                <h1>นักศึกษาที่สังกัดปัจจุบัน</h1>
                <Divider />
            </div>
            {loading && <SkeletonLoading />}
            {filter_stu_data ? (
                filter_stu_data?.map((data) => (
                    <div
                        key={data?.id}
                        className=" w-[80%] h-fit p-8 grid grid-cols-12  shadow-sm sm:rounded-lg border-solid border-1 border-gray-300 overflow-hidden bg-white font-primary_noto"
                    >
                        <div className=" w-full h-full col-span-8 gap-4 flex  ">
                            <Space className=" relative pb-6">
                                <Tag color="processing" className=" absolute">
                                    {data?.job?.internship_period === 'ฝึกงาน+สหกิจศึกษา (6 เดือน)' ? 'สหกิจศึกษา' : ''}
                                    {data?.job?.internship_period === 'สหกิจศึกษา (4 เดือน)' ? 'สหกิจศึกษา' : ''}
                                    {data?.job?.internship_period === 'ฝึกงาน (2 เดือน)' ? 'ฝึกงาน' : ''}
                                </Tag>
                            </Space>
                            <div className="grid grid-cols-2 w-full align-middle items-center pl-24  text-gray-700">
                                <h1 className="text-md font-medium leading-6 ">
                                    {data?.student?.name_prefix} {data?.student?.name_th} {data?.student?.lastname_th}
                                </h1>
                                <h1 className="text-md font-medium leading-6  grid justify-end pr-16">
                                    {data?.job?.job_title ? data?.job?.job_title : 'ไม่ระบุตำแหน่งงาน'}
                                </h1>
                            </div>
                        </div>
                        <div className=" w-full h-full col-span-4 gap-4 grid grid-rows-1 border-l-2 pl-4">
                            <div className=" flex justify-end gap-x-4 items-center">
                                <div className="text-right items-end">
                                    <Link
                                        href={'/student/' + data?.student?.student_id}
                                        className="px-4 py-1 text-center bg-blue-100 text-blue-500  border border-blue-500  rounded-2xl"
                                    >
                                        {'ดูใบสมัคร'}
                                    </Link>
                                </div>
                                <div className="text-right items-end">
                                    <Link
                                        href={`my-students/` + data?.student?.student_id}
                                        className="bg-primary-100 text-primary-500  border border-primary-500  px-4 py-1 rounded-2xl  cursor-pointer"
                                    >
                                        {'ประเมิน'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className=" w-full h-full font-primary_noto text-4xl text-gray-400">
                    <h1 className="">ไม่พบข้อมูล !</h1>
                </div>
            )}
        </ContentContainer>
    );
}
