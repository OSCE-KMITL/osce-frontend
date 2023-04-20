import React, { FC } from 'react';
import { useGetAllCompany } from '@features/company/hooks/useGetCompanys';
import { Divider, Table } from 'antd';
import CompanyAccountTable from '@components/Manager/CompanyAccount/CompanyAccountTable';

interface OwnProps {}

type Props = OwnProps;

const AdvisorAccount: FC<Props> = (props) => {
    const { data, loading, error } = useGetAllCompany();
    if (loading) return <p>loading ...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            <h1>จัดการบัญชีผู้ใช้ของบริษัท</h1>
            <Divider />
            <CompanyAccountTable companies={data.getAllCompanies ? data.getAllCompanies : null} loading={loading} />
        </div>
    );
};

export default AdvisorAccount;
