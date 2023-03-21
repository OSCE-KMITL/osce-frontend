import { JobStatus } from '@constants/Job/JobStatus';
import { Tag } from 'antd';
import React from 'react';

export default function ShowTagJobStatus(job_status: string) {
    const job_status_receive = job_status;

    function renderTag(job_status_type: string) {
        switch (job_status_type) {
            case JobStatus.STUDENTAPPLIED:
                return (
                    <Tag className="text-sm font-primary_noto" color="default">
                        รอดำเนินการ
                    </Tag>
                );
            case JobStatus.COMPANYAPPROVE:
                return (
                    <Tag className="text-sm font-primary_noto" color="processing">
                        รอนักศึกษาตอบรับ
                    </Tag>
                );
            case JobStatus.COMPANYCANCEL:
                return (
                    <Tag className="text-sm font-primary_noto" color="error">
                        ปฏิเสธผู้สมัคร
                    </Tag>
                );
            case JobStatus.COMMITTEEAPPROVE:
                return (
                    <Tag className="text-sm font-primary_noto" color="success">
                        กรรมการอนุมัติ
                    </Tag>
                );
            case JobStatus.COMMITTEECANCEL:
                return (
                    <Tag className="text-sm font-primary_noto" color="error">
                        กรรมการปฏิเสธ
                    </Tag>
                );
            case JobStatus.STUDENTACCEPT:
                return (
                    <Tag className="text-sm font-primary_noto" color="success">
                        นักศึกษาตอบรับ
                    </Tag>
                );
            case JobStatus.STUDENTREJECT:
                return (
                    <Tag className="text-sm font-primary_noto" color="error">
                        นักศึกษาปฏิเสธ
                    </Tag>
                );

            default:
                return (
                    <Tag className="text-sm font-primary_noto" color="default">
                        พบข้อผิดพลาด
                    </Tag>
                );
        }
    }
    return <div>{renderTag(job_status_receive)}</div>;
}
