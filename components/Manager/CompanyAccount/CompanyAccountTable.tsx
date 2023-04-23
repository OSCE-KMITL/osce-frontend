import React, { FC, useState } from 'react';
import { ICompany } from '@features/company/interfaces';
import { Checkbox, Modal, Radio, Table, Tag } from 'antd';
import { ColumnsType, ColumnType } from 'antd/es/table';
import { DocumentTextIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import AddCompanyDrawer from '@components/Manager/CompanyAccount/AddCompanyDrawer';
import { ExclamationCircleFilled } from '@ant-design/icons';
import NotificationService from '@lib/ant_service/NotificationService';
import { useDeleteCompany } from '@features/company/hooks/useDeleteCompany';
import { rowClassname } from '../AdvisorAccount/AdvisorAccountTable';

interface OwnProps {
    companies: ICompany[] | null | undefined;
    loading: boolean;
}
type CompanyAccountTableType = OwnProps;

const CompanyAccountTable: FC<CompanyAccountTableType> = ({ companies, loading }) => {
    const [editingKey, setEditingKey] = useState('');
    const [deleteCompany, { loading: delete_loading }] = useDeleteCompany();
    const { confirm } = Modal;
    const showDeleteCompanyModal = (company_id: string, name: string) => {
        confirm({
            title: `Warning`,
            icon: <ExclamationCircleFilled />,
            content: `คุณต้องการที่จะลบบัญชี ${name} ใช่หรือไม่ ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteCompany({
                    variables: { company_id: company_id },
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

    const companies_columns: ColumnsType<ICompany> = [
        {
            title: 'ชื่อบริษัท',
            dataIndex: 'name_eng',
            render: (value, { name_eng }, index) => {
                return <>{name_eng}</>;
            },
        },
        {
            title: 'อีเมลผู้ประสานงาน',
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
            title: 'เบอร์โทร',
            dataIndex: 'tel',
            render: (value, { company_persons }, index) => {
                return <>{company_persons.length === 0 ? '-' : company_persons[0].phone_number}</>;
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 140,
            align: 'center',
            className: '',
            render: (value, { id, name_eng }, index) => {
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
                                <div onClick={() => showDeleteCompanyModal(id, name_eng)} className="cursor-pointer">
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
        <Table
            rowClassName={rowClassname}
            dataSource={companies || null}
            loading={loading}
            columns={companies_columns}
            footer={() => (
                <>
                    <AddCompanyDrawer />
                </>
            )}
        />
    );
};

export default CompanyAccountTable;
