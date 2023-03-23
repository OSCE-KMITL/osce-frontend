import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { useGetStudent } from '@features/student/hooks/useGetStudent';
import SkeletonLoading from '@ui/SkeletonLoading';
import AppliedStatus from '@components/CoopRegister/AppliedStatus';

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
            <p onClick={() => router.back()} className="mb-6 font-semibold">
                {'< ย้อนกลับ'}
            </p>
            <h1 className="mb-6 font-semibold">{`ใบสมัครนักศึกษา : ${current.student_id}`}</h1>
            <AppliedStatus studentData={data.getStudent}></AppliedStatus>
        </div>
    );
};

export default StudentInfo;
