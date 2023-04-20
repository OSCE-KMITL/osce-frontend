import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { useGetStudent } from '@features/student/hooks/useGetStudent';
import SkeletonLoading from '@ui/SkeletonLoading';
import AppliedStatus from '@components/CoopRegister/AppliedStatus';
import Link from 'next/link';
import { Divider } from 'antd';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';

interface OwnProps {}

type Props = OwnProps;

const StudentInfo: FunctionComponent<Props> = (props) => {
    const router = useRouter();

    const current = router.query as { student_id: string };
    const { data, loading, error } = useGetStudent(current.student_id);

    if (loading) return <SkeletonLoading></SkeletonLoading>;
    if (error) return <>{error.message}</>;

    return (
        <div>
            <p onClick={() => router.back()} className="flex cursor-pointer flex-row mb-4 items-center gap-1 text-gray-500 ">
                <ArrowSmallLeftIcon className="w-6 h-6" />
                ย้อนกลับ
            </p>
            <div className="flex flex-row justify-between">
                {' '}
                <h1 className="">{`ใบสมัครนักศึกษา : ${current.student_id}`}</h1>
                <Link
                    href={'/student/report/' + current.student_id}
                    className="mb-6 flex items-center px-4 py-2 justify-center text-white text-xl bg-primary-500 rounded-md text-center font-semibold"
                >
                    {'รายงานผลสหกิจ'}
                </Link>
            </div>
            <Divider />
            <AppliedStatus studentData={data.getStudent}></AppliedStatus>
        </div>
    );
};

export default StudentInfo;
