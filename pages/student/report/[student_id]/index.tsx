import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useGetStudent } from '@features/student/hooks/useGetStudent';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { Divider } from 'antd';
import ProgressReportBanner from '@components/ProgressReport/Banner';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProgressReportList from '@components/ProgressReport/ProgressReportList';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';

interface OwnProps {}

type Props = OwnProps;

const CoopReportForAdvisor: FunctionComponent<Props> = (props) => {
    const { me } = useContext(AuthenticationContext);

    const router = useRouter();

    const [studentId, setStudentId] = useState<string | null>(null);

    useEffect(() => {
        setStudentId(router.query.student_id as string);
    }, [router]);
    return (
        <div>
            <p onClick={() => router.back()} className="flex cursor-pointer flex-row mb-4 items-center gap-1 text-gray-500 ">
                <ArrowSmallLeftIcon className="w-6 h-6" />
                ย้อนกลับ
            </p>
            <ProgressReportList student_id={studentId} />
        </div>
    );
};

export default CoopReportForAdvisor;
