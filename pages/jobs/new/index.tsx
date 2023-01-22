import React, { FC, useEffect, useState } from 'react';
// import BreadcrumbComponent from '../../../components/common/Beardcrumb/Beardcrumb';
import { useForm } from 'react-hook-form';
// import { ErrorMessage } from '@hookform/error-message';
import { JobInput, useCreateJob } from '../../../features/job/hooks/useCreateJob';
// import { NotificationType } from '../../auth/login';
import LoadingSpinner from '../../../components/common/Spinner/LoadingSpinner';
import NotificationService from '../../../lib/ant_service/NotificationService';
import Input from '@ui/Input';
// import Button from '@ui/Button';

const CreateJobPage: FC = () => {
    const notification = NotificationService.getInstance();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<JobInput>({ mode: 'onChange' });
    const [createJob, { loading }] = useCreateJob();

    function clearForm() {
        reset();
    }

    const onSubmit = async (data) => {
        console.log(data);
        await createJob({
            onCompleted: (result) => {
                if (result) {
                    notification.success('Success', 'เพิ่มงานเสร็จสิ้น');
                    clearForm();
                }
            },
            onError: (error) => {
                console.log(error);
                if (error) {
                    notification.error('Error', error.message);
                    // clearForm();
                }
            },
            variables: {
                jobInfo: {
                    job_title: data.job_title,
                    company_id: data.company_id,
                    compensation: data.compensation,
                    coop301_fileurl: data.coop301_fileurl,
                    limit: data.limit,
                    nature_of_work: data.nature_of_work,
                    project_topic: data.project_topic,
                    required_major: data.required_major,
                    required_skills: data.required_skills,
                    welfare: data.welfare,
                },
            },
        });
    };

    return (
        <div className="flex flex-col items-start gap-8 w-full min-h-full max-h-full  relative overflow-y-auto py-8">
            <div className="w-[80%] h-fit">
                {/* <BreadcrumbComponent /> */}
                <h1 className=" text-4xl md:text-5xl font-primary_noto font-semibold"> เพิ่มงานที่เปิดรับ</h1>
                <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white h-auto min-h-screen gap-6 rounded-md px-8 py-8 font-primary_noto">
                <div className="mb-6">
                    <Input
                        type={'text'}
                        label={'ตำแหน่งงาน'}
                        name={'job_title'}
                        errors={errors}
                        register={register}
                        validationSchema={{
                            required: 'กรอกด้วยนะฮัลโหลล',
                            maxLength: {
                                message: 'ข้อมูลมากเกินไป',
                                value: 100,
                            },
                            minLength: {
                                message: 'ข้อมูลน้อยเกินไป',
                                value: 5,
                            },
                        }}
                        isError={errors.job_title && true}
                    ></Input>
                    <label htmlFor="email" className={`block mb-2 text-lg font-medium $text-gray-900 `}>
                        ตำแหน่งงาน 555
                    </label>
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className={`block mb-2 text-lg font-medium $text-gray-900 `}>
                        ชื่อหัวข้อโครงงานสหกิจศึกษา
                    </label>
                    <input
                        type="text"
                        id="project_topic"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 outline-0 block w-full p-2.5 "
                        placeholder=""
                        {...register('project_topic', {
                            required: 'จำเป็นต้องกรอกชื่อหัวข้อโครงงานสหกิจศึกษา',
                            minLength: {
                                message: 'ข้อมูลน้อยเกินไป',
                                value: 5,
                            },
                            maxLength: {
                                message: 'ข้อมูลมากเกินไป',
                                value: 150,
                            },
                        })}
                    />
                    {/* <ErrorMessage errors={errors} name={'title'} render={({ message }) => <p className={'text-red-500'}>{message}</p>} /> */}
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className={`block mb-2 text-lg font-medium $text-gray-900 `}>
                        ภาควิชา/หลักสูตรที่รับ
                    </label>
                    <input
                        type="text"
                        id="required_major"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 outline-0 block w-full p-2.5 "
                        placeholder=""
                        {...register('required_major', {
                            required: 'จำเป็นต้องกรอกภาควิชา/หลักสูตรที่รับ',
                            minLength: {
                                message: 'ข้อมูลน้อยเกินไป',
                                value: 5,
                            },
                            maxLength: {
                                message: 'ข้อมูลมากเกินไป',
                                value: 150,
                            },
                        })}
                    />
                    {/* <ErrorMessage errors={errors} name={'title'} render={({ message }) => <p className={'text-red-500'}>{message}</p>} /> */}
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className={`block mb-2 text-lg font-medium $text-gray-900 `}>
                        ลักษณะงานที่ต้องปฏิบัติ
                    </label>
                    <input
                        type="text"
                        id="nature_of_work"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 outline-0 block w-full p-2.5 "
                        placeholder=""
                        {...register('nature_of_work', {
                            required: 'จำเป็นต้องกรอกลักษณะงานที่ต้องปฏิบัติ',
                            minLength: {
                                message: 'ข้อมูลน้อยเกินไป',
                                value: 5,
                            },
                            maxLength: {
                                message: 'ข้อมูลมากเกินไป',
                                value: 150,
                            },
                        })}
                    />
                    {/* <ErrorMessage errors={errors} name={'title'} render={({ message }) => <p className={'text-red-500'}>{message}</p>} /> */}
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className={`block mb-2 text-lg font-medium $text-gray-900 `}>
                        ทักษะที่นักศึกษาควรมี
                    </label>
                    <input
                        type="text"
                        id="required_skills"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 outline-0 block w-full p-2.5 "
                        placeholder=""
                        {...register('required_skills', {
                            required: 'จำเป็นต้องกรอกทักษะที่นักศึกษาควรมี',
                            minLength: {
                                message: 'ข้อมูลน้อยเกินไป',
                                value: 5,
                            },
                            maxLength: {
                                message: 'ข้อมูลมากเกินไป',
                                value: 150,
                            },
                        })}
                    />
                    {/* <ErrorMessage errors={errors} name={'title'} render={({ message }) => <p className={'text-red-500'}>{message}</p>} /> */}
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className={`block mb-2 text-lg font-medium $text-gray-900 `}>
                        สวัสดิการ
                    </label>
                    <input
                        type="text"
                        id="welfare"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 outline-0 block w-full p-2.5 "
                        placeholder=""
                        {...register('welfare', {
                            required: 'จำเป็นต้องกรอกสวัสดิการ',
                            minLength: {
                                message: 'ข้อมูลน้อยเกินไป',
                                value: 5,
                            },
                            maxLength: {
                                message: 'ข้อมูลมากเกินไป',
                                value: 150,
                            },
                        })}
                    />
                    {/* <ErrorMessage errors={errors} name={'title'} render={({ message }) => <p className={'text-red-500'}>{message}</p>} /> */}
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className={`block mb-2 text-lg font-medium $text-gray-900 `}>
                        ค่าตอบแทน
                    </label>
                    <input
                        type="text"
                        id="compensation"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 outline-0 block w-full p-2.5 "
                        placeholder=""
                        {...register('compensation', {
                            required: 'จำเป็นต้องกรอกค่าตอบแทน',
                            minLength: {
                                message: 'ข้อมูลน้อยเกินไป',
                                value: 2,
                            },
                            maxLength: {
                                message: 'ข้อมูลมากเกินไป',
                                value: 150,
                            },
                        })}
                    />
                    {/* <ErrorMessage errors={errors} name={'title'} render={({ message }) => <p className={'text-red-500'}>{message}</p>} /> */}
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className={`block mb-2 text-lg font-medium $text-gray-900 `}>
                        จำนวนที่รับสมัคร
                    </label>
                    <input
                        type="text"
                        id="limit"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 outline-0 block w-full p-2.5 "
                        placeholder=""
                        {...register('limit', {
                            required: 'จำเป็นต้องกรอกจำนวนที่รับสมัคร',
                            minLength: {
                                message: 'ข้อมูลน้อยเกินไป',
                                value: 1,
                            },
                            maxLength: {
                                message: 'ข้อมูลมากเกินไป',
                                value: 5,
                            },
                        })}
                    />
                    {/* <ErrorMessage errors={errors} name={'title'} render={({ message }) => <p className={'text-red-500'}>{message}</p>} /> */}
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className={`block mb-2 text-lg font-medium $text-gray-900 `}>
                        ไฟล์แนบ
                    </label>
                    <input
                        type="text"
                        id="coop301_fileurl"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 outline-0 block w-full p-2.5 "
                        placeholder=""
                        {...register('coop301_fileurl', {
                            required: 'จำเป็นต้องกรอกไฟล์แนบ',
                            minLength: {
                                message: 'ข้อมูลน้อยเกินไป',
                                value: 1,
                            },
                            maxLength: {
                                message: 'ข้อมูลมากเกินไป',
                                value: 150,
                            },
                        })}
                    />
                    {/* <ErrorMessage errors={errors} name={'title'} render={({ message }) => <p className={'text-red-500'}>{message}</p>} /> */}
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className={`block mb-2 text-lg font-medium $text-gray-900 `}>
                        company_id
                    </label>
                    <input
                        type="text"
                        id="company_id"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 outline-0 block w-full p-2.5 "
                        placeholder=""
                        {...register('company_id', {
                            required: 'จำเป็นต้องกรอก company_id',
                            minLength: {
                                message: 'ข้อมูลน้อยเกินไป',
                                value: 1,
                            },
                            maxLength: {
                                message: 'ข้อมูลมากเกินไป',
                                value: 150,
                            },
                        })}
                    />
                    {/* <ErrorMessage errors={errors} name={'title'} render={({ message }) => <p className={'text-red-500'}>{message}</p>} /> */}
                </div>
                <div className="flex flex-row w-full justify-end gap-4 ">
                    {/* <Button onClick={clearForm} intent="secondary">
                        ล้างฟอร์ม
                    </Button> */}
                    <button type={'submit'} className=" bg-sky-500 hover:bg-sky-400 w-40 py-2 px-2 rounded-md font-sm text-[#ffff] text-center mt-8 ">
                        {!loading && '+ สร้างประกาศไหม่'}
                        {loading && (
                            <span>
                                <LoadingSpinner />
                                loading...
                            </span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateJobPage;
