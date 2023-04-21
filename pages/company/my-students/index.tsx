import ContentContainer from '@ui/ContentContainer';
import { Link } from '@ui/Link';
import SkeletonLoading from '@ui/SkeletonLoading';
import { Divider, Select, Space, Tag } from 'antd';
import { useGetMe } from '@features/auth/hooks/useGetMe';
import React, { useContext, useEffect, useState } from 'react';
import NotificationService from 'lib/ant_service/NotificationService';
import { useRouter } from 'next/router';
import { useGetStudentApplyJob } from '@features/job/hooks/useGetStudentApplyJob';
import { JobStatus } from '@constants/Job/JobStatus';

export default function MyStudents() {
    const { data, loading, error, refetch } = useGetMe();
    const notification = NotificationService.getInstance();
    const router = useRouter();
    const [selectedValue, setSelectedValue] = useState('ทั้งหมด');
    const [dataStudent, setDataStudent] = useState(null);
    const { data: stu_apply_job_data, loading: stu_apply_job_loading, error: stu_apply_job_error, refetch: stu_apply_job_refetch } = useGetStudentApplyJob();
    const company_id = data?.getMe?.is_company?.company_id?.id;
    const type_student = ['ฝึกงาน+สหกิจศึกษา (6 เดือน)', 'สหกิจศึกษา (4 เดือน)', 'ฝึกงาน (2 เดือน)'];

    useEffect(() => {
        refetch();
    }, []);

    const student_data = stu_apply_job_data?.getAllStudentApplyJob?.filter(
        (i) => i.job_status === JobStatus.COMMITTEEAPPROVE && i.job.company_id.id === company_id
    );
    student_data?.sort((a, b) => a.job?.job_title?.localeCompare(b.job?.job_title));

    const updateStudentData = (type_filter: string) => {
        if (type_filter === 'ทั้งหมด') {
            setDataStudent(
                stu_apply_job_data?.getAllStudentApplyJob?.filter((i) => i.job_status === JobStatus.COMMITTEEAPPROVE && i.job.company_id.id === company_id)
            );
        } else if (type_filter === 'สหกิจศึกษา') {
            setDataStudent(
                stu_apply_job_data?.getAllStudentApplyJob?.filter(
                    (i) =>
                        i.job_status === JobStatus.COMMITTEEAPPROVE &&
                        i.job.company_id.id === company_id &&
                        (i.job?.internship_period === type_student[0] || i.job?.internship_period === type_student[1])
                )
            );
        } else if (type_filter === 'ฝึกงาน') {
            setDataStudent(
                stu_apply_job_data?.getAllStudentApplyJob?.filter(
                    (i) => i.job_status === JobStatus.COMMITTEEAPPROVE && i.job.company_id.id === company_id && i.job?.internship_period === type_student[2]
                )
            );
        }

        dataStudent?.sort((a, b) => a.job?.job_title?.localeCompare(b.job?.job_title));
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        updateStudentData(event.target.value);
    };

    return (
        <ContentContainer>
            <div className="w-[80%] h-fit">
                <h1>นักศึกษาที่สังกัดปัจจุบัน</h1>
                <Divider />
                <div className="flex justify-end">
                    <div className="rounded-xl py-2 px-4 bg-white flex items-center ">
                        <p className="text-md  font-primary_noto pr-2">ประเภท</p>
                        <select className="bg-white text-md text-primary-500 font-bold font-primary_noto flex" value={selectedValue} onChange={handleChange}>
                            <option value="ทั้งหมด" label="ทั้งหมด"></option>
                            <option value="สหกิจศึกษา" label="สหกิจศึกษา"></option>
                            <option value="ฝึกงาน" label="ฝึกงาน"></option>
                        </select>
                    </div>
                </div>
            </div>

            {loading && <SkeletonLoading />}
            {dataStudent ? (
                dataStudent?.map((data) => (
                    <div
                        key={data?.id}
                        className=" w-[80%] h-fit p-8 grid grid-cols-12  shadow-sm sm:rounded-lg border-solid border-1 border-gray-300 overflow-hidden bg-white font-primary_noto"
                    >
                        <div className=" w-full h-full col-span-8 gap-4 flex  ">
                            <Space className=" relative pb-6">
                                <Tag color="processing" className=" absolute">
                                    {data?.job?.internship_period === type_student[0] ? 'สหกิจศึกษา' : ''}
                                    {data?.job?.internship_period === type_student[1] ? 'สหกิจศึกษา' : ''}
                                    {data?.job?.internship_period === type_student[2] ? 'ฝึกงาน' : ''}
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
                        <div className=" w-full h-full col-span-4 gap-4 flex border-l-2 pl-4 justify-end">
                            <div className="flex w-[57%] gap-x-4 items-center">
                                <div className="text-right items-end">
                                    <Link
                                        href={'/student/' + data?.student?.student_id}
                                        className="px-4 py-1 text-center bg-blue-100 text-blue-500  border border-blue-500  rounded-2xl"
                                    >
                                        {'ดูใบสมัคร'}
                                    </Link>
                                </div>
                                <div className="text-right items-end">
                                    {data?.student?.company_assessment?.id ? (
                                        <Link
                                            href={`my-students/` + data?.student?.student_id}
                                            className="bg-green-100 text-green-500  border border-green-500  px-4 py-1 rounded-2xl  cursor-pointer"
                                        >
                                            {'ประเมินแล้ว'}
                                        </Link>
                                    ) : (
                                        <Link
                                            href={`my-students/` + data?.student?.student_id}
                                            className="bg-primary-100 text-primary-500  border border-primary-500  px-4 py-1 rounded-2xl  cursor-pointer"
                                        >
                                            {'ประเมิน'}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <>
                    {student_data ? (
                        student_data?.map((data) => (
                            <div
                                key={data?.id}
                                className=" w-[80%] h-fit p-8 grid grid-cols-12  shadow-sm sm:rounded-lg border-solid border-1 border-gray-300 overflow-hidden bg-white font-primary_noto"
                            >
                                <div className=" w-full h-full col-span-8 gap-4 flex  ">
                                    <Space className=" relative pb-6">
                                        <Tag color="processing" className=" absolute">
                                            {data?.job?.internship_period === type_student[0] ? 'สหกิจศึกษา' : ''}
                                            {data?.job?.internship_period === type_student[1] ? 'สหกิจศึกษา' : ''}
                                            {data?.job?.internship_period === type_student[2] ? 'ฝึกงาน' : ''}
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
                                <div className=" w-full h-full col-span-4 gap-4 flex border-l-2 pl-4 justify-end">
                                    <div className="flex w-[57%] gap-x-4 items-center">
                                        <div className="text-right items-end">
                                            <Link
                                                href={'/student/' + data?.student?.student_id}
                                                className="px-4 py-1 text-center bg-blue-100 text-blue-500  border border-blue-500  rounded-2xl"
                                            >
                                                {'ดูใบสมัคร'}
                                            </Link>
                                        </div>
                                        <div className="text-right items-end">
                                            {data?.student?.company_assessment?.id ? (
                                                <Link
                                                    href={`my-students/` + data?.student?.student_id}
                                                    className="bg-green-100 text-green-500  border border-green-500  px-4 py-1 rounded-2xl  cursor-pointer"
                                                >
                                                    {'ประเมินแล้ว'}
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={`my-students/` + data?.student?.student_id}
                                                    className="bg-primary-100 text-primary-500  border border-primary-500  px-4 py-1 rounded-2xl  cursor-pointer"
                                                >
                                                    {'ประเมิน'}
                                                </Link>
                                            )}
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
                </>
            )}
        </ContentContainer>
    );
}
