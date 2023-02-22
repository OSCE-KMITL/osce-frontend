import { AutoComplete, Checkbox, DatePicker, Radio, RadioChangeEvent, Select } from 'antd';
import BreadcrumbComponent from 'components/common/Beardcrumb/Beardcrumb';
import LoadingSpinner from 'components/common/Spinner/LoadingSpinner';
import { require_major, welfare_options } from 'constants/Job/jobData';
import { RoleOption } from 'constants/RoleOptions';
import { AuthenticationContext } from 'context/AuthContextProvider';
import dayjs from 'dayjs';
import { JobInputCommittee } from 'features/job/hooks/useCreateJob';
import { useGetJob } from 'features/job/hooks/useGetJobs';
import { useUpdateJob } from 'features/job/hooks/useUpdateJob';
import NotificationService from 'lib/ant_service/NotificationService';
import client from 'lib/apollo/apollo-client';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Update() {
    const router = useRouter();
    const { id } = router.query;
    const notification = NotificationService.getInstance();
    const { me } = useContext(AuthenticationContext);
    const { data, loading, error, refetch } = useGetJob({ jobId: id as string });
    const [updateJob, { loading: update_job_loading }] = useUpdateJob();

    const [selectRequireMajor, setSelectRequireMajor] = useState<string[] | undefined | null>([]);
    const [requireMajor, setRequireMajor] = useState<string | undefined | null>(null);
    const [internshipPeriod, setInternshipPeriod] = useState<string | undefined | null>(null);
    const [dateSelect, setDateSelect] = useState<string[] | undefined | null>(null);
    const [periodWork, setPeriodWork] = useState<string | undefined | null>(null);
    const [compensationSuffix, setCompensationSuffix] = useState<string | undefined | null>(null);
    const [welfareList, setWelfareList] = useState<string[] | undefined | null>([]);
    const [otherWelfare, setOtherWelfare] = useState<string | undefined | null>(null);
    const [coordinatorPosition, setCoordinatorPosition] = useState<string | undefined | null>(null);
    const [coordinatorName, setCoordinatorName] = useState<string | undefined | null>(null);
    const [coordinatorEmail, setCoordinatorEmail] = useState<string | undefined | null>(null);
    const [coordinatorPhoneNum, setCoordinatorPhoneNum] = useState<string | undefined | null>(null);
    const [companyPersonObj, setComapnyPersonObj] = useState<undefined | CompanyPersonObj[] | null>(undefined);
    const [supervisorName, setSupervisorName] = useState<string | undefined | null>(null);
    const [supervisorPosition, setSupervisorPosition] = useState<string | undefined | null>(null);
    const [supervisorEmail, setSupervisorEmail] = useState<string | undefined | null>(null);
    const [supervisorPhoneNum, setSupervisorPhoneNum] = useState<string | undefined | null>(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<JobInputCommittee>({ mode: 'onChange' });

    const selectRequireMajorOnChange = (value: string[]) => {
        setSelectRequireMajor(value);
        setRequireMajor(value.join(', '));
    };

    useEffect(() => {
        const require_major = data?.getJobById?.required_major;
        const require_major_array = require_major?.split(',');
        const internship_period = data?.getJobById?.internship_period;
        const work_period = data?.getJobById?.work_period ? data?.getJobById?.work_period : '';
        const compensation_suffix = data?.getJobById?.compensation ? data?.getJobById?.compensation.split(',')[1] : '';
        const welfare = data?.getJobById?.welfare ? data?.getJobById?.welfare.split(', ') : [''];
        const welfare_ckeck_box = ['ที่พัก', 'รถรับส่ง', 'ชุดทำงาน', 'อาหารกลางวัน', 'ค่าเดินทาง'];
        const companyPersons = data?.getJobById?.company_id?.company_persons ? data?.getJobById?.company_id?.company_persons : undefined;
        setRequireMajor(require_major);
        setSelectRequireMajor(require_major_array);
        setInternshipPeriod(internship_period);
        setPeriodWork(work_period);
        setDateSelect([work_period.split('-')[0], work_period.split('-')[1]]);
        setCompensationSuffix(compensation_suffix ? compensation_suffix?.trim() : '');
        setWelfareList(welfare ? welfare : ['']);
        if (!welfare_ckeck_box.includes(welfare[welfare.length - 1])) {
            setOtherWelfare(welfare[welfare.length - 1]);
            setWelfareList(welfare.slice(0, -1));
        }
        setComapnyPersonObj(companyPersons);
        setCoordinatorName(data?.getJobById?.coordinator_name ? data?.getJobById?.coordinator_name : '');
        setCoordinatorEmail(data?.getJobById?.coordinator_email ? data?.getJobById?.coordinator_email : '');
        setCoordinatorPhoneNum(data?.getJobById?.coordinator_phone_number ? data?.getJobById?.coordinator_phone_number : '');
        setCoordinatorPosition(data?.getJobById?.coordinator_job_title ? data?.getJobById?.coordinator_job_title : '');
        setSupervisorName(data?.getJobById?.supervisor_name ? data?.getJobById?.supervisor_name : '');
        setSupervisorEmail(data?.getJobById?.supervisor_email ? data?.getJobById?.supervisor_email : '');
        setSupervisorPhoneNum(data?.getJobById?.supervisor_phone_number ? data?.getJobById?.supervisor_phone_number : '');
        setSupervisorPosition(data?.getJobById?.supervisor_job_title ? data?.getJobById?.supervisor_job_title : '');
    }, [data]); // Pass 'count' as a dependency to useEffect.

    const internShipPeriodOnChange = (e: RadioChangeEvent) => {
        setInternshipPeriod(e.target.value);
    };

    // date select
    const dateFormat = 'DD/MM/YYYY';
    const { RangePicker } = DatePicker;

    const dateOnChange = (first_array, secon_array) => {
        setDateSelect(secon_array);
        setPeriodWork(secon_array[0] + ' - ' + secon_array[1]);
    };

    const compensationSuffixOnChange = (e: RadioChangeEvent) => {
        setCompensationSuffix(e.target.value);
    };

    // checkbox welfare
    const welfareOnChange = (checkedValues) => {
        setWelfareList(checkedValues);
    };

    // for dropdown in auto complete
    const company_person_option: PersonOption[] = companyPersonObj?.map((p) => {
        return {
            value: p.full_name,
        };
    });

    interface PersonOption {
        value: string;
    }

    interface CompanyPersonObj {
        company_person_id: string;
        full_name: string;
        job_title: string;
        email: string;
        phone_number: string;
        is_coordinator: string;
    }

    // coordinator name
    const coordinatorNameOnSelect = (value) => {
        setCoordinatorName(value);
        const index_person = companyPersonObj.findIndex((obj) => obj.full_name === value);
        setCoordinatorPosition(companyPersonObj[index_person].job_title);
        setCoordinatorEmail(companyPersonObj[index_person].email);
        setCoordinatorPhoneNum(companyPersonObj[index_person].phone_number);
    };
    const coordinatorNameOnChange = (value) => {
        setCoordinatorName(value);
    };

    // supervisor name
    const supervisorNameOnSelect = (value) => {
        setSupervisorName(value);
        const index_person = companyPersonObj.findIndex((obj) => obj.full_name === value);
        setSupervisorPosition(companyPersonObj[index_person].job_title);
        setSupervisorEmail(companyPersonObj[index_person].email);
        setSupervisorPhoneNum(companyPersonObj[index_person].phone_number);
    };
    const supervisorNameOnChange = (value) => {
        setSupervisorName(value);
    };

    const handleCancelBtn = () => {
        if (me?.role === RoleOption.COMMITTEE) {
            router.push(`/jobs`);
        } else if (me?.role === RoleOption.COMPANY) {
            router.push(`/company/myjob`);
        }
    };

    function clearForm() {
        setDateSelect(undefined);
        setInternshipPeriod(undefined);
        setRequireMajor(undefined);
        setCompensationSuffix(undefined);
        setSelectRequireMajor(undefined);
        setRequireMajor(undefined);
        setWelfareList(undefined);
        setCoordinatorName(undefined);
        setCoordinatorEmail(undefined);
        setCoordinatorPhoneNum(undefined);
        setCoordinatorPosition(undefined);
        setSupervisorName(undefined);
        setSupervisorPhoneNum(undefined);
        setSupervisorPosition(undefined);
        setSupervisorEmail(undefined);
        setOtherWelfare(undefined);
        reset();
    }

    const onSubmit = async (data) => {
        otherWelfare ? (welfareList.push(otherWelfare.trim()), welfareList.join(', ')) : '';
        await updateJob({
            onCompleted: (result) => {
                if (result) {
                    notification.success('Success', 'แก้ไขงานเสร็จสิ้น');
                    clearForm();
                    client.clearStore();
                    if (me?.role === RoleOption.COMMITTEE) {
                        router.push(`/jobs`);
                    } else if (me?.role === RoleOption.COMPANY) {
                        router.push(`/company/myjob`);
                    }
                }
            },
            onError: (error) => {
                console.log(error);
                if (error) {
                    notification.error('Error', error.message);
                }
            },
            variables: {
                updateInput: {
                    id: id as string,
                    job_title: data.job_title,
                    compensation: data.compensation + (compensationSuffix ? ', ' + compensationSuffix : ''),
                    limit: data.limit,
                    nature_of_work: data.nature_of_work,
                    project_topic: data.project_topic,
                    required_major: requireMajor,
                    required_skills: data.required_skills,
                    welfare: welfareList ? welfareList.join(', ') : '',
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
    };
    return (
        <div className=" gap-8 min-h-screen relative overflow-y-auto py-8 ">
            <div className="w-[80%] h-fit">
                <BreadcrumbComponent />
                <h1 className=" text-4xl md:text-5xl font-primary_noto font-semibold"> แก้ไขงานที่เปิดรับ</h1>
                <hr className="h-[1px] mt-10 mb-4 bg-gray-400 border-0 dark:bg-gray-700" />
            </div>
            {data ? (
                <form onSubmit={handleSubmit(onSubmit)} className=" rounded-md  font-primary_noto  ">
                    <div className="grid grid-rows-1 gap-8 mb-8">
                        <div>
                            <label className={`block mb-2 text-xl font-medium text-gray-900 `}>รายละเอียดงานที่รับสมัคร</label>
                            <div className="bg-white rounded-xl grid grid-cols-2 px-6 pt-6 gap-x-8">
                                <div className="col-span-2">
                                    <label className={`block mb-2 text-lg font-medium text-gray-900 `}>ชื่อหัวข้อโครงงานสหกิจศึกษา</label>
                                    <input
                                        className="w-full shadow-sm  text-sm rounded-lg  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500"
                                        type={'text'}
                                        name={'project_topic'}
                                        defaultValue={data.getJobById?.project_topic ? data.getJobById?.project_topic : ''}
                                        {...register('project_topic', { required: false })}
                                    ></input>
                                    <div className="h-5"></div>
                                </div>
                                <div className="">
                                    <label className={`block mb-2 text-lg font-medium text-gray-900 `}>ตำแหน่งงาน</label>
                                    <input
                                        className="w-full shadow-sm  text-sm rounded-lg  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500"
                                        type={'text'}
                                        name={'job_title'}
                                        defaultValue={data.getJobById?.job_title ? data.getJobById?.job_title : ''}
                                        {...register('job_title', { required: false })}
                                    ></input>
                                    <div className="h-5"></div>
                                </div>

                                <div className="mb-2">
                                    <label className={`block mb-2 text-lg font-medium text-gray-900 `}>หลักสูตรที่รับ</label>
                                    <div>
                                        <Select
                                            className=" text-gray-900 w-full h-full "
                                            mode="multiple"
                                            allowClear
                                            size="large"
                                            placeholder="Please select"
                                            onChange={selectRequireMajorOnChange}
                                            options={require_major}
                                            value={selectRequireMajor}
                                        />
                                        <div className="h-5"></div>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <label className={`block mb-2 text-lg font-medium text-gray-900 `}>ลักษณะงานที่ต้องปฏิบัติ</label>
                                    <input
                                        className="w-full shadow-sm  text-sm rounded-lg  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500"
                                        type={'text'}
                                        name={'nature_of_work'}
                                        defaultValue={data.getJobById?.nature_of_work ? data.getJobById?.nature_of_work : ''}
                                        {...register('nature_of_work', { required: false })}
                                    ></input>
                                    <div className="h-5"></div>
                                </div>

                                <div className="col-span-2">
                                    <label className={`block mb-2 text-lg font-medium text-gray-900 `}>ทักษะที่นักศึกษาควรมี</label>
                                    <input
                                        className="w-full shadow-sm  text-sm rounded-lg  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500"
                                        type={'text'}
                                        name={'required_skills'}
                                        defaultValue={data.getJobById?.required_skills ? data.getJobById?.required_skills : ''}
                                        {...register('required_skills', { required: false })}
                                    ></input>
                                    <div className="h-5"></div>
                                </div>

                                <div className="col-span-2">
                                    <div className="grid grid-cols-12 gap-x-8 ">
                                        <div className="mb-4 h-auto col-span-2 ">
                                            <label className={`block  text-lg font-medium text-gray-900 mb-1 `}>ระยะเวลาปฏิบัติงาน</label>
                                            <Radio.Group onChange={internShipPeriodOnChange} value={internshipPeriod} className="grid grid-flow-row">
                                                <Radio value={'ฝึกงาน (2 เดือน)'}>ฝึกงาน (2 เดือน)</Radio>
                                                <Radio value={'สหกิจศึกษา (4 เดือน)'}>สหกิจศึกษา (4 เดือน)</Radio>
                                                <Radio value={'ฝึกงาน+สหกิจศึกษา (6 เดือน)'}>ฝึกงาน+สหกิจศึกษา (6 เดือน)</Radio>
                                            </Radio.Group>
                                            <div className="h-5"></div>
                                        </div>

                                        <div className="w-auto col-span-3 ">
                                            <label className={`block mb-2 text-lg font-medium text-gray-900 `}>
                                                ช่วงเวลาปฏิบัติงาน <span>(วันเริ่มต้น - วันสิ้นสุด)</span>
                                            </label>
                                            <RangePicker
                                                className="xl:w-full"
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

                                        <div className="mb-4 h-auto col-span-2">
                                            <label htmlFor="address" className="block mb-2 text-lg font-medium text-gray-900">
                                                จำนวนที่รับสมัคร
                                            </label>
                                            <input
                                                className="w-full shadow-sm  text-sm rounded-lg  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500"
                                                id="limit"
                                                type="number"
                                                min={1}
                                                max={20}
                                                defaultValue={data?.getJobById?.limit ? data?.getJobById?.limit : ''}
                                                name="limit"
                                                {...register('limit', { required: false })}
                                            />
                                            <div className="h-5"></div>
                                        </div>

                                        <div className="col-span-4 ">
                                            <div className="w-auto mb-4 h-auto grid grid-cols-2 gap-x-2">
                                                <div className="w-full">
                                                    <label htmlFor="address" className="block mb-2 text-lg font-medium text-gray-900">
                                                        ค่าตอบแทน
                                                    </label>
                                                    <input
                                                        className="w-full shadow-sm  text-sm rounded-lg  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500"
                                                        id="compensation"
                                                        type="number"
                                                        min={0}
                                                        max={1000000}
                                                        name="compensation"
                                                        defaultValue={data?.getJobById?.compensation ? parseInt(data?.getJobById?.compensation) : ''}
                                                        {...register('compensation', { required: false })}
                                                    />
                                                </div>

                                                <div className="w-full min-w-fit h-auto pt-11 ">
                                                    <Radio.Group
                                                        className="flex flex-row flex-wrap "
                                                        onChange={compensationSuffixOnChange}
                                                        value={compensationSuffix}
                                                    >
                                                        <Radio value={'วัน'}>ต่อวัน</Radio>
                                                        <Radio value={'เดือน'}>ต่อเดือน</Radio>
                                                    </Radio.Group>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className=" grid grid-cols-12 gap-x-8">
                                        <div className="col-span-5 mb-4">
                                            <label className={`block mb-4 text-lg font-medium text-gray-900 `}>สวัสดิการที่มี</label>
                                            <div className="flex ">
                                                <Checkbox.Group options={welfare_options} value={welfareList} onChange={welfareOnChange} className="" />
                                            </div>

                                            <div className="h-5"></div>
                                        </div>
                                        <div className="mb-4 h-auto col-span-4">
                                            <label htmlFor="address" className="block mb-2 text-lg font-medium text-gray-900">
                                                สวัสดิการอื่นๆ (ถ้ามี)
                                            </label>
                                            <input
                                                className="w-full shadow-sm  text-sm rounded-lg  outline-0 block  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500"
                                                id="other_welfare"
                                                type="text"
                                                defaultValue={otherWelfare}
                                                onChange={(e) => {
                                                    setOtherWelfare(e.target.value);
                                                }}
                                                name="other_welfare"
                                            />
                                            <div className="h-5"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <label className={`block mb-2 text-xl font-medium text-gray-900 `}>ผู้ประสานงาน</label>
                            <div className="bg-white rounded-xl grid grid-cols-2 px-6 pt-6 gap-x-8">
                                <div className="mb-4 h-auto ">
                                    <label className={`block mb-2 text-lg font-medium text-gray-900 `}>ชื่อ-นามสกุล</label>
                                    <AutoComplete
                                        id="coordinator_name"
                                        className="w-full"
                                        options={company_person_option}
                                        size="large"
                                        onSelect={coordinatorNameOnSelect}
                                        onChange={coordinatorNameOnChange}
                                        defaultValue={data?.getJobById?.coordinator_name ? data?.getJobById?.coordinator_name : ''}
                                        placeholder="นาง พรประภา ชินตะวัน"
                                        filterOption={(inputValue, company_person_option) =>
                                            company_person_option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    />
                                    <div className="h-5"></div>
                                </div>

                                <div className="mb-4 h-auto">
                                    <label htmlFor="address" className="block mb-2 text-lg font-medium text-gray-900">
                                        ตำแหน่ง
                                    </label>
                                    <input
                                        className="w-full shadow-sm text-sm rounded-lg outline-0 block p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500"
                                        id="coordinator_job_title"
                                        type="text"
                                        name="coordinator_job_title"
                                        value={coordinatorPosition}
                                        defaultValue={data?.getJobById?.coordinator_job_title ? data?.getJobById?.coordinator_job_title : ''}
                                        placeholder="Human resource manager"
                                        onChange={(e) => {
                                            setCoordinatorPosition(e.target.value);
                                        }}
                                    />
                                    <div className="h-5"></div>
                                </div>

                                <div className="mb-4 h-auto">
                                    <label htmlFor="address" className="block mb-2 text-lg font-medium text-gray-900">
                                        อีเมล์
                                    </label>
                                    <input
                                        className="w-full shadow-sm text-sm rounded-lg outline-0 block p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500"
                                        id="coordinator_email"
                                        type="text"
                                        name="coordinator_email"
                                        value={coordinatorEmail}
                                        defaultValue={data?.getJobById?.coordinator_email ? data?.getJobById?.coordinator_email : ''}
                                        placeholder="pornprapa@company.co.th"
                                        onChange={(e) => {
                                            setCoordinatorEmail(e.target.value);
                                        }}
                                    />
                                    <div className="h-5"></div>
                                </div>

                                <div className="mb-4 h-auto">
                                    <label htmlFor="address" className="block mb-2 text-lg font-medium text-gray-900">
                                        โทรศัพท์
                                    </label>
                                    <input
                                        className="w-full shadow-sm text-sm rounded-lg outline-0 block p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500"
                                        id="coordinator_phone_number"
                                        type="text"
                                        name="coordinator_phone_number"
                                        placeholder="0812345678"
                                        value={coordinatorPhoneNum}
                                        defaultValue={data?.getJobById?.coordinator_phone_number ? data?.getJobById?.coordinator_phone_number : ''}
                                        onChange={(e) => {
                                            setCoordinatorPhoneNum(e.target.value);
                                        }}
                                    />
                                    <div className="h-5"></div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <label className={`block mb-2 text-xl font-medium text-gray-900 `}>ผู้นิเทศงาน (หากมีข้อมูลกรุณาให้ข้อมูล)</label>
                            <div className="bg-white rounded-xl grid grid-cols-2 px-6 pt-6 gap-x-8">
                                <div className="mb-4 h-auto">
                                    <label className={`block mb-2 text-lg font-medium text-gray-900 `}>ชื่อ-นามสกุล</label>
                                    <AutoComplete
                                        id="supervisor_name"
                                        className="w-full"
                                        options={company_person_option}
                                        size="large"
                                        onSelect={supervisorNameOnSelect}
                                        onChange={supervisorNameOnChange}
                                        defaultValue={data?.getJobById?.supervisor_name ? data?.getJobById?.supervisor_name : ''}
                                        placeholder="นาง เทธิกา จริงกิจจานุกูล"
                                        filterOption={(inputValue, company_person_option) =>
                                            company_person_option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    />
                                    <div className="h-5"></div>
                                </div>

                                <div className="mb-4 h-auto">
                                    <label htmlFor="address" className="block mb-2 text-lg font-medium text-gray-900">
                                        ตำแหน่ง
                                    </label>
                                    <input
                                        className="w-full shadow-sm text-sm rounded-lg outline-0 block p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500"
                                        id="supervisor_position"
                                        type="text"
                                        name="supervisor_position"
                                        placeholder="Project coordinator "
                                        value={supervisorPosition}
                                        defaultValue={data?.getJobById?.supervisor_job_title ? data?.getJobById?.supervisor_job_title : ''}
                                        onChange={(e) => {
                                            setSupervisorPosition(e.target.value);
                                        }}
                                    />
                                    <div className="h-5"></div>
                                </div>

                                <div className="mb-4 h-auto">
                                    <label htmlFor="address" className="block mb-2 text-lg font-medium text-gray-900">
                                        อีเมล์
                                    </label>
                                    <input
                                        className="w-full shadow-sm text-sm rounded-lg outline-0 block p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500"
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

                                <div className="mb-4 h-auto">
                                    <label htmlFor="address" className="block mb-2 text-lg font-medium text-gray-900">
                                        โทรศัพท์
                                    </label>
                                    <input
                                        className="w-full shadow-sm text-sm rounded-lg outline-0 block p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:border-blue-500"
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
                            {/* <label className={`block mb-2 text-xl font-medium text-gray-900 `}>เพิ่มเอกสาร (.pdf)</label> */}
                            {/* <div>
                            <input accept="application/pdf" type="file" onChange={handleFileChange} defaultValue={null} id="file" />
                        </div> */}
                        </div>
                    </div>

                    <div className="flex flex-row w-full justify-end gap-4 items-center   ">
                        <button
                            type="button"
                            className="px-2 py-2 rounded-md w-40  h-[60%] border text-md font-bold drop-shadow-md  text-gray-600"
                            onClick={handleCancelBtn}
                        >
                            {(!loading || !update_job_loading) && 'ยกเลิก'}
                            {(loading || update_job_loading) && (
                                <span>
                                    <LoadingSpinner />
                                    loading...
                                </span>
                            )}
                        </button>
                        <button
                            type="submit"
                            className="px-2 py-2 rounded-md w-40 bg-green-600 h-[60%] border-2 border-solid drop-shadow-md border-gray-300 text-xl text-gray-100"
                        >
                            {(!loading || !update_job_loading) && 'บันทึก'}
                            {(loading || update_job_loading) && (
                                <span>
                                    <LoadingSpinner />
                                    loading...
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            ) : (
                ''
            )}
        </div>
    );
}
