import React, { FC, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { LiteralUnion } from 'antd/es/_util/type';
import { PresetStatusColorType } from 'antd/es/_util/colors';
import { Checkbox, Modal, Radio, Table, Tag } from 'antd';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import tableStyle from '../../../styles/Table/table.module.scss';
import { AccountStatus, IAccount } from '@features/user-account/interfaces';
import { useUpdateAdvisorState } from '@features/advisor/hooks/update/useUpdateAdvisorState';
import { UpdateAdvisorPayload, useUpdateAdvisor } from '@features/advisor/hooks/update/useUpdateAdvisor';
import { GET_ADVISOR_ACCOUNTS } from '@features/advisor/hooks';
import NotificationService from '@lib/ant_service/NotificationService';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useDeleteAdvisor } from '@features/advisor/hooks/deleteAdvisor';
import { AddAdvisorFooter } from '@components/Manager/AdvisorAccount/AddAdvisorFooter';

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
    const [updateAdvisor, { data: submit_data, loading: update_loading, error: update_error }] = useUpdateAdvisor();
    const [deleteAdvisor, { loading: delete_loading, error: delete_error }] = useDeleteAdvisor();
    const { handleStatusChange, setUpdateObject, handleRoleChange, updateObject } = useUpdateAdvisorState();

    const [editingKey, setEditingKey] = useState('');
    const { confirm } = Modal;

    function handleInitChange(id: string, advisor_id: string, status: AccountStatus, is_committee: Boolean) {
        setEditingKey(id);
        setUpdateObject({ account_id: id, advisor_status: status, is_committee: is_committee });
    }

    async function handleSubmit() {
        const payload: UpdateAdvisorPayload = {
            payload: updateObject,
        };
        try {
            await updateAdvisor({
                variables: payload,
                refetchQueries: [GET_ADVISOR_ACCOUNTS],
                onError: (error) => {
                    NotificationService.getInstance().error('พบข้อผิดพลาด', error.message);
                },
                onCompleted: (data) => {
                    NotificationService.getInstance().success('แก้ไขเสร็จสิ้น', `แก้ไข ${data.updateAdvisorAccount.email} เสร็จสิ้น`);
                    setEditingKey('');
                    setUpdateObject(null);
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    const showDeleteAdvisorModal = (advisor_id: string, email: string) => {
        confirm({
            title: `Warning`,
            icon: <ExclamationCircleFilled />,
            content: `คุณต้องการที่จะลบบัญชี ${email} ใช่หรือไม่ ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                deleteAdvisor({
                    variables: { account_id: advisor_id },
                    onError: (error, clientOptions) => {
                        NotificationService.getInstance().error('พบข้อผิดพลาด', error.message);
                    },
                    onCompleted: () => {
                        NotificationService.getInstance().success('ลบบัญชีเสร็จสิ้น', '');
                    },
                })
                    .then()
                    .catch();
            },
            onCancel() {},
        });
    };

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
                                <Checkbox onChange={(e) => handleRoleChange(e.target.checked)} defaultChecked={is_advisor.is_committee}>
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
            render: (value, { id, email, is_advisor, role, status }, index) => {
                return (
                    <div className={'flex flex-row gap-4 justify-center align-middle items-center '}>
                        {editingKey === id ? (
                            <div className={'flex flex-row gap-x-1'}>
                                <div className="flex flex-row items-center align-middle w-full gap-x-3 justify-center cursor-pointer">
                                    <p className={'text-[16px] '} onClick={() => setEditingKey('')}>
                                        ยกเลิก
                                    </p>
                                    <p
                                        onClick={handleSubmit}
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
                                <div onClick={() => showDeleteAdvisorModal(id, email)} className="cursor-pointer">
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
            <Table
                bordered={true}
                size={'large'}
                rowClassName={rowClassname}
                className={tableStyle.customTable}
                columns={advisor_account_column}
                dataSource={advisor_accounts}
                loading={delete_loading && update_loading}
                footer={() => <AddAdvisorFooter />}
            />
        </>
    );
};

export default AdvisorAccountTable;
