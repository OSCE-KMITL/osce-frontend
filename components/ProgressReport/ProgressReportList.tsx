import React, { FunctionComponent, useContext, useEffect } from 'react';
import { useGetStudent } from '@features/student/hooks/useGetStudent';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { Divider } from 'antd';
import ProgressReportBanner from '@components/ProgressReport/Banner';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface OwnProps {
    student_id?: string;
}

type Props = OwnProps;

const ProgressReportList: FunctionComponent<Props> = ({ student_id }) => {
    const { me } = useContext(AuthenticationContext);

    const router = useRouter();

    // const student_id = me?.is_student?.student_id;

    const { data, loading, error } = useGetStudent(student_id);

    if (!student_id) {
        return <p>Student id not found</p>;
    }

    if (error) return <h1>{error.message}</h1>;
    if (loading) return <h1>loading</h1>;

    return (
        <div>
            <div className="flex flex-row justify-between items-end">
                <div className="flex flex-col justify-center  items-start gap-4">
                    {' '}
                    <h1>รายงานผลสหกิจ</h1>
                    <div className="flex flex-row gap-x-4">
                        <p className="px-4 py-2 rounded-lg text-[20px] bg-white shadow-sm text-primary-500 font-semibold ">{data.getStudent.student_id}</p>
                        <p className="px-4 py-2 rounded-lg text-[20px] bg-white shadow-sm text-primary-500 font-semibold ">
                            {data.getStudent.name_prefix + ' ' + data.getStudent.name_th + ' ' + data.getStudent.lastname_th}
                        </p>{' '}
                        <p className="px-4 py-2 rounded-lg text-[20px] bg-white shadow-sm text-primary-500 font-semibold ">
                            บริษัท : {data.getStudent.job ? data.getStudent.job.company_id.name_th : '-'}
                        </p>{' '}
                        <p className="px-4 py-2 rounded-lg text-[20px] bg-white shadow-sm text-primary-500 font-semibold ">
                            ตำแหน่ง : {data.getStudent.job ? data.getStudent.job.job_title : '-'}
                        </p>
                    </div>
                </div>
                {me?.is_student && (
                    <Link
                        href={'/student/report/create'}
                        className="px-2 py-1 bg-primary-500 cursor-pointer border border-primary-400 text-white rounded-md text-center hover:text-gray-300"
                    >
                        <p> + เพิ่มรายงาน</p>
                    </Link>
                )}
            </div>
            <Divider />
            <div className="bg-white px-2 pt-6 pb-1 rounded-2xl">
                <ProgressReportBanner progress_report={data.getStudent.progress_report} student_id={student_id} />
            </div>
        </div>
    );
};

export default ProgressReportList;
