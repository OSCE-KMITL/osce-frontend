import React, { FC, useContext } from 'react';
import { getAdvisorAccounts } from '@features/advisor/hooks';
import AdvisorAccountTable from '@components/Manager/AdvisorAccount/AdvisorAccountTable';
import { Divider } from 'antd';
import { AuthenticationContext } from '@context/AuthContextProvider';

interface OwnProps {}

type Props = OwnProps;

const AdvisorAccount: FC<Props> = (props) => {
    const { data, loading, error } = getAdvisorAccounts();
    const { me } = useContext(AuthenticationContext);
    if (loading) {
        return <p>loading</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }
    const filtered_data = data.getAdvisorAccounts.filter((acccount) => acccount.id !== me.id);
    return (
        <div>
            <div className={'w-full flex flex-row gap-x-6 items-center align-bottom'}>
                <h1>จัดการบัญชีอาจารย์สหกิจ</h1>
                <p className="px-4 py-2 rounded-lg text-[25px] bg-white shadow-sm text-primary-500 font-semibold ">
                    ภาควิชา : {me.is_advisor ? me.is_advisor?.department?.department_name_th : '-'}
                </p>{' '}
            </div>
            <Divider />
            <AdvisorAccountTable advisor_accounts={filtered_data} />
        </div>
    );
};

export default AdvisorAccount;
