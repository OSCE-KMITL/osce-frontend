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

interface OwnProps {}

type Props = OwnProps;

const CreateCoopReport: FunctionComponent<Props> = (props) => {
    const { me } = useContext(AuthenticationContext);
    const [createReport, { loading: submit_loading }] = useCreateProgressReport();

    const router = useRouter();

    const student_id = me?.is_student?.student_id;

    const { data, loading, error } = useGetStudent(student_id);
    const {
        progressReportPayload,
        setProgressReportPayload,
        setAdvisorScore,
        setCommuteScore,
        setCurrentRes,
        setMentorName,
        setMentorPosition,
        setOtherSuggestion,
        setWorkScore,
        setMentorEmail,
        setMentorTel,
        reset,
    } = useProgressReportState();

    if (error) return <h1>error</h1>;
    if (loading) return <h1>loading</h1>;

    async function handleSubmit() {
        try {
            await createReport({
                variables: { payload: { ...progressReportPayload } },
                onError: (error) => {
                    console.log(error);
                    NotificationService.getInstance().error('พบข้อผิดพลาด', error.message);
                },
                onCompleted: () => {
                    NotificationService.getInstance().success('พบข้อผิดพลาด', 'เพิ่มรายงานเรียบร้อยแล้ว');
                    router.push('/student/report/');
                    reset();
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    const current_progress = data.getStudent.progress_report.length === 0 ? 1 : data.getStudent.progress_report.length + 1;

    return (
        <div>
            <p onClick={() => router.back()} className="flex cursor-pointer flex-row mb-4 items-center gap-1 text-gray-500 ">
                <ArrowSmallLeftIcon className="w-6 h-6" />
                ย้อนกลับ
            </p>
            <div>
                <h1>
                    สร้างรายงานสหกิจ <span className="bg-white px-2 py-1 text-primary-500 rounded-md ">ครั้งที่ {current_progress}</span>
                </h1>
                <Divider />
                {/* Start here !!*/}
                <div className="flex flex-col gap-y-8 bg-white px-4 py-4 ">
                    {current_progress === 1 && (
                        <div className="flex flex-col gap-y-4 bg-white rounded-md ">
                            <div className="mb-1">
                                <h3 className="text-3xl text-primary-500">ผู้นิเทศงาน (วิศวกรผู้ดูแลนักศึกษา)</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4 ">
                                <ProgressReportTextInput handleChange={setMentorName} topic={'ชื่อ - นามสกุล'} />
                                <ProgressReportTextInput handleChange={setMentorPosition} topic={'ตำแหน่ง'} />
                                <ProgressReportTextInput topic={'เบอร์โทรศัพท์'} handleChange={setMentorTel} />
                                <ProgressReportTextInput topic={'อีเมล'} handleChange={setMentorEmail} />
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
                            <ProgressReportChoice topic={'1. ความสะดวกในการเดินทาง'} handleChange={setCommuteScore} />
                            <ProgressReportChoice topic={'2. ความสะดวกในการทำงาน'} handleChange={setWorkScore} />
                            <ProgressReportChoice topic={'3. การให้คำแนะนำจากบริษัท'} handleChange={setAdvisorScore} />
                        </div>{' '}
                    </div>
                    <div className="flex flex-col gap-y-4 bg-white rounded-md ">
                        <div className="mb-1">
                            <h3 className="text-3xl text-primary-500">หน้าที่รับผิดชอบ</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4 ">
                            <ProgressReportTextInput handleChange={setCurrentRes} topic={'งานที่ได้รับมอบหมายในปัจจุบัน'} />
                            <ProgressReportTextInput handleChange={setOtherSuggestion} topic={'อื่นๆ '} />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div></div>
                        {submit_loading ? (
                            <LoadingSpinner />
                        ) : (
                            <div
                                onClick={handleSubmit}
                                className="px-4 py-2 text-[20px] rounded-md bg-primary-500 text-white cursor-pointer hover:bg-primary-600"
                            >
                                {' '}
                                ส่งรายงาน
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default CreateCoopReport;
