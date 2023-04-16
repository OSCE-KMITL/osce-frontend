import React, { FC, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { LiteralUnion } from 'antd/es/_util/type';
import { PresetStatusColorType } from 'antd/es/_util/colors';
import { Checkbox, Modal, Radio, Table, Tag } from 'antd';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import tableStyle from '../../../styles/Table/table.module.scss';
import { useDeleteStudent } from '@features/student/hooks/useDeleteStudent';
import { AccountStatus, IAccount } from '@features/user-account/interfaces';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useUpdateAdvisor } from '@features/advisor/hooks/update/useUpdateAdvisor';
import FooterInput from '@components/Manager/CoopApply/FooterInput';

interface AdvisorAccountProps {
    advisor_accounts: IAccount[];
}

export const rowClassname = (record, index) => {
    if (index % 2 !== 0) {
        return 'bg-[#f2f2f2]';
    }
};

type AdvisorAccountType = AdvisorAccountProps;

const AdvisorAccountTable: FC<AdvisorAccountType> = ({ advisor_accounts }) => {
    const { handleStatusChange, setUpdateObject, handleRoleChange, updateObject } = useUpdateAdvisor();

    const [delete_student, { data, loading, error }] = useDeleteStudent();

    const [editingKey, setEditingKey] = useState('');
    const { confirm } = Modal;

    function handleInitChange(id: string, advisor_id: string, status: AccountStatus, is_committee: Boolean) {
        setEditingKey(id);
        setUpdateObject({ advisor_id: advisor_id, account_id: id, advisor_status: status, is_committee: is_committee });
    }

    console.log(updateObject);

    const advisor_account_column: ColumnsType<IAccount> = [
        {
            title: 'ชื่อ-นามสกุล',
            dataIndex: 'name_th',
            render: (value, { is_advisor, email, role, status }, index) => {
                const prefix = () => (is_advisor.name_prefix ? is_advisor.name_prefix : '');
                return <>{prefix() + ' ' + is_advisor.name + ' ' + is_advisor.last_name}</>;
            },
        },
        {
            title: 'อีเมล',
            dataIndex: 'email',
            render: (value, { is_advisor, email, role, status }, index) => {
                return <>{email.toLowerCase()}</>;
            },
        },
        {
            title: 'บทบาท',
            dataIndex: 'status',
            className: ' min-w-[300px]',
            render: (value, { status, is_advisor, id }, index) => {
                return (
                    <>
                        {editingKey === id ? (
                            <>
                                <Checkbox onChange={(e) => handleRoleChange(e.target.checked)} defaultChecked={is_advisor.is_committee ? true : false}>
                                    กรรมการสหกิจ
                                </Checkbox>
                            </>
                        ) : (
                            <>
                                <Tag color={'blue'}>{<p className="text-[15px] px-2 py-1 ">อาจารย์นิเทศ</p>}</Tag>
                                {is_advisor.is_committee && <Tag color={'volcano'}>{<p className="text-[15px] px-2 py-1 ">กรรมการ</p>}</Tag>}
                            </>
                        )}
                    </>
                );
            },
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            className: 'max-w-[160px] min-w-[200px]',
            render: (value, { status, id }, index) => {
                const tag_color: LiteralUnion<PresetStatusColorType>[] = ['default', 'warning', 'processing', 'success', 'error'];
                return (
                    <>
                        {editingKey !== id ? (
                            <>
                                {status === AccountStatus.ACTIVE && <Tag color={'green'}>{<p className="text-[15px] px-2 py-1 ">Active</p>}</Tag>}{' '}
                                {status === AccountStatus.INACTIVE && <Tag color={'red'}>{<p className="text-[15px] px-2 py-1 ">Inactive</p>}</Tag>}
                            </>
                        ) : (
                            <>
                                <Radio.Group onChange={(e) => handleStatusChange(e.target.value)} buttonStyle="solid" defaultValue={status} size={'middle'}>
                                    <Radio.Button value={AccountStatus.ACTIVE}>{AccountStatus.ACTIVE.toLowerCase()}</Radio.Button>
                                    <Radio.Button value={AccountStatus.INACTIVE}>{AccountStatus.INACTIVE.toLowerCase()}</Radio.Button>
                                </Radio.Group>
                            </>
                        )}
                    </>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 140,
            align: 'center',
            className: '',
            render: (value, { id, is_advisor, role, status }, index) => {
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
                                <div onClick={() => handleInitChange(id, is_advisor.advisor_id, status, is_advisor.is_committee)} className="cursor-pointer">
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

    return (
        <>
            {' '}
            <Table
                bordered={true}
                size={'large'}
                rowClassName={rowClassname}
                className={tableStyle.customTable}
                columns={advisor_account_column}
                dataSource={advisor_accounts}
                footer={() => <FooterInput />}
            />
        </>
    );
};

export default AdvisorAccountTable;
