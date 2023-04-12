import React, { FunctionComponent, useContext, useEffect } from 'react';
import { useGetStudent } from '@features/student/hooks/useGetStudent';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { Divider } from 'antd';
import ProgressReportBanner from '@components/ProgressReport/Banner';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

interface OwnProps {}

type Props = OwnProps;

const CreateCoopReport: FunctionComponent<Props> = (props) => {
    const { me } = useContext(AuthenticationContext);

    const router = useRouter();

    const student_id = me?.is_student?.student_id;

    const { data, loading, error } = useGetStudent(student_id);

    if (error) return <h1>error</h1>;
    if (loading) return <h1>loading</h1>;

    const current_progress = data.getStudent.progress_report.length === 0 ? 1 : data.getStudent.progress_report.length + 1;

    return (
        <div>
            <p onClick={() => router.back()} className="flex cursor-pointer flex-row items-center gap-1 text-gray-500 mb-2">
                <ArrowSmallLeftIcon className="w-6 h-6" />
                ย้อนกลับ
            </p>
            <div>
                <h1>
                    สร้างรายงานสหกิจ <span className="bg-white px-2 py-1 text-primary-500 rounded-md ">ครั้งที่ {current_progress}</span>
                </h1>
                <Divider />
            </div>
            <div></div>
        </div>
    );
};

export default CreateCoopReport;
