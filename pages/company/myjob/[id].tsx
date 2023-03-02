import { Link } from '@ui/Link';
import { Button, Statistic } from 'antd';
import BreadcrumbComponent from 'components/common/Beardcrumb/Beardcrumb';
import { IStudentApplyJob, useGetJob } from 'features/job/hooks/useGetJobs';
import { DownloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import StudentApplyTable from '@components/Job/StudentApplyTable';
import Table, { ColumnsType } from 'antd/es/table';
import { IStudent } from '@features/student/interfaces/Student';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import tableStyle from '../../../styles/Table/table.module.scss';
import { JobStatus } from '@constants/Job/JobStatus';
import { useCompnayApproveJob, useUndoCompnayApproveJob } from '@features/job/hooks/useEditStateJob';
import NotificationService from '@lib/ant_service/NotificationService';

export default function DetailMyJob() {
    const router = useRouter();
    const { id } = router.query;
    const { data, loading, error, refetch } = useGetJob({ jobId: id as string });
    const [companyApproveJob, { loading: approve_loading, error: approve_error }] = useCompnayApproveJob();
    const [undoCompanyApproveJob, { loading: undo_approve_loading, error: undo_approve_error }] = useUndoCompnayApproveJob();
    const notification = NotificationService.getInstance();

    const handleApproveJob = (id: string) => {
        if (id) {
            companyApproveJob({
                variables: { companyApproveInfo: { student_apply_job_id: id } },
                onCompleted: (result) => {
                    if (result) {
                        notification.success('Success', 'ตอบรับงานเสร็จสิ้น');
                        refetch();
                    }
                },
                onError: (error) => {
                    if (error) {
                        notification.error('Error', error.message);
                        refetch();
                    }
                },
            });
        }
    };

    const handleUndoApproveJob = (id: string) => {
        if (id) {
            undoCompanyApproveJob({
                variables: { undoCompanyApproveInfo: { student_apply_job_id: id } },
                onCompleted: (result) => {
                    if (result) {
                        notification.success('Success', 'ยกเลิกตอบรับงานเสร็จสิ้น');
                        refetch();
                    }
                },
                onError: (error) => {
                    if (error) {
                        notification.error('Error', error.message);
                        refetch();
                    }
                },
            });
        }
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         // Fetch or update data here
    //         refetch();
    //     }, 2000);

    //     return () => clearInterval(interval);
    // }, []);

    const columns: ColumnsType<IStudentApplyJob> = [
        {
            title: 'ชื่อ-นามสกุล',
            dataIndex: 'student',
            render: (text, { student }, record) =>
                `${student?.name_prefix ? student?.name_prefix : ''}    ${student?.name_th ? student.name_th : ''}  ${
                    student?.lastname_th ? student?.lastname_th : ''
                }`,
        },
        {
            title: 'หลักสูตร',
            dataIndex: 'student',
            render: (text, { student }, record) => `${student?.curriculum?.curriculum_name_th ? student?.curriculum?.curriculum_name_th : ''} `,
        },
        {
            title: 'อีเมล์',
            dataIndex: 'student',
            render: (text, { student }, record) => `${student?.account?.email ? student?.account?.email : ''} `,
        },
        {
            title: 'โทรศัพท์',
            dataIndex: 'student',
            render: (text, { student }, record) => `${student?.phone_number ? student?.phone_number : ''} `,
        },

        {
            title: 'Actions',
            dataIndex: 'student',
            render: (value, { student, job_status, id }, index) => {
                return (
                    <div className={'flex flex-row gap-2'}>
                        <div className={'px-4 py-1 text-center bg-blue-100 text-blue-500  border border-blue-500 rounded-2xl cursor-pointer'}>
                            <Link href={'/student/' + student.student_id} className="cursor-pointer">
                                ดูข้อมูล
                            </Link>
                        </div>
                        {job_status === JobStatus.STUDENTAPPLIED ? (
                            <>
                                <div className={'px-4 py-1 text-center bg-green-100 text-green-500  border border-green-500  rounded-2xl  '}>
                                    <button onClick={() => handleApproveJob(id)}>ตอบรับ</button>
                                </div>
                                <div className={'px-4 py-1 text-center bg-red-100 text-red-500  border border-red-500 rounded-2xl  '}>
                                    <button onClick={() => handleApproveJob(student.student_id)}>ปฏิเสธ</button>
                                </div>
                            </>
                        ) : (
                            ''
                        )}

                        {job_status === JobStatus.COMPANYAPPROVE ? (
                            <div className={'px-4 py-1 text-center bg-primary-100 text-primary-500  border border-primary-500  rounded-2xl  '}>
                                <button onClick={() => handleUndoApproveJob(id)}>ยกเลิกการตอบรับ</button>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                );
            },
        },
        // {
        //     title: 'Action',
        //     dataIndex: 'action',
        //     render: (value, { transcript, student_id }, index) => {
        //         return (
        //             <div className={'flex flex-row gap-4'}>
        //                 <Link href={'/student/' + student_id} className="cursor-pointer">
        //                     <MagnifyingGlassIcon className="w-6 h-6  text-gray-600 " />
        //                 </Link>
        //                 <div className="cursor-pointer">
        //                     <PencilSquareIcon className="w-6 h-6 text-gray-600 " />
        //                 </div>{' '}
        //                 <div className="cursor-pointer">
        //                     <TrashIcon className="w-6 h-6  text-gray-600 hover:text-red-600 " />
        //                 </div>
        //             </div>
        //         );
        //     },
        // },
    ];
    const rowClassname = (record, index) => {
        if (index % 2 !== 0) {
            return 'bg-[#f2f2f2]';
        }
    };
    if (loading) {
        return <p>loading</p>;
    }
    if (error) {
        return <p>error</p>;
    }

    return (
        <div className="w-full">
            <div className="xl:w-full 2xl:w-4/5 w-full">
                <div className="w-[80%] h-fit">
                    <BreadcrumbComponent />
                    <h1 className=" text-4xl md:text-5xl font-primary_noto font-semibold">รายชื่อผู้สมัคร</h1>
                    <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
                </div>
                {data && (
                    <div>
                        <div className=" py-4 md:py-7">
                            <div className="sm:flex items-center justify-between">
                                <div className="flex gap-x-16">
                                    <p className="text-base sm:text-lg md:text-xl font-bold leading-normal text-white-800 font-primary_noto">
                                        ตำแหน่ง : {data?.getJobById?.job_title ? data?.getJobById?.job_title : 'ไม่ระบุตำแหน่งงาน'}
                                    </p>
                                    <p className="text-base sm:text-lg md:text-xl font-bold leading-normal text-white-800 font-primary_noto">
                                        {data?.getJobById?.limit ? 'จำนวนที่รับสมัคร : 0 / ' + data?.getJobById?.limit : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="bg-white font-primary_noto rounded-md  h-auto border-2 border-gray-100">
                            <div className="overflow-x-auto rounded-md">
                                <table className="w-full whitespace-nowrap  rounded-xl">
                                    <tbody>
                                        <tr className="bg-primary-400 h-12 text-white text-md">
                                            <th></th>
                                            <th className="  pl-8">ชื่อ-นามสกุล</th>
                                            <th className="  pl-8">หลักสูตร</th>
                                            <th className="  pl-8">อีเมล์</th>
                                            <th className="  pl-8">โทรศัพท์</th>
                                            <th className="  pl-8">Actions</th>
                                        </tr>
                                        {data.getJobById?.students.map((students) => (
                                            <tr
                                                key={students?.student_id}
                                                className="text-sm leading-none text-gray-600 border-t-2 border-b-2 border-white border-b-gray-100"
                                            >
                                                <td className="pl-8">
                                                    <div className="flex items-center">
                                                        <div className="w-14 h-14 m-2 bg-gray-500 rounded-full flex items-center justify-center">
                                                            <p className="text-xs font-bold leading-3 text-white">Image</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-sm leading-3 text-gray-600 pl-8 flex justify-center">
                                                        {students?.name_th ? students?.name_th : ''} {students?.lastname_th ? students?.lastname_th : ''}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p className="pl-16 text-sm">วิศวกรรมคอมพิวเตอร์</p>
                                                </td>
                                                <td className="text-sm pl-16">
                                                    <p>{students?.student_id ? students?.student_id + '@kmitl.ac.th' : '-'}</p>
                                                </td>
                                                <td>
                                                    <p className="pl-8">0816367210</p>
                                                </td>

                                                <td>
                                                    <div className="flex items-end justify-center gap-x-2 pl-8 font-primary_noto">
                                                        <div className="text-right items-end">
                                                            <Link
                                                                href={`/jobs/`}
                                                                className="bg-red-600 hover:bg-red-400 text-white px-6 py-2 rounded-2xl text-sm  cursor-pointer "
                                                            >
                                                                {'ปฏิเสธ'}
                                                            </Link>
                                                        </div>
                                                        <div className="text-right items-end">
                                                            <Link
                                                                href={`/jobs/`}
                                                                className=" bg-green-600 hover:bg-green-400 text-white px-6 py-2 rounded-2xl text-sm  cursor-pointer "
                                                            >
                                                                {'ตอบรับ'}
                                                            </Link>
                                                        </div>
                                                        <div className="text-right items-end">
                                                            <Link
                                                                href={`/jobs/`}
                                                                className=" bg-blue-200 hover:bg-blue-100 text-blue-500 px-6 py-2 rounded-2xl text-sm  cursor-pointer "
                                                            >
                                                                {'ดูข้อมูล'}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div> */}
                        {/* <StudentApplyTable datasource={data?.getJobById?.students} loading={loading} /> */}
                        <Table
                            bordered={true}
                            size={'large'}
                            rowClassName={rowClassname}
                            className={tableStyle.customTable}
                            columns={columns}
                            dataSource={data?.getJobById?.student_apply_job}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
