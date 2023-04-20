import React, { FunctionComponent, useContext, useEffect } from 'react';
import { useGetStudent } from '@features/student/hooks/useGetStudent';
import { AuthenticationContext } from '@context/AuthContextProvider';
import { Divider, Radio } from 'antd';
import ProgressReportBanner from '@components/ProgressReport/Banner';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import ProgressReportChoice from '@components/ProgressReport/ProgressReportRadio';
import ProgressReportTextInput from '@components/ProgressReport/ProgressReportTextInput';
import { useProgressReportState } from '@components/ProgressReport/hooks/useCreateProgressReportState';
import { useCreateProgressReport } from '@features/progress_report/hooks/useGetProgressReport';
import invariant from 'ts-invariant';
import log = invariant.log;
import LoadingSpinner from '@components/common/Spinner/LoadingSpinner';
import NotificationService from '@lib/ant_service/NotificationService';
import ProgressReportRadio from '@components/ProgressReport/ProgressReportRadio';
import Link from 'next/link';

interface OwnProps {}

type Props = OwnProps;

const ProgressReportInfo: FunctionComponent<Props> = (props) => {
    const router = useRouter();

    const { data, loading, error } = useGetStudent(router.query.student_id as string);

    if (error) return <h1>error</h1>;
    if (loading) return <h1>loading</h1>;

    const current_progress = data.getStudent.progress_report.length === 0 ? 1 : data.getStudent.progress_report.length + 1;
    const progress_report = data.getStudent.progress_report.filter((progress) => progress.progress_report_id === (router.query.report_id as string))[0];
    return (
        <div>
            <p onClick={() => router.back()} className="flex cursor-pointer flex-row mb-4 items-center gap-1 text-gray-500 ">
                <ArrowSmallLeftIcon className="w-6 h-6" />
                ย้อนกลับ
            </p>
            <div className="flex flex-row items-center gap-x-4">
                <h1>รายงานผลสหกิจ</h1>
                <h1 className="px-4 text-center py-2 bg-white rounded-md text-primary-500">ครั้งที่ : {progress_report.report_no}</h1>
            </div>
            <Divider />
            <div className="flex flex-col gap-y-8 bg-white px-4 py-4 ">
                {progress_report.report_no === 1 && (
                    <div className="flex flex-col gap-y-4 bg-white rounded-md ">
                        <div className="mb-1">
                            <h3 className="text-3xl text-primary-500">ผู้นิเทศงาน (วิศวกรผู้ดูแลนักศึกษา)</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 ">
                            <ProgressReportTextInput value={progress_report.mentor_name} topic={'ชื่อ - นามสกุล'} />
                            <ProgressReportTextInput value={progress_report.mentor_position} topic={'ตำแหน่ง'} />
                            <ProgressReportTextInput topic={'เบอร์โทรศัพท์'} value={progress_report.mentor_tel} />
                            <ProgressReportTextInput topic={'อีเมล'} value={progress_report.mentor_email} />
                        </div>
                    </div>
                )}
                <div>
                    <div className="grid grid-cols-3 gap-4 mb-4 ">
                        <div className="m-1">
                            <h3 className="text-3xl text-primary-500">รายงานผลการปฎิบัติสหกิจ</h3>
                        </div>
                        <div className="grid grid-cols-5 col-span-2  w-full  text-md text-gray-600  font-primary_noto">
                            <p className=" flex items-center justify-center">5 = ดีเยี่ยม</p>
                            <p className=" flex items-center justify-center">4 = ดี</p>
                            <p className=" flex items-center justify-center">3 = พอใช้</p>
                            <p className=" flex items-center justify-center">2 = ต้องปรับปรุง</p>
                            <p className=" flex items-center justify-center">1 = ไม่เป็นที่พอใจ</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5 justify-center  bg-white   rounded-md ">
                        <ProgressReportChoice topic={'1. ความสะดวกในการเดินทาง'} value={progress_report.commute_score.toString()} />
                        <ProgressReportChoice topic={'2. ความสะดวกในการทำงาน'} value={progress_report.work_score.toString()} />
                        <ProgressReportChoice topic={'3. การให้คำแนะนำจากบริษัท'} value={progress_report.advisement_score.toString()} />
                    </div>{' '}
                </div>

                <div className="flex flex-col gap-y-4 bg-white rounded-md ">
                    <div className="mb-1">
                        <h3 className="text-3xl text-primary-500">หน้าที่รับผิดชอบ</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4 ">
                        <ProgressReportTextInput value={progress_report.current_res} topic={'งานที่ได้รับมอบหมายในปัจจุบัน'} />
                        <ProgressReportTextInput value={progress_report.other_suggest} topic={'อื่นๆ '} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressReportInfo;
