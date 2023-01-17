import React, { useEffect } from 'react';
import UserAccountTable from '../components/Accounts/UserAccountTable';
import { message } from 'antd';
import { useQueryAccounts } from '../features/account/hooks/useQueryAccounts';

const accounts: React.FC = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useQueryAccounts();
    const [messageApi, contextHolder] = message.useMessage();

    const push_error_notication = (content: string) => {
        messageApi.open({
            type: 'error',
            content: content,
            className: '',
        });
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (error) {
            push_error_notication(error.message);
        }
    }, [data, error]);

    if (loading) {
        return <h1>loading</h1>;
    }

    return (
        <div className="w-full px-16 flex flex-col mt-16 gap-2 ">
            {contextHolder}
            <h1 onClick={() => push_error_notication('error')} className="font-bold text-2xl">
                Accounts Table
            </h1>
            <div className="w-full">{!error && <UserAccountTable loading={loading} data_source={data.getAccounts!} />}</div>
        </div>
    );
};

export default accounts;
