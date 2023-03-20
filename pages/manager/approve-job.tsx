import React from 'react';
import { Divider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import tableStyle from '../../styles/Table/table.module.scss';
import { useGetStudents } from '@features/student/hooks/useGetStudents';
import Link from 'next/link';
import { useGetStudentApplyJob } from '@features/job/hooks/useGetStudentApplyJob';
import { IStudentApplyJob } from '@features/job/hooks/useGetJobs';
import { JobStatus } from '@constants/Job/JobStatus';
import ContentContainer from '@ui/ContentContainer';
import {
    useCommitteeApproveJob,
    useCommitteeDisapproveJob,
    useUndoCommitteeApproveJob,
    useUndoCommitteeDisapproveJob,
} from '@features/job/hooks/useEditStateJob';
import NotificationService from '@lib/ant_service/NotificationService';
import { LinkIcon } from '@heroicons/react/24/outline';
import { useGetMe } from '@features/auth/hooks/useGetMe';

const ApproveJob: React.FC = () => {
    const { data: stu_apply_job_data, loading, error, refetch } = useGetStudentApplyJob();
    const [committeeApproveJob, { loading: approve_loading, error: approve_error }] = useCommitteeApproveJob();
    const [undoCommitteeApproveJob, { loading: undo_approve_loading, error: undo_approve_error }] = useUndoCommitteeApproveJob();
    const [committeeDisapproveJob, { loading: disapprove_loading, error: disapprove_error }] = useCommitteeDisapproveJob();
    const [undoCommitteeDisapproveJob, { loading: undo_disapprove_loading, error: undo_disapprove_error }] = useUndoCommitteeDisapproveJob();
    const { data: dataGetMe, refetch: refectch_me } = useGetMe();

    const committee_dep = dataGetMe?.getMe?.is_advisor?.department;
    const notification = NotificationService.getInstance();
    const filter_stu_data = stu_apply_job_data?.getAllStudentApplyJob.filter(
        (i) =>
            (i.job_status === JobStatus.COMPANYAPPROVE || i.job_status === JobStatus.COMMITTEEAPPROVE || i.job_status === JobStatus.COMMITTEECANCEL) &&
            (i.job.required_major.includes(committee_dep) || i.job.required_major.includes('ไม่จำกัดหลักสูตร'))
    );

    filter_stu_data?.sort((a, b) => a.job?.company_id?.name_eng.localeCompare(b.job?.company_id?.name_eng));
    const handleApproveJob = (id: string) => {
        if (id) {
            committeeApproveJob({
                variables: { committeeApproveInfo: { student_apply_job_id: id } },
                onCompleted: (result) => {
                    if (result) {
                        notification.success('Success', 'อนุมัติงานเสร็จสิ้น');
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
            committeeDisapproveJob({
                variables: { committeeDisapproveInfo: { student_apply_job_id: id } },
                onCompleted: (result) => {
                    if (result) {
                        notification.success('Success', 'ไม่อนุมัติงานเสร็จสิ้น');
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
            undoCommitteeApproveJob({
                variables: { undoCommitteeApproveInfo: { student_apply_job_id: id } },
                onCompleted: (result) => {
                    if (result) {
                        notification.success('Success', 'ยกเลิกการอนุมัติงานเสร็จสิ้น');
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
            undoCommitteeDisapproveJob({
                variables: { undoCommitteeDisapproveInfo: { student_apply_job_id: id } },
                onCompleted: (result) => {
                    if (result) {
                        notification.success('Success', 'ยกเลิกการไม่อนุมัติเสร็จสิ้น');
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
    const columns: ColumnsType<IStudentApplyJob> = [
        {
            title: 'รหัสนักศึกษา',
            dataIndex: 'student',
            render: (value, { student }, index) => {
                return <>{student?.student_id}</>;
            },
        },
        {
            title: 'ชื่อ-นามสกุล',
            dataIndex: 'student',
            render: (value, { student }, index) => {
                return <>{student?.name_prefix + ' ' + student?.name_th + ' ' + student?.lastname_th}</>;
            },
        },
        {
            title: 'หลักสูตร',
            dataIndex: 'student',
            render: (value, { student }, index) => {
                return <>{student?.curriculum?.curriculum_name_th}</>;
            },
        },
        {
            title: 'บริษัท',
            dataIndex: 'job',
            render: (value, { job }, index) => {
                return <>{job?.company_id?.name_eng}</>;
            },
        },
        {
            title: 'ตำแหน่ง',
            dataIndex: 'job',
            render: (value, { job }, index) => {
                return (
                    <>
                        {job?.job_title ? (
                            <Link href={`/jobs/` + job?.id} className="flex items-center gap-2">
                                {job?.job_title} ({job?.students.length}/{job?.limit})
                                <LinkIcon className="w-3 h-3" />
                            </Link>
                        ) : (
                            '-'
                        )}
                    </>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (value, { job, job_status, id, student }, index) => {
                return (
                    <div className={'flex flex-row gap-2'}>
                        {/* <div className={'px-4 py-1 text-center bg-blue-100 text-blue-500  border border-blue-500 rounded-2xl cursor-pointer'}>
                            <Link href={`/jobs/` + job?.id} className="cursor-pointer">
                                รายละเอียดงาน
                            </Link>
                        </div> */}
                        {job_status === JobStatus.COMPANYAPPROVE ? (
                            <>
                                <div className={'px-4 py-1 text-center bg-green-100 text-green-500  border border-green-500  rounded-2xl  '}>
                                    <button onClick={() => handleApproveJob(id)}>อนุมัติ</button>
                                </div>
                                <div className={'px-4 py-1 text-center bg-red-100 text-red-500  border border-red-500 rounded-2xl  '}>
                                    <button onClick={() => handleDisapproveJob(id)}>ไม่อนุมัติ</button>
                                </div>
                            </>
                        ) : (
                            ''
                        )}

                        {job_status === JobStatus.COMMITTEEAPPROVE ? (
                            <div className={'px-4 py-1 text-center bg-gray-100 text-gray-500  border border-gray-500  rounded-2xl  '}>
                                <button onClick={() => handleUndoApproveJob(id)}>ยกเลิกการอนุมัติ</button>
                            </div>
                        ) : (
                            ''
                        )}

                        {job_status === JobStatus.COMMITTEECANCEL ? (
                            <div className={'px-4 py-1 text-center bg-gray-100 text-gray-500  border border-gray-500  rounded-2xl  '}>
                                <button onClick={() => handleUndoDisapproveJob(id)}>ยกเลิกการไม่อนุมัติ</button>
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
        <div>
            <h1>งานที่บริษัทตอบรับ</h1>
            <Divider />
            <Table
                bordered={true}
                size={'large'}
                rowClassName={rowClassname}
                className={tableStyle.customTable}
                columns={columns}
                dataSource={filter_stu_data}
            />
        </div>
    );
};

export default ApproveJob;
