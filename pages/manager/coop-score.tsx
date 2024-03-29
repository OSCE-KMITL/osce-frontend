import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, InputNumber, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetStudents } from '@features/student/hooks/useGetStudents';
import NotificationService from '@lib/ant_service/NotificationService';
import { IStudent } from '@features/student/interfaces/Student';
import { PencilSquareIcon, DocumentArrowDownIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useGetMe } from '@features/auth/hooks/useGetMe';
import { useSetScoreStudent } from '@features/student/hooks/useSetScoreStudent';
import { Link } from '@ui/Link';
import { ExportJsonToExcel } from 'utils/ExportJsonToExcel';
import { useRouter } from 'next/router';
import client from '@lib/apollo';
import DocumentCoop201 from '@components/PDF/DocumentCoop201';
import DocumentCoop304 from '@components/PDF/DocumentCoop304';
import { CoopStatus } from '@features/student/interfaces';

const CoopScore: React.FC = () => {
    const [dataSource, setDataSource] = useState([]);
    const [editingRowKey, setEditingRowKey] = useState(null);
    const notification = NotificationService.getInstance();
    const { data: stu_data, loading: stu_loading, error: stu_error, refetch } = useGetStudents();
    const [setScore, { loading: set_score_loading, error: set_score_error }] = useSetScoreStudent();
    const [form] = Form.useForm();
    const { data: dataGetMe, refetch: refectch_me } = useGetMe();
    const router = useRouter();

    useEffect(() => {
        refectch_me();
    }, []);

    if (stu_loading) return <p>loading..</p>;
    if (stu_error) return <p>error..</p>;

    const committee_dep = dataGetMe?.getMe?.is_advisor?.department?.department_name_th;
    const filter_stu_data = stu_data?.getStudentsApply
        .filter((i) => i.department?.department_name_th === committee_dep)
        .sort((a, b) => parseInt(a.student_id) - parseInt(b.student_id));

    const curr_data = filter_stu_data
        .map((data, idx) => {
            return { key: idx, ...data };
        })
        .filter((student) => student.coop_status === CoopStatus.PASSED);

    const onFinish = (value) => {
        console.log({ value });
    };

    const handleSaveButton = (stdent_id: string) => {
        const advisor_score = form.getFieldValue('advisor_score');
        const company_score = form.getFieldValue('company_score');
        const presentation_score = form.getFieldValue('presentation_score');

        if (stdent_id) {
            setScore({
                variables: {
                    setScoreInfo: { student_id: stdent_id, score_advisor: advisor_score, score_company: company_score, score_presentation: presentation_score },
                },
                onCompleted: (result) => {
                    if (result) {
                        notification.success('Success', 'แก้ไขคะแนนเสร็จสิ้น');
                    }
                    setEditingRowKey(null);
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

    const handleCancel = () => {
        setEditingRowKey(null);
    };

    const handleExportExcel = () => {
        const dataToExport = curr_data.map((item) => {
            return {
                รหัสนักศึกษา: item.student_id,
                'ชื่อ-นามสกุล': `${item.name_prefix} ${item.name_th} ${item.lastname_th}`,
                หลักสูตร: item.curriculum?.curriculum_name_th,
                อาจารย์นิเทศ: `${item.score_from_advisor}/20`,
                บริษัท: `${item.score_from_company}/40`,
                การสอบ: `${item.score_from_presentation}/40`,
                รวมคะแนน: `${item.score_from_advisor + item.score_from_company + item.score_from_presentation}`,
            };
        });
        return dataToExport;
    };

    interface ITableStudent extends IStudent {
        key: string;
    }

    const columns: ColumnsType<ITableStudent> = [
        {
            title: 'รหัสนักศึกษา',
            dataIndex: 'student_id',
            align: 'center',
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
            width: '10%',
            title: 'อาจารย์นิเทศ',
            dataIndex: 'score_from_advisor',
            align: 'center',
            render: (value, record, index) => {
                if (editingRowKey === record?.key)
                    return (
                        <Form.Item name="advisor_score" className="m-0">
                            <InputNumber maxLength={2} min={0} max={20} className="w-[50%] font-primary_noto text-[16px]"></InputNumber>
                        </Form.Item>
                    );
                else {
                    return (
                        <>
                            {record?.advisor_assessment ? (
                                <DocumentCoop201 student={record} />
                            ) : (
                                <>
                                    {record?.score_from_advisor}
                                    {'/20'}
                                </>
                            )}
                        </>
                    );
                }
            },
        },
        {
            width: '10%',
            title: 'บริษัท',
            dataIndex: 'score_from_company',
            align: 'center',
            render: (value, record, index) => {
                if (editingRowKey === record?.key)
                    return (
                        <Form.Item name="company_score" className="m-0">
                            <InputNumber maxLength={2} min={0} max={40} className="w-[50%] font-primary_noto text-[16px]"></InputNumber>
                        </Form.Item>
                    );
                else {
                    return (
                        <>
                            {record?.company_assessment ? (
                                <DocumentCoop304 student={record} />
                            ) : (
                                <>
                                    {record?.score_from_company}
                                    {'/40'}
                                </>
                            )}
                        </>
                    );
                }
            },
        },
        {
            width: '10%',
            title: 'สอบสหกิจ',
            dataIndex: 'score_from_presentation',
            align: 'center',
            render: (value, { score_from_presentation, key }, index) => {
                if (editingRowKey === key)
                    return (
                        <Form.Item name="presentation_score" className="m-0">
                            <InputNumber maxLength={2} min={0} max={40} className="w-[50%] font-primary_noto text-[16px]"></InputNumber>
                        </Form.Item>
                    );
                else {
                    return (
                        <>
                            {score_from_presentation}
                            {'/40'}
                        </>
                    );
                }
            },
        },
        {
            width: '10%',
            title: 'คะแนนรวม',
            align: 'center',
            render: (value, { score_from_advisor, score_from_company, score_from_presentation }, index) => {
                return (
                    <>
                        {score_from_advisor + score_from_company + score_from_presentation}
                        {'/100'}
                    </>
                );
            },
        },
        {
            width: '15%',
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            render: (_, record) => {
                return (
                    <>
                        {editingRowKey !== record.key && (
                            <Button
                                type="link"
                                onClick={() => {
                                    setEditingRowKey(record.key);
                                    form.setFieldsValue({
                                        advisor_score: record.score_from_advisor,
                                        presentation_score: record.score_from_presentation,
                                        company_score: record.score_from_company,
                                    });
                                }}
                            >
                                <PencilIcon className="w-6 h-6 text-gray-600 " />
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
                            (true ? (
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
            <h1>รวมคะแนนสหกิจ</h1>
            <Divider />
            <div className="flex justify-end mb-4">
                <Link onClick={() => ExportJsonToExcel(handleExportExcel(), 'คะแนนสหกิจ')} intent="primary">
                    <DocumentArrowDownIcon className="w-6 h-6 text-white mr-2" />
                    <p className="text-[14px] font-bold">Export to Excel</p>
                </Link>
            </div>

            <Form form={form} onFinish={onFinish}>
                <Table id="scroe_table" bordered={true} size={'large'} rowClassName={rowClassname} className={''} columns={columns} dataSource={curr_data} />
            </Form>
        </div>
    );
};

export default CoopScore;
