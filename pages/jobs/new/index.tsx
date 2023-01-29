import React, { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { JobInputCommittee, useCreateJobByCommittee, useCreateJobByCompany } from '../../../features/job/hooks/useCreateJob';
import LoadingSpinner from '../../../components/common/Spinner/LoadingSpinner';
import NotificationService from '../../../lib/ant_service/NotificationService';
import Input from '@ui/Input';
import BreadcrumbComponent from 'components/common/Beardcrumb/Beardcrumb';
import { AuthenticationContext } from 'context/AuthContextProvider';
import { RoleOption } from 'constants/RoleOptions';
import { useQueryAccount, useQueryAccounts } from 'features/account/hooks/useQueryAccounts';
import { Select } from 'antd';
import { useGetAllCompany } from 'features/company/hooks/useGetCompanys';
import client from 'lib/apollo/apollo-client';
import Button from '@ui/Button';
import { ErrorMessage } from '@hookform/error-message';

const CreateJobPage: FC = () => {
    const notification = NotificationService.getInstance();
    const [createJobByCommittee, { loading: committee_loading }] = useCreateJobByCommittee();
    const [createJobByCompany, { loading: company_loading }] = useCreateJobByCompany();
    const { data: companies } = useGetAllCompany();
    const [company, setCompany] = useState<string | undefined | null>(null);
    const { me } = useContext(AuthenticationContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<JobInputCommittee>({ mode: 'onChange' });

    function clearForm() {
        reset();
    }

    const selectOnChange = (value) => {
        setCompany(value);
    };

    const onSubmit = async (data) => {
        console.log(data);
        if (me?.role === RoleOption.COMPANY) {
            await createJobByCompany({
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
                    }
                },
                variables: {
                    jobInfo: {
                        job_title: data.job_title,
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
        }
        if (me?.role === RoleOption.COMMITTEE) {
            await createJobByCommittee({
                onCompleted: (result) => {
                    if (result) {
                        notification.success('Success', 'เพิ่มงานเสร็จสิ้น');
                        clearForm();
                        client.clearStore();
                    }
                },
                onError: (error) => {
                    console.log(error);
                    if (error) {
                        notification.error('Error', error.message);
                        client.clearStore();
                    }
                },
                variables: {
                    jobInfo: {
                        job_title: data.job_title,
                        compensation: data.compensation,
                        company_id: company,
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
        }
    };

    const originalArray = companies?.getAllCompanies;
    const object_company_name = originalArray?.map((obj) => {
        return {
            label: obj.name,
            value: obj.id,
        };
    });

    const errorDetail = (name, message) => errors[name] && <div className="ant-form-explain">{message}</div>;

    return (
        <div className=" gap-8 min-h-screen relative overflow-y-auto py-8">
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1 className=" text-4xl md:text-5xl font-primary_noto font-semibold"> เพิ่มงานที่เปิดรับ</h1>
                <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=" bg-white rounded-md px-8 py-8 font-primary_noto">
                <div className="grid gap-y-4 gap-x-8 lg:grid-cols-2 ">
                    {me?.role === RoleOption.COMMITTEE ? (
                        <div className="mb-4">
                            <label className={`block mb-6 text-lg font-medium text-gray-900 `}>สถานประกอบการ</label>
                            <Select
                                {...register('company_id', { required: 'จำเป็นต้องกรอกบริษัท' })}
                                className="text-gray-900 w-full max-h-2 flex items-center"
                                showSearch
                                size="large"
                                // style={{  }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                onChange={selectOnChange}
                                defaultValue={null}
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                                options={object_company_name}
                            />
                            <div className="h-8"></div>
                            {errors && (
                                <ErrorMessage errors={errors} name={'company_id'} render={({ message }) => <p className={'text-red-500'}>{message}</p>} />
                            )}
                            {/* {errors['company_id'] && <div className=" text-red-600">{'จำเป็นต้องกรอกบริษัท'}</div>} */}
                        </div>
                    ) : (
                        ''
                    )}

                    <Input
                        type={'text'}
                        label={'ตำแหน่งงาน'}
                        name={'job_title'}
                        errors={errors}
                        register={register}
                        validationSchema={
                            me?.role === RoleOption.COMPANY
                                ? {
                                      required: 'จำเป็นต้องกรอกตำแหน่งงาน',
                                      maxLength: {
                                          message: 'ข้อมูลมากเกินไป',
                                          value: 100,
                                      },
                                      minLength: {
                                          message: 'ข้อมูลน้อยเกินไป',
                                          value: 5,
                                      },
                                  }
                                : {}
                        }
                        isError={errors.job_title && true}
                    ></Input>
                    <div className="">
                        <Input
                            type={'text'}
                            label={'ชื่อหัวข้อโครงงานสหกิจศึกษา'}
                            name={'project_topic'}
                            errors={errors}
                            register={register}
                            validationSchema={
                                me?.role === RoleOption.COMPANY
                                    ? {
                                          required: 'จำเป็นต้องกรอกชื่อหัวข้อโครงงานสหกิจศึกษา',
                                          maxLength: {
                                              message: 'ข้อมูลมากเกินไป',
                                              value: 100,
                                          },
                                          minLength: {
                                              message: 'ข้อมูลน้อยเกินไป',
                                              value: 5,
                                          },
                                      }
                                    : {}
                            }
                            isError={errors.project_topic && true}
                        ></Input>
                    </div>
                    <div className="">
                        <Input
                            type={'text'}
                            label={'ภาควิชา/หลักสูตรที่รับ'}
                            name={'required_major'}
                            errors={errors}
                            register={register}
                            validationSchema={
                                me?.role === RoleOption.COMPANY
                                    ? {
                                          required: 'จำเป็นต้องกรอกภาควิชา/หลักสูตรที่รับ',
                                          maxLength: {
                                              message: 'ข้อมูลมากเกินไป',
                                              value: 100,
                                          },
                                          minLength: {
                                              message: 'ข้อมูลน้อยเกินไป',
                                              value: 5,
                                          },
                                      }
                                    : {}
                            }
                            isError={errors.required_major && true}
                        ></Input>
                    </div>
                    <div className="">
                        <Input
                            type={'text'}
                            label={'ลักษณะงานที่ต้องปฏิบัติ'}
                            name={'nature_of_work'}
                            errors={errors}
                            register={register}
                            validationSchema={
                                me?.role === RoleOption.COMPANY
                                    ? {
                                          required: 'จำเป็นต้องกรอกลักษณะงานที่ต้องปฏิบัติ',
                                          maxLength: {
                                              message: 'ข้อมูลมากเกินไป',
                                              value: 100,
                                          },
                                          minLength: {
                                              message: 'ข้อมูลน้อยเกินไป',
                                              value: 5,
                                          },
                                      }
                                    : {}
                            }
                            isError={errors.nature_of_work && true}
                        ></Input>
                    </div>
                    <div className="">
                        <Input
                            type={'text'}
                            label={'ทักษะที่นักศึกษาควรมี'}
                            name={'required_skills'}
                            errors={errors}
                            register={register}
                            validationSchema={
                                me?.role === RoleOption.COMPANY
                                    ? {
                                          required: 'จำเป็นต้องกรอกทักษะที่นักศึกษาควรมี',
                                          maxLength: {
                                              message: 'ข้อมูลมากเกินไป',
                                              value: 100,
                                          },
                                          minLength: {
                                              message: 'ข้อมูลน้อยเกินไป',
                                              value: 5,
                                          },
                                      }
                                    : {}
                            }
                            isError={errors.required_skills && true}
                        ></Input>
                    </div>
                    <div className="">
                        <Input
                            type={'text'}
                            label={'สวัสดิการ'}
                            name={'welfare'}
                            errors={errors}
                            register={register}
                            validationSchema={
                                me?.role === RoleOption.COMPANY
                                    ? {
                                          required: 'จำเป็นต้องกรอกสวัสดิการ',
                                          maxLength: {
                                              message: 'ข้อมูลมากเกินไป',
                                              value: 100,
                                          },
                                          minLength: {
                                              message: 'ข้อมูลน้อยเกินไป',
                                              value: 5,
                                          },
                                      }
                                    : {}
                            }
                            isError={errors.welfare && true}
                        ></Input>
                    </div>
                    <div className="">
                        <Input
                            type={'text'}
                            label={'ค่าตอบแทน'}
                            name={'compensation'}
                            errors={errors}
                            register={register}
                            validationSchema={
                                me?.role === RoleOption.COMPANY
                                    ? {
                                          required: 'จำเป็นต้องกรอกค่าตอบแทน',
                                          maxLength: {
                                              message: 'ข้อมูลมากเกินไป',
                                              value: 100,
                                          },
                                          minLength: {
                                              message: 'ข้อมูลน้อยเกินไป',
                                              value: 5,
                                          },
                                      }
                                    : {}
                            }
                            isError={errors.compensation && true}
                        ></Input>
                    </div>
                    <div className="">
                        <Input
                            type={'text'}
                            label={'จำนวนที่รับสมัคร'}
                            name={'limit'}
                            errors={errors}
                            register={register}
                            validationSchema={
                                me?.role === RoleOption.COMPANY
                                    ? {
                                          required: 'จำเป็นต้องกรอกจำนวนที่รับสมัคร',
                                          maxLength: {
                                              message: 'ข้อมูลมากเกินไป',
                                              value: 100,
                                          },
                                          minLength: {
                                              message: 'ข้อมูลน้อยเกินไป',
                                              value: 1,
                                          },
                                      }
                                    : {}
                            }
                            isError={errors.limit && true}
                        ></Input>
                    </div>
                    <div className="">
                        <Input
                            type={'text'}
                            label={'ไฟล์แนบ'}
                            name={'coop301_fileurl'}
                            errors={errors}
                            register={register}
                            validationSchema={
                                me?.role === RoleOption.COMPANY
                                    ? {
                                          required: 'จำเป็นต้องกรอกไฟล์แนบ',
                                          maxLength: {
                                              message: 'ข้อมูลมากเกินไป',
                                              value: 100,
                                          },
                                          minLength: {
                                              message: 'ข้อมูลน้อยเกินไป',
                                              value: 1,
                                          },
                                      }
                                    : {}
                            }
                            isError={errors.coop301_fileurl && true}
                        ></Input>
                    </div>
                </div>
                <div className="flex flex-row w-full justify-end gap-4 ">
                    <Button onClick={clearForm} intent="secondary">
                        ล้างฟอร์ม
                    </Button>
                    <Button type={'submit'} intent="primary">
                        {(!committee_loading || !company_loading) && '+ เพิ่มงานที่เปิดรับ'}
                        {(committee_loading || company_loading) && (
                            <span>
                                <LoadingSpinner />
                                loading...
                            </span>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateJobPage;
