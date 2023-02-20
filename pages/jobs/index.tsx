import React, { useContext } from 'react';
import { useGetJobs } from '../../features/job/hooks/useGetJobs';
import NotificationService from '../../lib/ant_service/NotificationService';
import MessageService from '../../lib/ant_service/MessageService';
import { AuthenticationContext } from '../../context/AuthContextProvider';
import { RoleOption } from '../../constants/RoleOptions';
import ContentContainer from '@ui/ContentContainer';
import SkeletonLoading from '@ui/SkeletonLoading';
import BreadcrumbComponent from 'components/common/Beardcrumb/Beardcrumb';
import { Link } from '@ui/Link';
import { Dropdown, Menu } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteJob } from 'features/job/hooks/useDeleteJob';

const Jobs: React.FC = () => {
    const { data, loading, error } = useGetJobs();
    const [deleteJob, { data: delete_data, loading: delete_loading, error: delete_error }] = useDeleteJob();
    const message = MessageService.getInstance();
    const { me } = useContext(AuthenticationContext);
    const notification = NotificationService.getInstance();

    if (error) {
        message.error(error.message);
        return (
            <>
                <h1>{error.message}</h1>
            </>
        );
    }

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

    const menu = (id_job: string) => (
        <Menu>
            <Menu.Item key="1" icon={<EditOutlined />} onClick={() => handleDelete(id_job)}>
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
                <h1 className=" text-4xl md:text-5xl font-primary_noto font-semibold">งานที่เปิดรับสมัคร</h1>
                <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
            </div>
            {loading && <SkeletonLoading />}
            {me?.role === RoleOption.COMMITTEE || me?.role === RoleOption.COMPANY ? (
                <div className="w-[100%] flex justify-end">
                    <Link href={'/jobs/new'} intent="primary">
                        + เพิ่มงานที่เปิดรับ
                    </Link>
                </div>
            ) : (
                ''
            )}

            {data &&
                data?.getAllJob.map((job) => (
                    <div
                        key={job.id}
                        className=" w-full h-auto px-6 py-6 grid grid-cols-5  shadow-sm sm:rounded-lg border-solid border-1 border-gray-300 overflow-hidden bg-white font-primary_noto"
                    >
                        <Dropdown overlay={menu(job?.id)} placement="topCenter" trigger={['click']} className="absolute flex justify-self-end">
                            <MoreOutlined />
                        </Dropdown>

                        <div className=" w-full h-full col-span-3 gap-4 grid grid-rows-2">
                            <div className=" w-full h-full grid md:items-center">
                                <h1 className="text-xl font-medium leading-6 text-gray-700">{job.job_title ? job.job_title : 'ไม่ระบุตำแหน่งงาน'}</h1>
                            </div>
                            <div className=" w-full h-full grid xl:grid-cols-2 items-end sm:items-start text-md">
                                <p>ค่าตอบแทน : {job.compensation ? job.compensation.split(', ', 2)[0] + ' บาท/' + job.compensation.split(', ', 2)[1] : '-'}</p>
                                <p className="hidden sm:contents">ระยะเวลาปฏิบัติงาน : {job.internship_period ? job.internship_period : '-'}</p>
                            </div>
                        </div>
                        <div className=" w-full h-full col-span-2 gap-4 grid grid-rows-2 md:items-center border-l-2 pl-4">
                            <div>
                                <h2 className="text-xl font-medium leading-6 text-gray-700">
                                    บริษัท : {job.company_id?.name_eng ? job.company_id.name_eng : 'ไม่ระบุข้อมูล'}
                                </h2>
                            </div>
                            <div className=" grid sm:grid-cols-2">
                                <p className="hidden sm:grid items-end sm:items-start text-md">
                                    ที่อยู่ :{' '}
                                    {job.company_id?.district
                                        ? job.company_id.district + ', ' + (job.company_id?.province ? job.company_id?.province : '')
                                        : ''}
                                </p>
                                <div className="text-right grid items-end">
                                    <Link href={`/jobs/` + job.id} className=" bg-primary-100 text-primary-500 px-4 py-2 rounded-2xl text-sm  cursor-pointer">
                                        {'ดูรายละเอียด'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </ContentContainer>
    );
};

export default Jobs;
