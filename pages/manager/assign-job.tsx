import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetStudents } from '@features/student/hooks/useGetStudents';
import NotificationService from '@lib/ant_service/NotificationService';
import { IStudent } from '@features/student/interfaces/Student';
import { useGetAllCompany } from '@features/company/hooks/useGetCompanys';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useCommitteeAssignJob } from '@features/job/hooks/useEditStateJob';
import { useGetMe } from '@features/auth/hooks/useGetMe';

const AssignJob: React.FC = () => {
    const [dataSource, setDataSource] = useState([]);
    const [editingRowKey, setEditingRowKey] = useState(null);
    const [optionJobTitle, setOptionJobTitle] = useState(null);
    const [jobOnChange, setJobOnChange] = useState<boolean | null | undefined>(false);
    const notification = NotificationService.getInstance();
    const { data: stu_data, loading: stu_loading, error: stu_error } = useGetStudents();
    const { data: company_data, loading: company_loading, error: company_error, refetch } = useGetAllCompany();
    const [committeeAssignJob, { loading: approve_loading, error: approve_error }] = useCommitteeAssignJob();
    const [form] = Form.useForm();
    const { data: dataGetMe, refetch: refectch_me } = useGetMe();

    const committee_dep = dataGetMe?.getMe?.is_advisor?.department.department_name_th;

    const filter_stu_data = stu_data?.getStudentsApply.filter((i) => i.department?.department_name_th === committee_dep);
    filter_stu_data?.sort((a, b) => parseInt(a.student_id) - parseInt(b.student_id));

    const newDataSource = () => {
        const data = [];
        setDataSource([]);
        for (let index = 0; index < filter_stu_data?.length; index++) {
            data.push({
                key: `${index}`,
                ...filter_stu_data[index],
            });
        }
        setDataSource(data);
    };

    const companies = company_data?.getAllCompanies;
    const object_company_name = companies?.map((obj) => {
        return {
            label: obj.name_eng,
            value: obj.id,
        };
    });

    const updateOptionJobTitles = (company_id: string) => {
        refetch();
        const companySelected = company_data?.getAllCompanies?.find((i) => i.id === company_id);
        if (companySelected) {
            const newOpntionJobtitle = companySelected.job
                ?.filter?.((i) => i.required_major?.includes(committee_dep) || i.required_major?.includes('ไม่จำกัดหลักสูตร'))
                ?.map((obj) => {
                    return {
                        label: obj?.job_title + `(${obj?.students?.length}/${obj?.limit})`,
                        value: obj?.id,
                    };
                });
            form.setFieldsValue({
                job_title: null,
            });
            setJobOnChange(null);
            setOptionJobTitle(newOpntionJobtitle);
        }
    };

    const onFinish = (value) => {
        console.log({ value });
    };

    const handleSaveButton = (stdent_id: string) => {
        console.log(stdent_id);
        const job_id = form.getFieldValue('job_title');
        console.log(job_id);
        if (job_id && stdent_id) {
            committeeAssignJob({
                variables: { committeeAssignjobInfo: { job_id: job_id, student_id: stdent_id } },
                onCompleted: (result) => {
                    if (result) {
                        notification.success('Success', 'กำหนดงานเสร็จสิ้น');
                    }
                    setEditingRowKey(null);
                    setJobOnChange(null);
                    setOptionJobTitle(null);
                    refetch();
                },
                onError: (error) => {
                    if (error) {
                        notification.error('Error', error.message);
                    }
                },
            });
        }
    };

    const handleJobOnChange = (value) => {
        setJobOnChange(value);
    };

    const handleCancel = () => {
        setEditingRowKey(null);
        setJobOnChange(false);
    };

    useEffect(() => {
        newDataSource();
        refectch_me();
    }, [stu_data]);

    interface ITableStudent extends IStudent {
        key: string;
    }

    const columns: ColumnsType<ITableStudent> = [
        {
            align: 'center',
            title: 'รหัสนักศึกษา',
            dataIndex: 'student_id',
            render: (value, { student_id }, index) => {
                return <>{student_id}</>;
            },
        },
        {
            title: <div className="flex items-center justify-center">ชื่อ-นามสกุล</div>,
            dataIndex: 'name',
            render: (value, { name_prefix, name_th, lastname_th }, index) => {
                return <>{name_prefix + ' ' + name_th + ' ' + lastname_th}</>;
            },
        },
        {
            title: <div className="flex items-center justify-center">หลักสูตร</div>,
            dataIndex: 'curriculum',
            render: (value, { curriculum }, index) => {
                return <>{curriculum?.curriculum_name_th}</>;
            },
        },
        {
            width: '20%',
            title: <div className="flex items-center justify-center">บริษัท</div>,
            dataIndex: 'job',
            render: (value, { job, key }, index) => {
                if (editingRowKey === key)
                    return (
                        <Form.Item name="company_name" style={{ margin: 0 }}>
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                                options={object_company_name}
                                onChange={updateOptionJobTitles}
                            />
                        </Form.Item>
                    );
                else {
                    return <>{job?.company_id?.name_eng ? job?.company_id?.name_eng : <div className="flex justify-center">-</div>}</>;
                }
            },
        },
        {
            width: '20%',
            title: <div className="flex items-center justify-center">ตำแหน่ง</div>,
            dataIndex: 'job',
            render: (value, { job, key }, index) => {
                if (editingRowKey === key)
                    return (
                        <Form.Item name="job_title" style={{ margin: 0 }}>
                            <Select
                                className=""
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                options={optionJobTitle}
                                onChange={handleJobOnChange}
                            />
                        </Form.Item>
                    );
                else {
                    return <>{job?.job_title ? job?.job_title + ` (${job?.students?.length}/${job?.limit})` : <div className="flex justify-center">-</div>}</>;
                }
            },
        },
        {
            align: 'center',
            width: '15%',
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                return (
                    <>
                        {editingRowKey !== record.key && (
                            <Button
                                type="link"
                                onClick={() => {
                                    setEditingRowKey(record.key);
                                    form.setFieldsValue({
                                        company_name: record.job?.company_id?.name_eng,
                                        job_title: record.job?.job_title,
                                    });
                                    updateOptionJobTitles(record.job?.company_id?.id);
                                }}
                            >
                                <PencilSquareIcon className="w-6 h-6 text-gray-600" />
                            </Button>
                        )}

                        {editingRowKey === record.key && (
                            <button
                                className={'px-4 py-1 text-center bg-gray-100 text-gray-500  border border-gray-500  rounded-2xl mr-4'}
                                onClick={handleCancel}
                            >
                                ยกเลิก
                            </button>
                        )}

                        {editingRowKey === record.key &&
                            (jobOnChange ? (
                                <button
                                    className={'px-4 py-1 text-center bg-green-100 text-green-500  border border-green-500  rounded-2xl'}
                                    type="submit"
                                    onClick={() => handleSaveButton(record.student_id)}
                                >
                                    บันทึก
                                </button>
                            ) : (
                                <button
                                    className={'px-4 py-1 text-center bg-green-100 text-green-500  border border-green-500 opacity-50 rounded-2xl '}
                                    disabled={true}
                                    type="submit"
                                >
                                    บันทึก
                                </button>
                            ))}
                    </>
                );
            },
        },
    ];
    const rowClassname = (record, index) => {
        if (index % 2 !== 0) {
            return 'bg-[#f2f2f2]';
        }
    };
    if (stu_loading) {
        return <p>loading</p>;
    }
    if (stu_error) {
        return <p>error</p>;
    }
    return (
        <div>
            <h1>กำหนดงานให้นักศึกษา</h1>
            <Divider />
            <Form form={form} onFinish={onFinish}>
                <Table bordered={true} size={'large'} rowClassName={rowClassname} className={''} columns={columns} dataSource={dataSource} />
            </Form>
        </div>
    );
};

export default AssignJob;
