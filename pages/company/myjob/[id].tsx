import { Link } from '@ui/Link';
import { Button, Divider, Space, Statistic, Table, TableColumnsType, Tag } from 'antd';
import { IStudentApplyJob, useGetJob } from 'features/job/hooks/useGetJobs';
import BreadcrumbComponent from 'components/common/Beardcrumb/Beardcrumb';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import tableStyle from '../../../styles/Table/table.module.scss';
import { JobStatus } from '@constants/Job/JobStatus';
import { useCompnayApproveJob, useCompnayDisapproveJob, useUndoCompnayApproveJob, useUndoCompnayDisapproveJob } from '@features/job/hooks/useEditStateJob';
import NotificationService from '@lib/ant_service/NotificationService';
import ShowTagJobStatus from '@components/Job/ShowTagJobStatus';

const DetailMyJob: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, loading, error, refetch } = useGetJob({ jobId: id as string });
    const [companyApproveJob, { loading: approve_loading, error: approve_error }] = useCompnayApproveJob();
    const [undoCompanyApproveJob, { loading: undo_approve_loading, error: undo_approve_error }] = useUndoCompnayApproveJob();
    const notification = NotificationService.getInstance();
    const [companyDisapproveJob, { loading: disapprove_loading, error: disapprove_error }] = useCompnayDisapproveJob();
    const [undoCompanyDisapproveJob, { loading: undo_disapprove_loading, error: undo_disapprove_error }] = useUndoCompnayDisapproveJob();
    const dataSource = data?.getJobById?.student_apply_job;

    const limit = data?.getJobById?.limit;
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

    const handleDisapproveJob = (id: string) => {
        if (id) {
            companyDisapproveJob({
                variables: { companyDisapproveInfo: { student_apply_job_id: id } },
                onCompleted: (result) => {
                    if (result) {
                        notification.success('Success', 'ปฏิเสธการตอบรับเสร็จสิ้น');
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

    const handleUndoDisapproveJob = (id: string) => {
        if (id) {
            undoCompanyDisapproveJob({
                variables: { undoCompanyDisapproveInfo: { student_apply_job_id: id } },
                onCompleted: (result) => {
                    if (result) {
                        notification.success('Success', 'ยกเลิกการปฏิเสธเสร็จสิ้น');
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

    const approve_count = data?.getJobById?.student_apply_job.filter(
        (i) => i.job_status === JobStatus.COMPANYAPPROVE || i.job_status === JobStatus.COMMITTEEAPPROVE || i.job_status === JobStatus.STUDENTACCEPT
    ).length;

    const columns: TableColumnsType<IStudentApplyJob> = [
        {
            title: <div className="flex items-center justify-center">ชื่อ-นามสกุล</div>,
            dataIndex: 'student',
            render: (text, { student }, record) =>
                `${student?.name_prefix ? student?.name_prefix : ''}    ${student?.name_th ? student.name_th : ''}  ${
                    student?.lastname_th ? student?.lastname_th : ''
                }`,
        },
        {
            title: <div className="flex items-center justify-center">หลักสูตร</div>,
            dataIndex: 'student',
            render: (text, { student }, record) => `${student?.curriculum?.curriculum_name_th ? student?.curriculum?.curriculum_name_th : ''} `,
        },
        {
            title: <div className="flex items-center justify-center">อีเมล์</div>,
            dataIndex: 'student',
            render: (text, { student }, record) => `${student?.account?.email ? student?.account?.email : ''} `,
        },
        {
            align: 'center',
            title: 'โทรศัพท์',
            dataIndex: 'student',
            render: (text, { student }, record) => `${student?.phone_number ? student?.phone_number : ''} `,
        },

        {
            align: 'center',
            title: 'สถานะ',
            dataIndex: 'student',
            render: (text, { student, job_status }, record) => ShowTagJobStatus(job_status),
        },

        {
            align: 'center',
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
                                {approve_count < parseInt(limit) ? (
                                    <div className={'px-4 py-1 text-center bg-green-100 text-green-500  border border-green-500 rounded-2xl  '}>
                                        <button onClick={() => handleApproveJob(id)}>ตอบรับ</button>
                                    </div>
                                ) : (
                                    <div className={'px-4 py-1 text-center bg-gray-100 text-gray-500  border border-gray-500 opacity-50 rounded-2xl  '}>
                                        <button onClick={() => handleApproveJob(id)} disabled>
                                            ตอบรับ
                                        </button>
                                    </div>
                                )}

                                <div className={'px-4 py-1 text-center bg-red-100 text-red-500  border border-red-500 rounded-2xl  '}>
                                    <button onClick={() => handleDisapproveJob(id)}>ปฏิเสธ</button>
                                </div>
                            </>
                        ) : (
                            ''
                        )}

                        {job_status === JobStatus.COMPANYAPPROVE ? (
                            <div className={'px-4 py-1 text-center bg-gray-100 text-gray-500  border border-gray-500  rounded-2xl  '}>
                                <button onClick={() => handleUndoApproveJob(id)}>ยกเลิกการตอบรับ</button>
                            </div>
                        ) : (
                            ''
                        )}

                        {job_status === JobStatus.COMPANYCANCEL ? (
                            <div className={'px-4 py-1 text-center bg-gray-100 text-gray-500  border border-gray-500  rounded-2xl  '}>
                                <button onClick={() => handleUndoDisapproveJob(id)}>ยกเลิกการปฏิเสธ</button>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                );
            },
        },
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
                    <p onClick={() => router.back()} className="mb-6 font-semibold cursor-pointer ">
                        {'< ย้อนกลับ'}
                    </p>
                    <h1>รายชื่อผู้สมัคร</h1>
                    <Divider />
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
                                        {limit ? `จำนวนที่รับสมัคร : ${approve_count} / ` + limit : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Table
                            bordered={true}
                            size={'large'}
                            rowClassName={rowClassname}
                            className={tableStyle.customTable}
                            columns={columns}
                            dataSource={dataSource}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
export default DetailMyJob;
