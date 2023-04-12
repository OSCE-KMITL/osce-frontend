import React, { FunctionComponent, useContext, useEffect } from 'react';
import { useGetStudent } from '@features/student/hooks/useGetStudent';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { Divider } from 'antd';
import ProgressReportBanner from '@components/ProgressReport/Banner';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface OwnProps {}

type Props = OwnProps;

const CoopReport: FunctionComponent<Props> = (props) => {
    const { me } = useContext(AuthenticationContext);

    const router = useRouter();

    const student_id = me?.is_student?.student_id;

    const { data, loading, error } = useGetStudent(student_id);

    if (error) return <h1>error</h1>;
    if (loading) return <h1>loading</h1>;

    return (
        <div>
            <div className="flex flex-row justify-between items-end">
                <h1>รายงานผลสหกิจ</h1>
                <Link
                    href={'/student/report/create'}
                    className="px-2 py-1 bg-primary-500 cursor-pointer border border-primary-400 text-white rounded-md text-center"
                >
                    <p> + เพิ่มรายงาน</p>
                </Link>
            </div>
            <Divider />
            <div className="bg-white px-2 py-2">
                <ProgressReportBanner progress_report={data.getStudent.progress_report} student_id={student_id} />
            </div>
        </div>
    );
};

export default CoopReport;
