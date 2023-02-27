import { Table } from 'antd';
import React from 'react';
import { AuthResponse } from '@features/auth/hooks/useLogin';
import { JobResponse } from '@features/job/hooks/useGetJobs';
import { IStudent } from '@features/student/interfaces/Student';
import { ColumnsType } from 'antd/es/table';
interface AccountTable {
    datasource: IStudent[];
    loading: boolean;
}

type AccountTableProps = AccountTable;

const columns: ColumnsType<IStudent> = [
    {
        title: 'ชื่อ-นามสกุล',
        dataIndex: ['name_prefix', 'name_th', 'lastname_th'],
        key: 'name',
        render: (text, record) => `${record.name_prefix} ${record.name_th} ${record.lastname_th}`,
    },
    {
        title: 'หลักสูตร',
        dataIndex: 'curriculum',
        key: 'curriculum',
        render: (text, record) => `${record?.curriculum?.curriculum_name_th ? record?.curriculum?.curriculum_name_th : ''}`,
    },
    {
        title: 'อีเมล์',
        dataIndex: ['account','email'],
        key: 'email',
    },
    {
        title: 'โทรศัพท์',
        dataIndex: 'phone_number',
        key: 'phone_number',
    },
];

const StudentApplyTable: React.FC<AccountTableProps> = ({ datasource, loading }) => {
    return (
        <Table
            className="shadow-2xl bg-gray-200 rounded-xl"
            rowClassName={'odd:bg-white even:bg-stone-100 text-[16px]'}
            rowKey="email"
            dataSource={datasource}
            columns={columns}
            loading={loading}
            size="middle"
            showHeader
        ></Table>
    );
};

export default StudentApplyTable;
