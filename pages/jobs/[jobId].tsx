import { Card } from 'antd';
import { useRouter } from 'next/router';
import { useQueryJob } from '../../features/job/hooks/useQueryJobs';
import MessageService from '../../lib/ant_service/MessageService';
import NotificationService from '../../lib/ant_service/NotificationService';

const Job = () => {
    const router = useRouter();
    const { jobId } = router.query;

    const { data, loading, error } = useQueryJob({ jobId: jobId });
    const notification = NotificationService.getInstance();
    const message = MessageService.getInstance();

    if (error) {
        notification.error('Error', error.message);
    }

    if (loading) {
        message.loading('Loading');
    }

    return (
        <div className="mx-auto px-40 flex flex-col mt-8 gap-2">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full px-8 border-solid border-2 border-gray-300 ">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-xl font-medium leading-6 text-gray-900">{data.getJobById.job_title ? data.getJobById.job_title : '-'}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">บริษัท : {data.getJobById.company_id ? data.getJobById.company_id.name : '-'}</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">ชื่อหัวข้อโครงงานสหกิจศึกษา</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {data.getJobById.project_topic ? data.getJobById.project_topic : '-'}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">ภาควิชา/หลักสูตรที่รับ</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {data.getJobById.required_major ? data.getJobById.required_major : '-'}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">ลักษณะงานที่ต้องปฏิบัติ</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {data.getJobById.required_skills ? data.getJobById.required_skills : '-'}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">ทักษะที่นักศึกษาควรมี</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {data.getJobById.nature_of_work ? data.getJobById.nature_of_work : '-'}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">สวัสดิการ</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.getJobById.welfare ? data.getJobById.welfare : '-'}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">ค่าตอบแทน</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {data.getJobById.compensation ? data.getJobById.compensation : '-'}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">จำนวนที่รับสมัคร</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.getJobById.limit ? data.getJobById.limit : '-'}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">ไฟล์แนบ</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                        <div className="flex w-0 flex-1 items-center">
                                            {/* <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" /> */}
                                            <span className="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                        <div className="flex w-0 flex-1 items-center">
                                            {/* <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" /> */}
                                            <span className="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Job;
