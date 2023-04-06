import React, { useEffect } from 'react';

import { message } from 'antd';
import { useGetAccounts } from '@features/account/hooks/useGetAccounts';
import UserAccountTable from '@components/Accounts/UserAccountTable';

const Accounts: React.FC = () => {
    const { data, loading, error } = useGetAccounts();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {}, [data, error]);

    if (loading) {
        return <h1>loading</h1>;
    }

    return (
        <div className="w-full px-16 flex flex-col mt-16 gap-2 ">
            {contextHolder}
            <h1 className="font-bold text-2xl">Accounts Table</h1>
            <div className="w-full">{!error && <UserAccountTable loading={loading} datasource={data.getAccounts!} />}</div>
        </div>
    );
};

export default Accounts;
