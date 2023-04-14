import { GET_STUDENTS, useGetStudents } from '@features/student/hooks/useGetStudents';
import React, { useState } from 'react';
import { Divider, Select, SelectProps, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { GET_ADVISOR_ACCOUNTS, getAdvisorAccounts } from '@features/advisor/hooks';
import { IAccount } from '@features/user-account/interfaces';
import tableStyle from '../../styles/Table/table.module.scss';
import { rowClassname } from '@components/Manager/AdvisorAccount/AdvisorAccountTable';
import { PencilIcon } from '@heroicons/react/24/outline';
import { IStudent } from '@features/student/interfaces/Student';
import { useAssignStudentToAdvisor } from '@features/advisor/hooks/useAssignStudent';
import LoadingSpinner from '@components/common/Spinner/LoadingSpinner';

const AdvisorAssign: React.FC = () => {
    const { data: students, loading, error } = useGetStudents();
    const { data: advisors, loading: advisors_loading, error: advisors_error, refetch } = getAdvisorAccounts();
    const [editingKey, setEditingKey] = useState('');
    const [advisement, setAdvisement] = useState<string[]>([]);
    const [assignStudents, { loading: submit_loading }] = useAssignStudentToAdvisor();

    const combineStudentInfo = (student: IStudent) => {
        return student.student_id + ' ' + student.name_prefix + ' ' + student.name_th + ' ' + student.lastname_th;
    };

    function handleEditing(editing_key, default_students: IStudent[]) {
        setEditingKey(editing_key);
        const init_student = default_students.map((student) => student.student_id);
        setAdvisement([...init_student]);
    }

    async function handleSubmit(advisor_id: string) {
        try {
            await assignStudents({
                variables: {
                    advisor_id: advisor_id,
                    students: [...advisement],
                },
                onCompleted: async () => {
                    await refetch();
                },
                refetchQueries: ['GET_STUDENTS', 'GET_ADVISOR_ACCOUNTS'],
            });

            setAdvisement([]);
            setEditingKey('');
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }

    if (loading || advisors_loading) return <h1>loading...</h1>;
    if (error || advisors_error) return <h1>error...</h1>;

    const handleChange = (value) => {
        setAdvisement((prev) => [...value]);
    };

    const columns: ColumnsType<IAccount> = [
        {
            title: 'ชื่อ-นามสกุล',
            dataIndex: 'name',
            render: (value, { is_advisor }) => {
                const prefix = () => (is_advisor.name_prefix ? is_advisor.name_prefix : '');
                return <p>{prefix() + ' ' + is_advisor.name + ' ' + is_advisor.last_name}</p>;
            },
        },
        {
            title: 'นักศึกษาในนิเทศ',
            dataIndex: 'name',
            key: 'name',
            className: 'max-w-[300px] min-w-[300px] ',
            render: (text, record) => {
                const students = record.is_advisor.students.map((student) => {
                    return { label: `${student.student_id} ${student.name_prefix} ${student.name_th} ${student.lastname_th}`, value: student.student_id };
                });

                return (
                    <div className="flex w-full gap-2 flex-col  ">
                        {editingKey === record.id ? (
                            <Select
                                defaultValue={students}
                                mode="multiple"
                                allowClear
                                placeholder="รหัสนักศึกษา"
                                popupClassName="text-[15px]"
                                onChange={handleChange}
                                options={options}
                            />
                        ) : (
                            <div className="flex flex-row gap-2.5 	flex-wrap: wrap">
                                {record.is_advisor.students.length === 0 && (
                                    <p className="w-fit px-2 py-1 bg-slate-100 text-slate-500 border border-slate-500 rounded-md">ไม่มีนักศึกษาในที่นิเทศ</p>
                                )}
                                {advisors.getAdvisorAccounts
                                    .find((advisor) => advisor.id === record.id)
                                    .is_advisor.students.map((student) => (
                                        <div key={student.student_id}>
                                            <p className="w-fit px-2 py-1 bg-blue-100 text-blue-500 border border-blue-500 rounded-md">
                                                {combineStudentInfo(student)}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 140,
            align: 'center',
            className: 'flex justify-between max-w-[150px] min-w-[150px] h-full ',
            render: (value, { id, is_advisor }) => {
                return (
                    <div className={'h-auto flex flex-row gap-4 justify-center align-middle items-center '}>
                        {editingKey === id ? (
                            <div className={'flex flex-row gap-x-1'}>
                                {submit_loading ? (
                                    <LoadingSpinner />
                                ) : (
                                    <div className="flex flex-row items-center align-middle w-full gap-x-3 justify-center cursor-pointer">
                                        <p className={'text-[16px] '} onClick={() => setEditingKey('')}>
                                            ยกเลิก
                                        </p>
                                        <p
                                            onClick={() => handleSubmit(is_advisor.advisor_id)}
                                            className={
                                                'text-[16px] bg-blue-200 px-4 py-1 rounded-md border border-blue-600 text-blue-600 font-bold cursor-pointer '
                                            }
                                        >
                                            บันทึก
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <div onClick={() => handleEditing(id, is_advisor.students)} className="cursor-pointer">
                                    <PencilIcon className="w-6 h-6 text-gray-600 " />
                                </div>
                            </>
                        )}
                    </div>
                );
            },
        },
    ];

    const options: SelectProps['options'] = students.getStudentsApply
        .filter((student) => student.advisor === null)
        .map((student) => {
            return { label: `${student.student_id} ${student.name_prefix} ${student.name_th} ${student.lastname_th}`, value: student.student_id };
        });

    return (
        <>
            <div className={'w-full flex flex-row gap-x-6 items-center align-bottom'}>
                <h1>กำหนดนักศึกษาให้อาจารย์นิเทศ</h1>
                <p className="px-4 py-2 rounded-lg text-[25px] bg-white shadow-sm text-primary-500 font-semibold ">ภาควิชา : วิศวกรรมคอมพิวเตอร์</p>
            </div>
            <Divider />
            <Table
                bordered={true}
                size={'large'}
                loading={advisors_loading || submit_loading}
                rowClassName={rowClassname}
                className={tableStyle.customTable}
                columns={columns}
                dataSource={advisors.getAdvisorAccounts}
            />
        </>
    );
};

export default AdvisorAssign;
