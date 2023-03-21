import ContentContainer from '@ui/ContentContainer';
import { Link } from '@ui/Link';
import BreadcrumbComponent from 'components/common/Beardcrumb/Beardcrumb';
import { useGetMe } from '@features/auth/hooks/useGetMe';
import React, { useEffect } from 'react';
import { Divider, Space, Tag } from 'antd';
import { useCancelApplyJob } from 'features/job/hooks/useCancelApplyJob';
import NotificationService from '@lib/ant_service/NotificationService';
import { useGetStudent } from '@features/student/hooks/useGetStudent';
import SkeletonLoading from '@ui/SkeletonLoading';
import { JobStatus } from '@constants/Job/JobStatus';
import { useStudentAcceptJob, useStudentRejectJob, useUndoStudentAcceptJob, useUndoStudentRejectJob } from '@features/job/hooks/useEditStateJob';

export default function JobApplying() {
    const { data: data_me, loading: loading_me, error: error_me, refetch } = useGetMe();
    const [cancelApplyJob, { loading, error }] = useCancelApplyJob();
    const notification = NotificationService.getInstance();
    const { data, loading: stu_loading, error: stu_error, refetch: refetch_stu_data } = useGetStudent(data_me?.getMe?.is_student?.student_id);
    const [studentAcceptJob, { loading: loading_stu_accept, error: error_stu_accept }] = useStudentAcceptJob();
    const [undoStudentAcceptJob, { loading: loading_undo_stu_accept, error: error_undo_stu_accept }] = useUndoStudentAcceptJob();
    const [studentRejectJob, { loading: loading_stu_reject, error: error_stu_reject }] = useStudentRejectJob();
    const [undoStudentRejectJob, { loading: loading_undo_stu_reject, error: error_undo_stu_reject }] = useUndoStudentRejectJob();

    useEffect(() => {
        refetch();
    }, []);

    const stu_accepted_job = data?.getStudent?.student_apply_job?.filter(
        (i) => i.job_status === JobStatus.STUDENTACCEPT || i.job_status === JobStatus.COMMITTEEAPPROVE
    );
    const handleCancelApplyJob = (id: string) => {
        cancelApplyJob({
            variables: { cancelApplyInfo: { job_id: id } },
            onCompleted: (result) => {
                if (result) {
                    notification.success('Success', 'ยกเลิกสมัครงานเสร็จสิ้น');
                }
                refetch_stu_data();
            },
            onError: (error) => {
                console.log(error);
                if (error) {
                    notification.error('Error', error.message);
                }
            },
        });
    };

    const handleStudentAcceptJob = (id: string) => {
        studentAcceptJob({
            variables: { studentAcceptInfo: { student_apply_job_id: id } },
            onCompleted: (result) => {
                if (result) {
                    notification.success('Success', 'ตอบรับงานเสร็จสิ้น');
                }
                refetch_stu_data();
            },
            onError: (error) => {
                console.log(error);
                if (error) {
                    notification.error('Error', error.message);
                }
            },
        });
    };

    const handleUndoStudentAcceptJob = (id: string) => {
        undoStudentAcceptJob({
            variables: { undoStudentAcceptInfo: { student_apply_job_id: id } },
            onCompleted: (result) => {
                if (result) {
                    notification.success('Success', 'ยกเลิกตอบรับงานเสร็จสิ้น');
                }
                refetch_stu_data();
            },
            onError: (error) => {
                console.log(error);
                if (error) {
                    notification.error('Error', error.message);
                }
            },
        });
    };

    const handleStudentRejectJob = (id: string) => {
        studentRejectJob({
            variables: { studentRejectInfo: { student_apply_job_id: id } },
            onCompleted: (result) => {
                if (result) {
                    notification.success('Success', 'ปฏิเสธงานเสร็จสิ้น');
                }
                refetch_stu_data();
            },
            onError: (error) => {
                console.log(error);
                if (error) {
                    notification.error('Error', error.message);
                }
            },
        });
    };

    const handleUndoStudentRejectJob = (id: string) => {
        undoStudentRejectJob({
            variables: { undoStudentRejectInfo: { student_apply_job_id: id } },
            onCompleted: (result) => {
                if (result) {
                    notification.success('Success', 'ยกเลิกการปฏิเสธงานเสร็จสิ้น');
                }
                refetch_stu_data();
            },
            onError: (error) => {
                console.log(error);
                if (error) {
                    notification.error('Error', error.message);
                }
            },
        });
    };

    if (error) {
        console.log(error);
    }
    if (stu_loading || loading_me) {
        return <SkeletonLoading></SkeletonLoading>;
    }

    return (
        <ContentContainer>
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1>งานที่สมัคร</h1>
                <Divider />
            </div>
            {data ? (
                data?.getStudent?.student_apply_job?.map((item) => (
                    <div
                        key={item?.job?.id}
                        className=" w-[80%] h-fit p-8 grid grid-cols-12  shadow-sm sm:rounded-lg border-solid border-1 border-gray-300 overflow-hidden bg-white font-primary_noto"
                    >
                        <div className=" w-full h-full col-span-8 gap-4 flex   ">
                            <Space size={[0, 8]} wrap className=" justify-center align-middle items-center absolute pt-1.5">
                                {item?.job_status === JobStatus.STUDENTAPPLIED ? <Tag color="processing">{item.job_status}</Tag> : ''}
                                {item?.job_status === JobStatus.COMPANYAPPROVE ? <Tag color="processing">{item.job_status}</Tag> : ''}
                                {item?.job_status === JobStatus.COMPANYCANCEL ? <Tag color="error">{item.job_status}</Tag> : ''}
                                {item?.job_status === JobStatus.STUDENTACCEPT ? <Tag color="processing">{item.job_status}</Tag> : ''}
                                {item?.job_status === JobStatus.STUDENTREJECT ? <Tag color="error">{item.job_status}</Tag> : ''}
                                {item?.job_status === JobStatus.COMMITTEEAPPROVE ? <Tag color="success">{item.job_status}</Tag> : ''}
                                {item?.job_status === JobStatus.COMMITTEECANCEL ? <Tag color="error">{item.job_status}</Tag> : ''}
                            </Space>
                            <div className="grid grid-cols-2 w-full align-middle items-center pl-32">
                                <div className=" w-full h-full grid items-center">
                                    <h1 className="text-md font-medium leading-6 text-gray-700">
                                        {item.job?.job_title ? item.job?.job_title : 'ไม่ระบุตำแหน่งงาน'}
                                    </h1>
                                </div>
                                <div className=" w-full h-full grid items-center justify-end pr-4">
                                    <h1 className="text-md font-medium leading-6 text-gray-700">
                                        {' '}
                                        {item.job?.company_id?.name_eng ? item.job?.company_id.name_eng : 'ไม่ระบุข้อมูล'}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full h-full col-span-4 gap-4 grid grid-rows-1 border-l-2 pl-4">
                            <div className=" flex justify-end gap-x-4 items-center">
                                <div className="text-right items-end">
                                    {item.job_status === JobStatus.STUDENTAPPLIED && (
                                        <button
                                            className="px-4 py-1 text-center bg-red-100 text-red-500  border border-red-500  rounded-2xl"
                                            onClick={() => handleCancelApplyJob(item?.id)}
                                        >
                                            ยกเลิกการสมัคร
                                        </button>
                                    )}
                                    {item.job_status === JobStatus.COMPANYAPPROVE && (
                                        <div className="flex gap-x-4">
                                            {stu_accepted_job.length >= 1 ? (
                                                <button
                                                    disabled
                                                    className="px-4 py-1 text-center bg-gray-100 text-gray-500  border border-gray-500 opacity-50 rounded-2xl"
                                                >
                                                    ตอบรับ
                                                </button>
                                            ) : (
                                                <button
                                                    className="px-4 py-1 text-center bg-green-100 text-green-500  border border-green-500  rounded-2xl"
                                                    onClick={() => handleStudentAcceptJob(item?.id)}
                                                >
                                                    ตอบรับ
                                                </button>
                                            )}

                                            <button
                                                className="px-4 py-1 text-center bg-red-100 text-red-500  border border-red-500  rounded-2xl"
                                                onClick={() => handleStudentRejectJob(item?.id)}
                                            >
                                                ปฏิเสธ
                                            </button>
                                        </div>
                                    )}
                                    {item.job_status === JobStatus.STUDENTACCEPT && (
                                        <button
                                            className="px-4 py-1 text-center bg-gray-100 text-gray-500  border border-gray-500  rounded-2xl"
                                            onClick={() => handleUndoStudentAcceptJob(item?.id)}
                                        >
                                            ยกเลิกการตอบรับ
                                        </button>
                                    )}
                                    {item.job_status === JobStatus.STUDENTREJECT && (
                                        <button
                                            className="px-4 py-1 text-center bg-gray-100 text-gray-500  border border-gray-500  rounded-2xl"
                                            onClick={() => handleUndoStudentRejectJob(item?.id)}
                                        >
                                            ยกเลิกการปฏิเสธ
                                        </button>
                                    )}
                                </div>
                                <div className="text-right items-end">
                                    <Link
                                        href={`/jobs/` + item.job?.id}
                                        className="px-4 py-1 text-center bg-blue-100 text-blue-500  border border-blue-500  rounded-2xl"
                                    >
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
