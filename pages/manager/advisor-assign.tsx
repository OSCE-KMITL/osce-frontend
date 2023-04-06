import { useGetStudents } from '@features/student/hooks/useGetStudents';

interface OwnProps {}

type Props = OwnProps;

import React, { useState } from 'react';
import { Divider, Select, SelectProps, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAdvisorAccounts } from '@features/advisor/hooks';
import { IAccount } from '@features/user-account/interfaces';
import tableStyle from '../../styles/Table/table.module.scss';
import { rowClassname } from '@components/Manager/AdvisorAccount/AdvisorAccountTable';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface DataType {
    key: string;
    name: string;
    id?: number;
    address: string;
    tags: string[];
}

const AdvisorAssign: React.FC = () => {
    const { data: students, loading, error } = useGetStudents();
    const { data: advisors, loading: advisors_loading, error: advisors_error } = getAdvisorAccounts();
    const [editingKey, setEditingKey] = useState('');
    const [advisments, setAdvisments] = useState<string[]>([]);

    console.log(advisors);
    console.log(advisors);
    function handleSubmit() {
        console.log(advisments);
    }

    if (loading || advisors_loading) return <h1>loading...</h1>;
    if (error || advisors_error) return <h1>error...</h1>;

    const handleChange = (value: string[]) => {
        setAdvisments((prev) => [...value]);
    };

    const columns: ColumnsType<IAccount> = [
        {
            title: 'ชื่อ-นามสกุล',
            dataIndex: 'name',
            render: (value, { is_advisor, email, role, status }, index) => {
                const prefix = () => (is_advisor.name_prefix ? is_advisor.name_prefix : '');
                return <p>{prefix() + ' ' + is_advisor.name + ' ' + is_advisor.last_name}</p>;
            },
        },
        {
            title: 'นักศึกษาในนิเทศ',
            dataIndex: 'name',
            key: 'name',
            className: 'max-w-[300px] min-w-[300px] ',
            render: (text, record, index) => {
                const student = students.getStudentsApply[index];
                const student_info = student.student_id + ' ' + student.name_prefix + ' ' + student.name_th + ' ' + student.lastname_th;
                return (
                    <div className="flex w-full gap-2 flex-col  ">
                        {editingKey === record.id ? (
                            <Select
                                defaultValue={[student.student_id]}
                                mode="multiple"
                                allowClear
                                placeholder="รหัสนักศึกษา"
                                popupClassName="text-[15px]"
                                onChange={handleChange}
                                options={options}
                            />
                        ) : (
                            <p className="w-fit px-2 py-1 bg-slate-100 text-slate-500 border border-slate-500 rounded-md">{student_info}</p>
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
            render: (value, { id }, index) => {
                return (
                    <div className={'h-auto flex flex-row gap-4 justify-center align-middle items-center '}>
                        {editingKey === id ? (
                            <div className={'flex flex-row gap-x-1'}>
                                <div className="flex flex-row items-center align-middle w-full gap-x-3 justify-center cursor-pointer">
                                    <p className={'text-[16px] '} onClick={() => setEditingKey('')}>
                                        ยกเลิก
                                    </p>
                                    <p
                                        onClick={() => handleSubmit()}
                                        className={
                                            'text-[16px] bg-blue-200 px-4 py-1 rounded-md border border-blue-600 text-blue-600 font-bold cursor-pointer '
                                        }
                                    >
                                        บันทึก
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div onClick={() => setEditingKey(id)} className="cursor-pointer">
                                    <PencilIcon className="w-6 h-6 text-gray-600 " />
                                </div>
                                <div className="cursor-pointer">
                                    <TrashIcon className="w-6 h-6  text-gray-600 hover:text-red-600 " />
                                </div>
                            </>
                        )}
                    </div>
                );
            },
        },
    ];

    const options: SelectProps['options'] = students.getStudentsApply.map((student, i) => {
        return { label: `${student.student_id} ${student.name_prefix} ${student.name_th} ${student.lastname_th}`, value: student.student_id };
    });

    const options_defult_value: SelectProps['options'] = students.getStudentsApply.map((student, i) => {
        return { label: `${student.student_id} ${student.name_prefix} ${student.name_th} ${student.lastname_th}`, value: student.student_id };
    });

    return (
        <>
            <div className={'w-full flex flex-row gap-x-6 items-center align-bottom'}>
                <h1>กำหนดนักศึกษาให้อาจารย์นิเทศ</h1>
                <p className="px-4 py-2 rounded-lg text-[25px] bg-white shadow-sm text-primary-500 font-semibold ">ภาควิชา : วิศวะกรรมคอมพิวเตอร์</p>
            </div>
            <Divider />
            <Table
                bordered={true}
                size={'large'}
                rowClassName={rowClassname}
                className={tableStyle.customTable}
                columns={columns}
                dataSource={advisors.getAdvisorAccounts}
            />
            ;
        </>
    );
};

export default AdvisorAssign;
