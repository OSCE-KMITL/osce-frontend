import React, { FC } from 'react';
import { getAdvisorAccounts } from '@features/advisor/hooks';
import AdvisorAccountTable from '@components/Manager/AdvisorAccount/AdvisorAccountTable';
import { Divider } from 'antd';

interface OwnProps {}

type Props = OwnProps;

const AdvisorAccount: FC<Props> = (props) => {
    const { data, loading, error } = getAdvisorAccounts();
    if (error) {
        console.log(JSON.stringify(error.message));
        return <p>error</p>;
    }
    if (loading) {
        return <p>loading</p>;
    }
    console.log(data);
    return (
        <div>
            <div className={'w-full flex flex-row gap-x-6 items-center align-bottom'}>
                <h1>จัดการบัญชีอาจารย์สหกิจ</h1>
                <p className="px-4 py-2 rounded-lg text-[25px] bg-white shadow-sm text-primary-500 font-semibold ">ภาควิชา : วิศวะกรรมคอมพิวเตอร์</p>
            </div>
            <Divider />
            <AdvisorAccountTable advisor_accounts={data.getAdvisorAccounts} />
        </div>
    );
};

export default AdvisorAccount;
