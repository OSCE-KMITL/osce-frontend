import { ColumnsType } from 'antd/es/table';
import { Account } from '../../src/__generated__/graphql';
import { Tag } from 'antd';
import React from 'react';
import { DeleteFilled, EditFilled, IdcardFilled } from '@ant-design/icons';

const fmtName = (account: Account): string => {
    if (account.is_student) {
        return account.is_student.name.charAt(0).toUpperCase() + account.is_student.name.slice(1) + ' ' + account.is_student.lastname;
    }
    if (account.is_advisor) {
        return account.is_advisor.name.charAt(0).toUpperCase() + account.is_advisor.name.slice(1) + ' ' + account.is_advisor.last_name;
    }
    return account.is_company.full_name;
};
export const column_type: ColumnsType<Account> = [
    {
        title: 'User',
        dataIndex: 'User',
        key: 'user',
        render: (_, account) => (
            <div className="flex flex-row w-1/2 gap-4">
                <div className="flex justify-center items-center text-3xl font-mono font-bold w-[50px] h-[50px] bg-emerald-700 text-white rounded-md">
                    {fmtName(account)[0].toUpperCase()}
                </div>
                <div className="flex flex-col ">
                    <p className="font-semibold text-gray-900">{fmtName(account)}</p>
                    <p className="font-normal text-gray-500">{account.email.toLowerCase()}</p>
                </div>
            </div>
        ),
    },
    {
        title: 'role',
        dataIndex: 'role',
        key: 'role',
        render: (_, acc) => (
            <Tag color={(acc.role == 'ADVISOR' && 'blue') || (acc.role == 'COMMITTEE' && 'red') || (acc.role == 'STUDENT' && 'green') || 'purple'}>
                {acc.role.toLowerCase()}
            </Tag>
        ),
    },
    {
        title: 'Action',
        dataIndex: 'Action',
        render: () => (
            <div className="">
                <div className="flex w-1/2 justify-between ">
                    <a className=" text-2xl text-blue-600">
                        <IdcardFilled />
                    </a>{' '}
                    <a className="text-2xl">
                        <EditFilled />
                    </a>
                    <a className="text-2xl text-red-500 hover:text-red-300">
                        <DeleteFilled />
                    </a>
                </div>
            </div>
        ),
    },
];
