import ContentContainer from '@ui/ContentContainer';
import { Link } from '@ui/Link';
import SkeletonLoading from '@ui/SkeletonLoading';
import { Dropdown, Menu, Space, Tag } from 'antd';
import BreadcrumbComponent from 'components/common/Beardcrumb/Beardcrumb';
import { RoleOption } from 'constants/RoleOptions';
import { AuthenticationContext } from 'context/AuthContextProvider';
import { useGetMe } from '@features/auth/hooks/useGetMe';
import React, { useContext } from 'react';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteJob } from 'features/job/hooks/useDeleteJob';
import NotificationService from 'lib/ant_service/NotificationService';
import { useRouter } from 'next/router';

export default function Myjob() {
    const { data, loading, error } = useGetMe();
    const { me } = useContext(AuthenticationContext);
    const [deleteJob, { data: delete_data, loading: delete_loading, error: delete_error }] = useDeleteJob();
    const notification = NotificationService.getInstance();
    const router = useRouter();
    console.log('job data'+data?.getMe.is_company)
    const handleDelete = (id: string) => {
        console.log('delete id:', id);

        if (id) {
            deleteJob({
                onCompleted: (result) => {
                    if (result) {
                        notification.success('Success', 'ลบงานเสร็จสิ้น');
                    }
                },
                onError: (error) => {
                    if (error) {
                        notification.error('Error', error.message);
                    }
                },
                variables: { jobId: id },
            });
        }
    };

    const handleEdit = (id: string) => {
        if (id) {
            router.push(`/jobs/update/${id}`);
        }
    };

    const menu = (id_job: string) => (
        <Menu>
            <Menu.Item key="1" icon={<EditOutlined />} onClick={() => handleEdit(id_job)}>
                แก้ไข
            </Menu.Item>
            <Menu.Item key="1" icon={<DeleteOutlined />} danger={true} onClick={() => handleDelete(id_job)}>
                ลบ
            </Menu.Item>
        </Menu>
    );

    return (
        <ContentContainer>
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1 className=" text-4xl md:text-5xl font-primary_noto font-semibold">งานที่เปิดรับ</h1>
                <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
            </div>
            {loading && <SkeletonLoading />}
            {me?.role === RoleOption.COMMITTEE || me?.role === RoleOption.COMPANY ? (
                <div className="w-[80%] flex justify-end">
                    <Link href={'/jobs/new'} intent="primary">
                        + เพิ่มงานที่เปิดรับ
                    </Link>
                </div>
            ) : (
                ''
            )}
            {data ? (
                data?.getMe?.is_company?.company_id?.job?.map((job) => (
                    <div
                        key={job.id}
                        className=" w-[80%] h-auto p-4 grid grid-cols-12  shadow-sm sm:rounded-lg border-solid border-1 border-gray-300 overflow-hidden bg-white font-primary_noto"
                    >
                        <Dropdown overlay={menu(job?.id)} placement="topCenter" trigger={['click']} className="absolute flex justify-self-end">
                            <MoreOutlined />
                        </Dropdown>
                        <div className=" w-full col-span-8 gap-4 grid grid-rows-1 h-16 ">
                            <div className="flex flex-row">
                                <Space size={[0, 8]} wrap className=" align-middle items-center">
                                    <Tag color="processing">เปิดรับสมัคร</Tag>
                                </Space>
                                <div className=" w-full h-full grid items-center justify-end  pr-4">
                                    <h1 className="text-sm font-medium leading-6 text-gray-700"> {job.created_at ? job.created_at.slice(0, 10) : ''}</h1>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-full align-top items-center   ">
                                <div className=" w-full h-full grid items-center">
                                    <h1 className="text-xl font-medium leading-6 text-gray-700">{job.job_title ? job.job_title : 'ไม่ระบุตำแหน่งงาน'}</h1>
                                </div>
                                <div className=" w-full h-full grid items-center justify-end  pr-4">
                                    <h1 className="text-md font-medium leading-6 text-gray-700">
                                        {'ระยะเวลาปฏิบัติงาน : '}
                                        {job.internship_period ? job.internship_period : 'ไม่ระบุข้อมูล'}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full h-full col-span-4 gap-4 grid grid-rows-1 border-l-2 pl-4">
                            <div className=" flex justify-end gap-x-4 items-end">
                                <div className="text-right items-end">
                                    <Link href={`myjob/` + job.id} className="bg-blue-100 text-blue-500 px-4 py-2 rounded-2xl text-sm  cursor-pointer">
                                        {'รายชื่อผู้สมัคร'}
                                    </Link>
                                </div>
                                <div className="text-right items-end">
                                    <Link href={`/jobs/` + job.id} className=" bg-primary-100 text-primary-500 px-4 py-2 rounded-2xl text-sm  cursor-pointer">
                                        {'ดูรายละเอียด'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className=" w-full h-full font-primary_noto text-4xl text-gray-400">
                    <h1 className="">ไม่พบงานที่สมัคร !</h1>
                </div>
            )}
        </ContentContainer>
    );
}
