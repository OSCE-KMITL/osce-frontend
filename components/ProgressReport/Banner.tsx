import React, { FunctionComponent, useContext, useEffect } from 'react';
import { Divider } from 'antd';
import { ProgressReport } from '@features/progress_report/model';
import { formatDateToThai } from '../../utils/common';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

interface OwnProps {
    progress_report?: ProgressReport[];
    student_id?: string;
}

type Props = OwnProps;

const ProgressReportBanner: FunctionComponent<Props> = ({ progress_report, student_id }) => {
    const router = useRouter();
    if (!progress_report) return <h1>ไม่พบข้อมูลรายงานสหกิจ</h1>;
    const reports = progress_report.map((ele, idx) => {
        return (
            <div onClick={() => router.push(`/student/report/${student_id}/` + ele.progress_report_id)} className="" key={ele.progress_report_id}>
                <div className="flex flex-row justify-between ">
                    <div className="flex flex-row gap-2 items-center  text-primary-500 rounded-md px-2">
                        <p className="font-bold px-2  text-[20px] ">ครั้งที่ {ele.report_no}</p>
                        <p className="text-[15px] text-gray-500"> สร้างเมื่อ : {formatDateToThai(ele.created_at.toString())} </p>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center align-middle">
                        <p className="flex flex-row gap-2 justify-center align-middle items-center px-2 bg-gray-100 py-1 text-gray-600 border-gray-600 border text-center rounded-md cursor-pointer">
                            <ClipboardDocumentIcon className="w-4 h-4" />
                            ดูรายงาน
                        </p>
                    </div>
                </div>
                <Divider />
            </div>
        );
    });
    return <div>{reports}</div>;
};

export default ProgressReportBanner;
