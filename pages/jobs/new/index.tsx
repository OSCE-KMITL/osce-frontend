import React, { FC, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    JobInputCommittee,
    useCreateJobByCommittee,
    useCreateJobByCommitteeNoFile,
    useCreateJobByCompany,
    useCreateJobByCompanyNoFile,
} from '@features/job/hooks/useCreateJob';
import LoadingSpinner from '../../../components/common/Spinner/LoadingSpinner';
import NotificationService from '../../../lib/ant_service/NotificationService';
import Input from '@ui/Input';
import BreadcrumbComponent from 'components/common/Beardcrumb/Beardcrumb';
import { AuthenticationContext } from 'context/AuthContextProvider';
import { RoleOption } from 'constants/RoleOptions';
import { AutoComplete, Checkbox, DatePicker, Divider, message, Radio, RadioChangeEvent, Select } from 'antd';
import { useGetAllCompany } from 'features/company/hooks/useGetCompanys';
import { UploadFileInput, useUploadFile } from 'features/upload/hooks/useUploadFile';
import dayjs from 'dayjs';
import { require_major, welfare_options } from 'constants/Job/jobData';
import { useGetMe } from '@features/auth/hooks/useGetMe';

const CreateJobPage: FC = () => {
    const notification = NotificationService.getInstance();
    const [createJobByCommittee, { loading: committee_loading }] = useCreateJobByCommittee();
    const [createJobByCommitteeNoFile, { loading: committee_no_file_loading }] = useCreateJobByCommitteeNoFile();
    const [createJobByCompany, { loading: company_loading }] = useCreateJobByCompany();
    const [createJobByCompanyNoFile, { loading: company_no_file_loading }] = useCreateJobByCompanyNoFile();
    const [uploadFile, { loading: file_loading }] = useUploadFile();
    const { data: companies } = useGetAllCompany();
    const { me } = useContext(AuthenticationContext);
    const { data: dataGetMe, refetch: refectch_me } = useGetMe();

    const [internshipPeriod, setInternshipPeriod] = useState<string | undefined | null>(null);
    const [requireMajor, setRequireMajor] = useState<string | undefined | null>(null);
    const [selectRequireMajor, setSelectRequireMajor] = useState<string[] | undefined | null>([]);
    const [company, setCompany] = useState<string | undefined | null>(null);
    const [welfareList, setWelfareList] = useState<string[] | undefined | null>([]);
    const [periodWork, setPeriodWork] = useState<string | undefined | null>(null);
    const [dateSelect, setDateSelect] = useState<string[] | undefined | null>(null);
    const [compensationSuffix, setCompensationSuffix] = useState<string | undefined | null>(null);
    const [fileRecive, setFileRecive] = useState<UploadFileInput | null | undefined>(null);
    const [companyPersonObj, setComapnyPersonObj] = useState<undefined | CompanyPersonObj | null>(undefined);
    const [coordinatorPosition, setCoordinatorPosition] = useState<string | undefined | null>(null);
    const [coordinatorName, setCoordinatorName] = useState<string | undefined | null>(null);
    const [coordinatorEmail, setCoordinatorEmail] = useState<string | undefined | null>(null);
    const [coordinatorPhoneNum, setCoordinatorPhoneNum] = useState<string | undefined | null>(null);
    const [supervisorName, setSupervisorName] = useState<string | undefined | null>(null);
    const [supervisorPosition, setSupervisorPosition] = useState<string | undefined | null>(null);
    const [supervisorEmail, setSupervisorEmail] = useState<string | undefined | null>(null);
    const [supervisorPhoneNum, setSupervisorPhoneNum] = useState<string | undefined | null>(null);

    //internship_period radio button
    const internShipPeriodOnChange = (e: RadioChangeEvent) => {
        setInternshipPeriod(e.target.value);
    };

    const selectRequireMajorOnChange = (value: string[]) => {
        setSelectRequireMajor(value);
        setRequireMajor(value.join(', '));
    };

    const originalArray = companies?.getAllCompanies;
    const object_company_name = originalArray?.map((obj) => {
        return {
            label: obj.name_th + ' / ' + obj.name_eng,
            value: obj.id,
        };
    });

    // select company dropdown
    const selectCompanyOnChange = (value) => {
        setCompany(value);
        //set object company_person auto complete
        const find_company_person = object_company_persons?.find((person) => person.company_id === value);
        setComapnyPersonObj(find_company_person);
    };

    const handleCompanypersonOnClick = () => {
        if (me?.role === 'COMPANY') {
            setComapnyPersonObj(() => object_company_persons?.find((person) => person.company_id === me?.is_company?.company_id.id));
        }
    };

    //object all company person
    const object_company_persons = originalArray?.map((obj) => {
        return {
            company_id: obj.id,
            company_person: obj.company_persons,
        };
    });

    useEffect(() => {
        refectch_me();
        if (me?.role === 'COMPANY') {
            setComapnyPersonObj(() => object_company_persons?.find((person) => person.company_id === me?.is_company?.company_id.id));
        }
    }, []),
        [companyPersonObj];

    //object company person after selected company
    const company_person_array = companyPersonObj?.company_person.map((obj) => {
        return {
            name: obj.full_name,
            position: obj.job_title,
            email: obj.email,
            phone_number: obj.phone_number,
        };
    });

    // for dropdown in auto complete
    const company_person_option: PersonOption[] = companyPersonObj?.company_person.map((p) => {
        return {
            value: p.full_name,
        };
    });

    interface PersonOption {
        value: string;
    }
    interface CompanyPersonObj {
        company_id: string;
        company_person: {
            [x: string]: any;
            company_person_id: string;
            full_name: string;
            job_title: string;
            email: string;
            phone_number: string;
            is_coordinator: string;
        };
    }

    // coordinator name
    const coordinatorNameOnSelect = (value) => {
        setCoordinatorName(value);
        const index_person = company_person_array.findIndex((obj) => obj.name === value);
        setCoordinatorPosition(company_person_array[index_person].position);
        setCoordinatorEmail(company_person_array[index_person].email);
        setCoordinatorPhoneNum(company_person_array[index_person].phone_number);
    };
    const coordinatorNameOnChange = (value) => {
        setCoordinatorName(value);
    };

    // supervisor name
    const supervisorNameOnSelect = (value) => {
        setSupervisorName(value);
        const index_person = company_person_array.findIndex((obj) => obj.name === value);
        setSupervisorPosition(company_person_array[index_person].position);
        setSupervisorEmail(company_person_array[index_person].email);
        setSupervisorPhoneNum(company_person_array[index_person].phone_number);
    };
    const supervisorNameOnChange = (value) => {
        setSupervisorName(value);
    };

    // checkbox welfare
    const welfareOnChange = (checkedValues) => {
        setWelfareList(checkedValues);
    };

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<JobInputCommittee>({ mode: 'onChange' });

    function clearForm() {
        setDateSelect(undefined);
        setInternshipPeriod(undefined);
        setRequireMajor(undefined);
        setCompany(undefined);
        setCompensationSuffix(undefined);
        setSelectRequireMajor(undefined);
        setRequireMajor(undefined);
        setFileRecive(undefined);
        setWelfareList(undefined);
        setCoordinatorName(undefined);
        setCoordinatorEmail(undefined);
        setCoordinatorPhoneNum(undefined);
        setCoordinatorPosition(undefined);
        setSupervisorName(undefined);
        setSupervisorPhoneNum(undefined);
        setSupervisorPosition(undefined);
        setSupervisorEmail(undefined);
        reset();
    }

    // date select
    const dateFormat = 'DD/MM/YYYY';
    const { RangePicker } = DatePicker;

    const dateOnChange = (first_array, secon_array) => {
        setDateSelect(secon_array);
        setPeriodWork(secon_array[0] + ' - ' + secon_array[1]);
    };

    // suffix of compensation
    const compensationSuffixOnChange = (e: RadioChangeEvent) => {
        setCompensationSuffix(e.target.value);
    };

    // Graphql Upload file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const file_type = file.name.substr(-3);
        if (file_type != 'pdf') {
            notification.error('Error อัพโหลดไฟล์', 'อัพโหลดไฟล์สกุล .pdf เท่านั้น !!');
            const file_input = document.getElementById('file') as HTMLInputElement;
            file_input.value = null;
            return;
        }
        setFileRecive(file);
    };
    const onSubmit = async (data) => {
        if (me?.role === RoleOption.COMPANY) {
            if (fileRecive) {
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
                            compensation: data.compensation + (compensationSuffix ? ', ' + compensationSuffix : ''),
                            limit: data.limit,
                            nature_of_work: data.nature_of_work,
                            project_topic: data.project_topic,
                            required_major: requireMajor,
                            required_skills: data.required_skills,
                            welfare: welfareList ? (data.other_welfare ? (welfareList.push(data.other_welfare), welfareList.join(', ')) : '') : '',
                            internship_period: internshipPeriod,
                            work_period: periodWork,
                            coordinator_name: coordinatorName,
                            coordinator_email: coordinatorEmail,
                            coordinator_phone_number: coordinatorPhoneNum,
                            coordinator_job_title: coordinatorPosition,
                            supervisor_name: supervisorName,
                            supervisor_email: supervisorEmail,
                            supervisor_phone_number: supervisorPhoneNum,
                            supervisor_job_title: supervisorPosition,
                        },
                        file: fileRecive,
                    },
                });
            } else {
                await createJobByCompanyNoFile({
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
                            compensation: data.compensation + (compensationSuffix ? ', ' + compensationSuffix : ''),
                            limit: data.limit,
                            nature_of_work: data.nature_of_work,
                            project_topic: data.project_topic,
                            required_major: requireMajor,
                            required_skills: data.required_skills,
                            welfare: welfareList ? (data.other_welfare ? (welfareList.push(data.other_welfare), welfareList.join(', ')) : '') : '',
                            internship_period: internshipPeriod,
                            work_period: periodWork,
                            coordinator_name: coordinatorName,
                            coordinator_email: coordinatorEmail,
                            coordinator_phone_number: coordinatorPhoneNum,
                            coordinator_job_title: coordinatorPosition,
                            supervisor_name: supervisorName,
                            supervisor_email: supervisorEmail,
                            supervisor_phone_number: supervisorPhoneNum,
                            supervisor_job_title: supervisorPosition,
                        },
                    },
                });
            }
        }
        if (me?.role === RoleOption.COMMITTEE) {
            if (!company) {
                return message.error('จำเป็นต้องเลือกบริษัท');
            }
            if (fileRecive) {
                await createJobByCommittee({
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
                            compensation: data.compensation + (compensationSuffix ? ', ' + compensationSuffix : ''),
                            company_id: company,
                            limit: data.limit,
                            nature_of_work: data.nature_of_work,
                            project_topic: data.project_topic,
                            required_major: requireMajor,
                            required_skills: data.required_skills,
                            welfare: welfareList ? (welfareList.push(data.other_welfare), welfareList.join(', ')) : '',
                            internship_period: internshipPeriod,
                            work_period: periodWork,
                            coordinator_name: coordinatorName,
                            coordinator_email: coordinatorEmail,
                            coordinator_phone_number: coordinatorPhoneNum,
                            coordinator_job_title: coordinatorPosition,
                            supervisor_name: supervisorName,
                            supervisor_email: supervisorEmail,
                            supervisor_phone_number: supervisorPhoneNum,
                            supervisor_job_title: supervisorPosition,
                        },
                        file: fileRecive,
                    },
                });
            } else {
                await createJobByCommitteeNoFile({
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
                            compensation: data.compensation + (compensationSuffix ? ', ' + compensationSuffix : ''),
                            company_id: company,
                            limit: data.limit,
                            nature_of_work: data.nature_of_work,
                            project_topic: data.project_topic,
                            required_major: requireMajor,
                            required_skills: data.required_skills,
                            welfare: welfareList ? (welfareList.push(data.other_welfare), welfareList.join(', ')) : '',
                            internship_period: internshipPeriod,
                            work_period: periodWork,
                            coordinator_name: coordinatorName,
                            coordinator_email: coordinatorEmail,
                            coordinator_phone_number: coordinatorPhoneNum,
                            coordinator_job_title: coordinatorPosition,
                            supervisor_name: supervisorName,
                            supervisor_email: supervisorEmail,
                            supervisor_phone_number: supervisorPhoneNum,
                            supervisor_job_title: supervisorPosition,
                        },
                    },
                });
            }
        }
    };

    return (
        <div className=" gap-8 min-h-screen relative overflow-y-auto py-8 ">
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1> เพิ่มงานที่เปิดรับ</h1>
                <Divider />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=" rounded-md  font-primary_noto  ">
                <div className="grid grid-rows-1 gap-8 mb-8">
                    <div>
                        <label className={`label-form-head-card `}>รายละเอียดงานที่รับสมัคร</label>
                        <div className="bg-white rounded-xl grid grid-cols-2 px-6 pt-6 gap-x-8">
                            {me?.role === RoleOption.COMMITTEE ? (
                                <div className="mb-2 h-auto col-span-2">
                                    <label className={`block text-[20px] font-medium text-gray-900`}>ชื่อบริษัท*</label>
                                    <Select
                                        className="w-full text-[20px] font-primary_noto"
                                        showSearch
                                        size="large"
                                        placeholder="Search to Select"
                                        optionFilterProp="children"
                                        onChange={selectCompanyOnChange}
                                        value={company}
                                        defaultValue={null}
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={object_company_name}
                                    />
                                    <div className="h-5"></div>
                                </div>
                            ) : (
                                ''
                            )}

                            <div className="col-span-2">
                                <Input
                                    type={'text'}
                                    label={'ชื่อหัวข้อโครงงานสหกิจศึกษา'}
                                    name={'project_topic'}
                                    errors={errors}
                                    register={register}
                                    validationSchema={{}}
                                    isError={errors.project_topic && true}
                                ></Input>
                            </div>
                            <div className="">
                                <Input
                                    type={'text'}
                                    label={'ตำแหน่งงาน*'}
                                    name={'job_title'}
                                    errors={errors}
                                    register={register}
                                    validationSchema={{
                                        required: 'จำเป็นต้องกรอกตำแหน่งงาน',
                                        maxLength: {
                                            message: 'ข้อมูลมากเกินไป',
                                            value: 100,
                                        },
                                        minLength: {
                                            message: 'ข้อมูลน้อยเกินไป',
                                            value: 5,
                                        },
                                    }}
                                ></Input>
                            </div>
                            <div className="mb-2">
                                <label className={`block text-[20px] font-medium text-gray-900`}>หลักสูตรที่รับ*</label>
                                <Select
                                    className={'w-full text-[20px] font-primary_noto'}
                                    mode="multiple"
                                    size="large"
                                    allowClear
                                    placeholder="Please select"
                                    onChange={selectRequireMajorOnChange}
                                    options={require_major}
                                    value={selectRequireMajor}
                                />
                                <div className="h-5"></div>
                            </div>

                            <div className="col-span-2">
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
                                                      value: 1500,
                                                  },
                                                  minLength: {
                                                      message: 'ข้อมูลน้อยเกินไป',
                                                      value: 5,
                                                  },
                                              }
                                            : {}
                                    }
                                ></Input>
                            </div>

                            <div className="col-span-2 ">
                                <Input
                                    type={'text'}
                                    label={'ทักษะที่นักศึกษาควรมี'}
                                    name={'required_skills'}
                                    errors={errors}
                                    register={register}
                                    validationSchema={
                                        me?.role === RoleOption.COMPANY
                                            ? {
                                                  required: 'จำเป็นต้องกรอกลักษณะงานที่ต้องปฏิบัติ',
                                                  maxLength: {
                                                      message: 'ข้อมูลมากเกินไป',
                                                      value: 1500,
                                                  },
                                                  minLength: {
                                                      message: 'ข้อมูลน้อยเกินไป',
                                                      value: 5,
                                                  },
                                              }
                                            : {}
                                    }
                                    // isError={errors.nature_of_work && true}
                                ></Input>
                            </div>
                            <div className="col-span-2">
                                <div className="grid grid-cols-11 gap-x-8">
                                    <div className="mb-2 h-auto col-span-2  relative">
                                        <label className={`block text-[20px] font-medium text-gray-900`}>ระยะเวลาปฏิบัติงาน</label>
                                        <Radio.Group onChange={internShipPeriodOnChange} value={internshipPeriod} className="grid grid-flow-row ">
                                            <Radio className="font-primary_noto text-[16px]" value={'ฝึกงาน (2 เดือน)'}>
                                                ฝึกงาน (2 เดือน)
                                            </Radio>
                                            <Radio className="font-primary_noto text-[16px]" value={'สหกิจศึกษา (4 เดือน)'}>
                                                สหกิจศึกษา (4 เดือน)
                                            </Radio>
                                            <Radio className="font-primary_noto text-[16px]" value={'ฝึกงาน+สหกิจศึกษา (6 เดือน)'}>
                                                ฝึกงาน+สหกิจศึกษา (6 เดือน)
                                            </Radio>
                                        </Radio.Group>
                                        <div className="h-5"></div>
                                    </div>

                                    <div className="w-auto col-span-3 ">
                                        <label className={`block text-[20px] font-medium text-gray-900`}>
                                            ช่วงเวลาปฏิบัติงาน <span>(วันเริ่มต้น - วันสิ้นสุด)</span>
                                        </label>
                                        <RangePicker
                                            className={'py-3 w-full text-[20px] font-primary_noto'}
                                            format={dateFormat}
                                            onChange={dateOnChange}
                                            allowEmpty={[true, true]}
                                            value={
                                                dateSelect
                                                    ? [
                                                          dateSelect[0] ? dayjs(dateSelect[0], dateFormat) : null,
                                                          dateSelect[1] ? dayjs(dateSelect[1], dateFormat) : null,
                                                      ]
                                                    : [null, null]
                                            }
                                            size="large"
                                        />
                                    </div>

                                    <div className="h-auto col-span-2">
                                        <label htmlFor="address" className="block text-[20px] font-medium text-gray-900">
                                            จำนวนที่รับสมัคร
                                        </label>
                                        <input
                                            className="w-full shadow-sm  text-[18px] rounded-lg  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                            id="limit"
                                            type="number"
                                            min={1}
                                            max={20}
                                            name="limit"
                                            {...register('limit')}
                                        />
                                        <div className="h-5">{errors.limit && <p className={'text-red-500'}>จำเป็นต้องกรอกจำนวนที่รับสมัคร</p>}</div>
                                    </div>

                                    <div className="col-span-4 ">
                                        <div className="w-auto h-auto grid grid-cols-2 gap-x-2">
                                            <div className="w-full">
                                                <label htmlFor="address" className="block text-[20px] font-medium text-gray-900">
                                                    ค่าตอบแทน
                                                </label>
                                                <input
                                                    className="w-full shadow-sm  text-[18px] rounded-lg  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                                    id="compensation"
                                                    type="number"
                                                    min={0}
                                                    max={1000000}
                                                    name="compensation"
                                                    {...register('compensation', { required: false })}
                                                />
                                            </div>

                                            <div className="w-full min-w-fit h-auto pt-11 ">
                                                <Radio.Group
                                                    className="flex flex-row flex-wrap "
                                                    onChange={compensationSuffixOnChange}
                                                    value={compensationSuffix}
                                                >
                                                    <Radio className="font-primary_noto text-[16px] " value={'วัน'}>
                                                        ต่อวัน
                                                    </Radio>
                                                    <Radio className="font-primary_noto text-[16px] " value={'เดือน'}>
                                                        ต่อเดือน
                                                    </Radio>
                                                </Radio.Group>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className=" grid grid-cols-11 gap-x-8">
                                    <div className="col-span-5 ">
                                        <label className={`block text-[20px] font-medium text-gray-900 mb-3`}>สวัสดิการที่มี</label>
                                        <div className="flex ">
                                            <Checkbox.Group options={welfare_options} value={welfareList} onChange={welfareOnChange} />
                                        </div>

                                        <div className="h-5"></div>
                                    </div>
                                    <div className="col-span-4">
                                        <Input
                                            type={'text'}
                                            label={'สวัสดิการอื่นๆ (ถ้ามี)'}
                                            name={'other_welfare'}
                                            errors={errors}
                                            register={register}
                                            validationSchema={{}}
                                            isError={errors.welfare && true}
                                        ></Input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <label className={`label-form-head-card `}>ผู้ประสานงาน</label>
                        <div className="bg-white rounded-xl grid grid-cols-2 px-6 pt-6 gap-x-8">
                            <div className="mb-2 h-auto ">
                                <label className={`block text-[20px] font-medium text-gray-900 `}>ชื่อ-นามสกุล</label>
                                <AutoComplete
                                    id="coordinator_name"
                                    className="w-full shadow-sm  text-[18px]"
                                    options={company_person_option}
                                    size="large"
                                    onSelect={coordinatorNameOnSelect}
                                    onChange={coordinatorNameOnChange}
                                    onClick={handleCompanypersonOnClick}
                                    placeholder="นาง พรประภา ชินตะวัน"
                                    filterOption={(inputValue, company_person_option) =>
                                        company_person_option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                                <div className="h-5"></div>
                            </div>

                            <div className="mb-2 h-auto">
                                <label htmlFor="address" className="block text-[20px] font-medium text-gray-900">
                                    ตำแหน่ง
                                </label>
                                <input
                                    className="w-full shadow-sm text-[18px] rounded-lg placeholder:opacity-50  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                    id="coordinator_position"
                                    type="text"
                                    name="coordinator_position"
                                    value={coordinatorPosition}
                                    placeholder="Human resource manager"
                                    onChange={(e) => {
                                        setCoordinatorPosition(e.target.value);
                                    }}
                                />
                                <div className="h-5"></div>
                            </div>

                            <div className="mb-2 h-auto">
                                <label htmlFor="address" className="block text-[20px] font-medium text-gray-900">
                                    อีเมล์
                                </label>
                                <input
                                    className="w-full shadow-sm  text-[18px] rounded-lg placeholder:opacity-50 outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                    id="coordinator_email"
                                    type="text"
                                    name="coordinator_email"
                                    value={coordinatorEmail}
                                    placeholder="pornprapa@company.co.th"
                                    onChange={(e) => {
                                        setCoordinatorEmail(e.target.value);
                                    }}
                                />
                                <div className="h-5"></div>
                            </div>

                            <div className="mb-2 h-auto">
                                <label htmlFor="address" className="block text-[20px] font-medium text-gray-900">
                                    โทรศัพท์
                                </label>
                                <input
                                    className="w-full shadow-sm  text-[18px] rounded-lg placeholder:opacity-50 outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                    id="coordinator_phone"
                                    type="text"
                                    name="coordinator_phone"
                                    placeholder="0812345678"
                                    value={coordinatorPhoneNum}
                                    onChange={(e) => {
                                        setCoordinatorPhoneNum(e.target.value);
                                    }}
                                />
                                <div className="h-5"></div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <label className={`label-form-head-card `}>ผู้นิเทศงาน (หากมีข้อมูลกรุณาให้ข้อมูล)</label>
                        <div className="bg-white rounded-xl grid grid-cols-2 px-6 pt-6 gap-x-8">
                            <div className="mb-2 h-auto">
                                <label className={`block text-[20px] font-medium text-gray-900`}>ชื่อ-นามสกุล</label>
                                <AutoComplete
                                    id="supervisor_name"
                                    className="w-full"
                                    options={company_person_option}
                                    size="large"
                                    onSelect={supervisorNameOnSelect}
                                    onChange={supervisorNameOnChange}
                                    onClick={handleCompanypersonOnClick}
                                    placeholder="นาง เทธิกา จริงกิจจานุกูล"
                                    filterOption={(inputValue, company_person_option) =>
                                        company_person_option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                />
                                <div className="h-5"></div>
                            </div>

                            <div className="mb-2 h-auto">
                                <label htmlFor="address" className="block text-[20px] font-medium text-gray-900">
                                    ตำแหน่ง
                                </label>
                                <input
                                    className="w-full shadow-sm  text-[18px] rounded-lg placeholder:opacity-50 outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                    id="supervisor_position"
                                    type="text"
                                    name="supervisor_position"
                                    placeholder="Project coordinator "
                                    value={supervisorPosition}
                                    onChange={(e) => {
                                        setSupervisorPosition(e.target.value);
                                    }}
                                />
                                <div className="h-5"></div>
                            </div>

                            <div className="mb-2 h-auto">
                                <label htmlFor="address" className="block text-[20px] font-medium text-gray-900">
                                    อีเมล์
                                </label>
                                <input
                                    className="w-full shadow-sm  text-[18px] rounded-lg placeholder:opacity-50 outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                    id="supervisor_email"
                                    type="text"
                                    name="supervisor_email"
                                    placeholder="tawika@company.co.th"
                                    value={supervisorEmail}
                                    onChange={(e) => {
                                        setSupervisorEmail(e.target.value);
                                    }}
                                />
                                <div className="h-5"></div>
                            </div>

                            <div className="mb-2 h-auto">
                                <label htmlFor="address" className="block text-[20px] font-medium text-gray-900">
                                    โทรศัพท์
                                </label>
                                <input
                                    className="w-full shadow-sm  text-[18px] rounded-lg placeholder:opacity-50 outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-primary-300"
                                    id="supervisor_phone"
                                    type="text"
                                    name="supervisor_phone"
                                    value={supervisorPhoneNum}
                                    placeholder="0812345678"
                                    onChange={(e) => {
                                        setSupervisorPhoneNum(e.target.value);
                                    }}
                                />
                                <div className="h-5"></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className={`block mb-2 text-2xl font-medium text-gray-900 `}>เพิ่มเอกสาร (.pdf)</label>
                        <div>
                            <input accept="application/pdf" type="file" onChange={handleFileChange} defaultValue={null} id="file" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row w-full justify-end gap-4   ">
                    <button
                        type="submit"
                        className="px-2 py-2 rounded-md w-40 bg-green-600 h-[60%] border-2 border-solid drop-shadow-md border-gray-300 text-xl text-gray-100"
                    >
                        {(!committee_loading || !company_loading) && 'บันทึก'}
                        {(committee_loading || company_loading) && (
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
