import { Table } from 'antd';
import React from 'react';
import { AuthResponse } from '@features/auth/hooks/useLogin';

interface AccountTable {
    datasource: AuthResponse[];
    loading: boolean;
}

type AccountTableProps = AccountTable;

const UserAccountTable: React.FC<AccountTableProps> = ({ datasource, loading }) => {
    return (
        <Table
            className="shadow-2xl bg-amber-400 rounded-xl "
            rowClassName={'odd:bg-white even:bg-stone-100 text-[16px]'}
            rowKey="email"
            dataSource={datasource}
            loading={loading}
            size="middle"
            showHeader
        ></Table>
    );
};

export default UserAccountTable;
