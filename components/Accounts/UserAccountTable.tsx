import { Table } from 'antd';
import React from 'react';
import { Account } from '../../src/__generated__/graphql';
import { column_type } from './column-type';

interface AccountTable {
    data_source: Account[];
    loading: boolean;
}

type AccountTableProps = AccountTable;

const UserAccountTable: React.FC<AccountTableProps> = ({ data_source, loading }) => {
    return (
        <Table
            className="shadow-2xl bg-amber-400 rounded-xl "
            rowClassName={'odd:bg-white even:bg-stone-100 text-[16px]'}
            rowKey="email"
            dataSource={data_source}
            columns={column_type}
            loading={loading}
            size="middle"
            showHeader
        ></Table>
    );
};

export default UserAccountTable;
