import React, { FC, useState } from 'react';
import { ICompany } from '@features/company/interfaces';
import { Checkbox, Radio, Table, Tag } from 'antd';
import { ColumnsType, ColumnType } from 'antd/es/table';
import { IStudent } from '@features/student/interfaces/Student';
import { curriculums, departments, faculties } from '@constants/faculty-info';
import Link from 'next/link';
import { DocumentTextIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { LiteralUnion } from 'antd/es/_util/type';
import { PresetStatusColorType } from 'antd/es/_util/colors';
import { ChangeCoopStatusToThaiFormat } from '../../../utils/common';
import { CoopStatus } from '@features/student/interfaces';
import LoadingSpinner from '@components/common/Spinner/LoadingSpinner';
import { AccountStatus, IAccount } from '@features/user-account/interfaces';

interface OwnProps {
    companies: ICompany[] | null | undefined;
    loading: boolean;
}
type CompanyAccountTableType = OwnProps;

const CompanyAccountTable: FC<CompanyAccountTableType> = ({ companies, loading }) => {
    const [editingKey, setEditingKey] = useState('');

    const companies_columns: ColumnsType<ICompany> = [
        {
            title: 'ชื่อบริษัท',
            dataIndex: 'name_eng',
            render: (value, { name_eng }, index) => {
                return <>{name_eng}</>;
            },
        },
        {
            title: 'อีเมล',
            dataIndex: 'email',
            render: (value, { company_persons }, index) => {
                return <>{company_persons.length === 0 ? '-' : company_persons[0].email.toLowerCase()}</>;
            },
        },
        {
            title: 'ชื่อผู้ประสานงาน',
            dataIndex: 'email',
            render: (value, { company_persons }, index) => {
                return <>{company_persons.length === 0 ? '-' : company_persons[0].full_name}</>;
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 140,
            align: 'center',
            className: '',
            render: (value, { id }, index) => {
                return (
                    <div className={'flex flex-row gap-4 justify-center align-middle items-center '}>
                        {editingKey === id ? (
                            <div className={'flex flex-row gap-x-1'}>
                                <div className="flex flex-row items-center align-middle w-full gap-x-3 justify-center cursor-pointer">
                                    <p className={'text-[16px] '} onClick={() => setEditingKey('')}>
                                        ยกเลิก
                                    </p>
                                    <p
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
    return <Table dataSource={companies || null} loading={loading} columns={companies_columns}></Table>;
};

export default CompanyAccountTable;
