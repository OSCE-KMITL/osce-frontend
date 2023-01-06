import React from "react";
import { ScriptProps } from "next/script";
import { useQueryAccounts } from "../features/account/hooks/useQueryAccounts";
import AccountsTable from "../components/account-table/accountsTable";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

const accounts: React.FC<ScriptProps> = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading, error } = useQueryAccounts();

  if (error) {
    return <h1>err</h1>;
  }
  if (loading) {
    return <h1>loading</h1>;
  }

  return (
    <div className="w-100 px-16 flex flex-col mt-16 gap-2">
      {contextHolder}
      <h1
        onClick={() => openNotificationWithIcon("error")}
        className="font-bold text-2xl"
      >
        Accounts Table
      </h1>
      <AccountsTable loading={loading} data_source={data.getAccounts!} />
    </div>
  );
};

export default accounts;
