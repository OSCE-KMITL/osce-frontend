import { useRouter } from 'next/router';
import ContentContainer from '@ui/ContentContainer';
import SkeletonLoading from '@ui/SkeletonLoading';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import BreadcrumbComponent from 'components/common/Beardcrumb/Beardcrumb';
import { AuthenticationContext } from 'context/AuthContextProvider';
import { RoleOption } from 'constants/RoleOptions';
import Link from 'next/link';
import Button from '@ui/Button';
import { useApplyJob } from 'features/job/hooks/useApplyJob';
import { useGetMe } from '@features/auth/hooks/useGetMe';
import NotificationService from 'lib/ant_service/NotificationService';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useGetJob } from '@features/job/hooks/useGetJobs';
interface OwnProps {}

type Props = OwnProps;
const JobListDetail: FunctionComponent<Props> = () => {
    const router = useRouter();
    const notification = NotificationService.getInstance();
    const { id } = router.query;
    const { data, loading, error, refetch } = useGetJob({ jobId: id as string });
    const { me } = useContext(AuthenticationContext);
    const { data: dataGetMe } = useGetMe();
    const [applyJob, { loading: apply_job_loading }] = useApplyJob();
    const [onApply, setOnApply] = useState(false);

    if (error) {
        return <h1>{error.message || 'พบข้อผิดพลาดบางประการ'}</h1>;
    }
    if (loading) {
        return <SkeletonLoading></SkeletonLoading>;
    }

    const stu_id = dataGetMe?.getMe?.is_student?.student_id;
    const obj_stu_apply = data?.getJobById?.student_apply_job;
    const on_apply = obj_stu_apply?.findIndex((obj) => obj?.student?.student_id === stu_id);
    console.log(on_apply);

    const handleApply = async () => {
        await applyJob({
            variables: {
                applyInfo: { job_id: data?.getJobById?.id },
            },
            onCompleted: (result) => {
                if (result) {
                    notification.success('Success', 'สมัครงานเสร็จสิ้น');
                }
            },
            onError: (error) => {
                console.log(error);
                if (error) {
                    notification.error('Error', error.message);
                }
            },
        });

        await refetch();
    };

    return (
        <ContentContainer>
            <div className="w-[80%] h-fit font-primary_noto">
                <BreadcrumbComponent />
                <h1 className=" text-4xl md:text-5xl font-primary_noto font-semibold"> รายละเอียดงาน</h1>
                <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
            </div>
            {data && (
                <div className="grid grid-cols-8 w-full gap-x-4 font-primary_noto">
                    <div className="col-span-6 overflow-hidden bg-white shadow sm:rounded-lg w-full px-8 border-solid border-2 border-gray-300 ">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-2xl font-medium leading-6 text-gray-900 mb-2">
                                ตำแหน่งงาน : {data.getJobById.job_title ? data.getJobById.job_title : 'ไม่ระบุข้อมูล'}
                            </h3>

                            <p className="mt-1 max-w-2xl text-md text-gray-500">
                                บริษัท : {data.getJobById.company_id ? data.getJobById.company_id.name_th : '-'}
                            </p>
                        </div>
                        <div className="border-t border-gray-200 py-4">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <div className="text-md font-medium text-gray-500">ชื่อหัวข้อโครงงานสหกิจศึกษา</div>
                                    <div className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                                        {data.getJobById.project_topic ? data.getJobById.project_topic : '-'}
                                    </div>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-md font-medium text-gray-500">หลักสูตรที่รับ</dt>
                                    <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                                        {data.getJobById.required_major ? data.getJobById.required_major : '-'}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <div className="text-md font-medium text-gray-500">ระยะเวลาปฏิบัติงาน</div>
                                    <div className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                                        {data.getJobById.internship_period ? data.getJobById.internship_period : '-'}
                                    </div>
                                </div>
                                <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <div className="text-md font-medium text-gray-500">ช่วงเวลาปฏิบัติงาน</div>
                                    <div className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                                        {data.getJobById.work_period ? data.getJobById.work_period : '-'}
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <div className="text-md font-medium text-gray-500">ลักษณะงานที่ต้องปฏิบัติ</div>
                                    <div className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                                        {data.getJobById.required_skills ? data.getJobById.required_skills : '-'}
                                    </div>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-md font-medium text-gray-500">ทักษะที่นักศึกษาควรมี</dt>
                                    <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                                        {data.getJobById.nature_of_work ? data.getJobById.nature_of_work : '-'}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-md font-medium text-gray-500">สวัสดิการ</dt>
                                    <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                                        {data.getJobById.welfare ? data.getJobById.welfare : '-'}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-md font-medium text-gray-500">ค่าตอบแทน</dt>
                                    <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                                        {data.getJobById.compensation
                                            ? data.getJobById.compensation.split(', ', 2)[0] + ' บาท/' + data.getJobById.compensation.split(', ', 2)[1]
                                            : '-'}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-md font-medium text-gray-500">จำนวนที่รับสมัคร</dt>
                                    <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">{data.getJobById.limit ? data.getJobById.limit : '-'}</dd>
                                </div>
                                <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-md font-medium text-gray-500">ผู้นิเทศงาน</dt>
                                    <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                                        {data.getJobById?.supervisor_name ? (
                                            <>
                                                <p>ชื่อ : {data.getJobById.supervisor_name ? data.getJobById.supervisor_name : '-'}</p>
                                                <p>ตำแหน่ง : {data.getJobById.supervisor_job_title ? data.getJobById.supervisor_job_title : '-'}</p>
                                                <p>Email : {data.getJobById.supervisor_email ? data.getJobById.supervisor_email : '-'}</p>
                                                <p>โทรศัพท์ : {data.getJobById.supervisor_phone_number ? data.getJobById.supervisor_phone_number : '-'}</p>
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-md font-medium text-gray-500">ไฟล์แนบ</dt>
                                    {data?.getJobById?.file_upload ? (
                                        data?.getJobById?.file_upload?.map((file) => (
                                            <dd key={file.id} className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-md">
                                                        <div className="flex w-0 flex-1 items-center">
                                                            <span className="ml-2 w-0 flex-1 truncate font-primary_noto text-md">
                                                                {file.original_name ? file.original_name : ''}
                                                            </span>
                                                        </div>
                                                        <div className="ml-4 flex-shrink-0">
                                                            <Link
                                                                target={'_blank'}
                                                                href={file.url}
                                                                className="font-primary_noto text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                {'Download'}
                                                            </Link>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </dd>
                                        ))
                                    ) : (
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">-</dd>
                                    )}
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="col-span-2  flex flex-col gap-y-4">
                        <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full h-fit px-8 border-solid border-2 border-gray-300 ">
                            <div className="py-5">
                                <h3 className="text-2xl font-medium leading-7 text-gray-900 mb-2">
                                    {data.getJobById?.company_id?.name_eng ? data.getJobById?.company_id?.name_eng : '-'}
                                </h3>

                                <p className="mt-1 text-md text-gray-500">
                                    {data.getJobById?.company_id?.business_type ? data.getJobById.company_id.business_type : '-'}
                                </p>
                            </div>
                            <div className=" border-t border-gray-200 text-gray-500 py-5 text-md">
                                <p className="text-xl text-black mb-2">ข้อมูลสถานประกอบการ</p>
                                <p className="mb-1">ที่อยู่ : {data.getJobById?.company_id?.address ? data.getJobById?.company_id?.address : '-'} </p>
                                <p className="mb-1">
                                    แขวง/ตำบล : {data.getJobById?.company_id?.sub_district ? data.getJobById?.company_id?.sub_district : '-'}{' '}
                                </p>
                                <p className="mb-1">เขต/อำเภอ : {data.getJobById?.company_id?.district ? data.getJobById?.company_id?.district : '-'} </p>
                                <p className="mb-1">จังหวัด : {data.getJobById?.company_id?.province ? data.getJobById?.company_id?.province : '-'} </p>
                                <p className="mb-1">
                                    รหัสไปรษณีย์ : {data.getJobById?.company_id?.postal_code ? data.getJobById?.company_id?.postal_code : '-'}{' '}
                                </p>
                                <p className="mb-1">
                                    เว็บไซต์ :{' '}
                                    {data.getJobById?.company_id?.website_url ? (
                                        <Link
                                            rel="noopener noreferrer"
                                            target={'_blank'}
                                            href={'https://' + data.getJobById?.company_id?.website_url}
                                            className="font-primary_noto text-blue-600 hover:text-blue-300"
                                        >
                                            {data.getJobById?.company_id?.website_url}
                                        </Link>
                                    ) : (
                                        '-'
                                    )}{' '}
                                </p>
                                <p className="mb-1">
                                    โทรศัพท์ : {data.getJobById?.company_id?.phone_number ? data.getJobById?.company_id?.phone_number : '-'}{' '}
                                </p>
                            </div>
                            {data.getJobById?.coordinator_name ? (
                                <div className=" border-t border-gray-200 text-gray-500 py-5 text-md">
                                    <p className="text-xl text-black mb-2">ผู้ประสานงาน</p>
                                    <p className="mb-1">ชื่อ : {data.getJobById?.coordinator_name ? data.getJobById?.coordinator_name : '-'} </p>
                                    <p className="mb-1">ตำแหน่ง : {data.getJobById?.coordinator_job_title ? data.getJobById?.coordinator_job_title : '-'} </p>
                                    <p className="mb-1">Email : {data.getJobById?.company_id?.district ? data.getJobById?.coordinator_email : '-'} </p>
                                    <p className="mb-1">
                                        โทรศัพท์ : {data.getJobById?.coordinator_phone_number ? data.getJobById?.coordinator_phone_number : '-'}{' '}
                                    </p>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                        {me?.role === RoleOption.STUDENT ? (
                            <div className="col-span-2 overflow-hidden sm:rounded-lg w-full h-fit ">
                                <div className="flex flex-row w-full justify-center gap-4 p-1 rounded-md ">
                                    {on_apply === -1 ? (
                                        <button
                                            onClick={handleApply}
                                            type={'button'}
                                            className={`${
                                                apply_job_loading ? 'bg-gray-400' : 'bg-orange-400'
                                            } px-2 py-2 rounded-md w-full h-[60%] border-2 border-solid drop-shadow-md border-gray-300 text-xl text-gray-100 hover:bg-orange-300`}
                                        >
                                            {apply_job_loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : 'สมัคร'}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleApply}
                                            type={'button'}
                                            disabled={true}
                                            className="bg-gray-300 px-2 py-2 rounded-md w-full h-[60%] border-2 border-solid drop-shadow-md border-gray-300 text-xl text-gray-200"
                                        >
                                            สมัคร
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            )}
        </ContentContainer>
    );
};

export default JobListDetail;
