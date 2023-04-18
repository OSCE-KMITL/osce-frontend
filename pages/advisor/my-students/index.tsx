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
import { useGetAdvisor } from '@features/advisor/hooks/useGetAdvisor';

export default function MyStudents() {
    const { data, loading, error, refetch } = useGetMe();
    const notification = NotificationService.getInstance();
    const [selectedValue, setSelectedValue] = useState('ทั้งหมด');
    const [dataStudent, setDataStudent] = useState(null);
    const type_student = ['ฝึกงาน+สหกิจศึกษา (6 เดือน)', 'สหกิจศึกษา (4 เดือน)', 'ฝึกงาน (2 เดือน)'];
    const advisor_id = data?.getMe?.is_advisor?.advisor_id;
    const { data: advisor_data, loading: advisor_loading, error: advisor_error, refetch: advisor_refetch } = useGetAdvisor(advisor_id);

    useEffect(() => {
        refetch();
    }, []);

    const advisor_department = advisor_data?.getAdvisor?.department?.department_name_th;
    const student_data = advisor_data?.getAdvisor?.students.filter((i) => i.department?.department_name_th === advisor_department);
    const updateStudentData = (type_filter: string) => {
        if (type_filter === 'ทั้งหมด') {
            setDataStudent(student_data);
        } else if (type_filter === 'สหกิจศึกษา') {
            setDataStudent(student_data?.filter((i) => i.job?.internship_period === type_student[0] || i.job?.internship_period === type_student[1]));
        } else if (type_filter === 'ฝึกงาน') {
            setDataStudent(student_data?.filter((i) => i.job?.internship_period === type_student[2]));
        }
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        updateStudentData(event.target.value);
    };

    return (
        <ContentContainer>
            <div className="w-[80%] h-fit">
                <h1>นักศึกษาในการดูแล</h1>
                <Divider />
                <div className="flex justify-end">
                    <div className="rounded-xl py-2 px-4 bg-white flex items-center ">
                        <p className="text-md  font-primary_noto pr-2">ประเภท</p>
                        <select className="text-md text-primary-500 font-bold font-primary_noto flex" value={selectedValue} onChange={handleChange}>
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
                            {data?.job ? (
                                <Space className=" relative pb-6">
                                    <Tag color="processing" className=" absolute">
                                        {data?.job?.internship_period === type_student[0] ? 'สหกิจศึกษา' : ''}
                                        {data?.job?.internship_period === type_student[1] ? 'สหกิจศึกษา' : ''}
                                        {data?.job?.internship_period === type_student[2] ? 'ฝึกงาน' : ''}
                                    </Tag>
                                </Space>
                            ) : (
                                <Space className=" relative pb-6">
                                    <Tag color="processing" className=" absolute">
                                        ไม่พบข้อมูล
                                    </Tag>
                                </Space>
                            )}
                            <div className="grid grid-cols-2 w-full align-middle items-center pl-24  text-gray-700">
                                <h1 className="text-md font-medium leading-6 ">
                                    {data?.student?.name_prefix} {data?.student?.name_th} {data?.student?.lastname_th}
                                </h1>
                                {data?.job ? (
                                    <h1 className="text-md font-medium leading-6  grid justify-end pr-16">
                                        {data?.job?.job_title ? data?.job?.job_title : 'ไม่ระบุตำแหน่งงาน'}
                                    </h1>
                                ) : (
                                    <h1 className="text-md font-medium leading-6  grid justify-end pr-16">ยังไม่ได้รับงาน</h1>
                                )}
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
                                    {data?.advisor_assessment?.id ? (
                                        <Link
                                            href={`my-students/` + data?.student_id}
                                            className="bg-green-100 text-green-500  border border-green-500  px-4 py-1 rounded-2xl  cursor-pointer"
                                        >
                                            {'ประเมินแล้ว'}
                                        </Link>
                                    ) : (
                                        <Link
                                            href={`my-students/` + data?.student_id}
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
                                key={data?.student_id}
                                className=" w-[80%] h-fit p-8 grid grid-cols-12  shadow-sm sm:rounded-lg border-solid border-1 border-gray-300 overflow-hidden bg-white font-primary_noto"
                            >
                                <div className=" w-full h-full col-span-8 gap-4 flex  ">
                                    {data?.job ? (
                                        <Space className=" relative pb-6">
                                            <Tag color="processing" className=" absolute">
                                                {data?.job?.internship_period === type_student[0] ? 'สหกิจศึกษา' : ''}
                                                {data?.job?.internship_period === type_student[1] ? 'สหกิจศึกษา' : ''}
                                                {data?.job?.internship_period === type_student[2] ? 'ฝึกงาน' : ''}
                                            </Tag>
                                        </Space>
                                    ) : (
                                        <Space className=" relative pb-6">
                                            <Tag color="processing" className=" absolute">
                                                ไม่พบข้อมูล
                                            </Tag>
                                        </Space>
                                    )}

                                    <div className="grid grid-cols-2 w-full align-middle items-center pl-24  text-gray-700">
                                        <h1 className="text-md font-medium leading-6 ">
                                            {data?.name_prefix} {data?.name_th} {data?.lastname_th}
                                        </h1>
                                        {data?.job ? (
                                            <h1 className="text-md font-medium leading-6  grid justify-end pr-16">
                                                {data?.job?.job_title ? data?.job?.job_title : 'ไม่ระบุตำแหน่งงาน'}
                                            </h1>
                                        ) : (
                                            <h1 className="text-md font-medium leading-6  grid justify-end pr-16">ยังไม่ได้รับงาน</h1>
                                        )}
                                    </div>
                                </div>
                                <div className=" w-full h-full col-span-4 gap-4 flex border-l-2 pl-4 justify-end">
                                    <div className="flex w-[57%] gap-x-4 items-center">
                                        <div className="text-right items-end">
                                            <Link
                                                href={'/student/' + data?.student_id}
                                                className="px-4 py-1 text-center bg-blue-100 text-blue-500  border border-blue-500  rounded-2xl"
                                            >
                                                {'ดูใบสมัคร'}
                                            </Link>
                                        </div>
                                        <div className="text-right items-end">
                                            {data?.advisor_assessment?.id ? (
                                                <Link
                                                    href={`my-students/` + data?.student_id}
                                                    className="bg-green-100 text-green-500  border border-green-500  px-4 py-1 rounded-2xl  cursor-pointer"
                                                >
                                                    {'ประเมินแล้ว'}
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={`my-students/` + data?.student_id}
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
