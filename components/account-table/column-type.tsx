import { ColumnsType } from "antd/es/table";
import { Account } from "../../src/__generated__/graphql";
import { Tag } from "antd";
import React from "react";

const display_name = (account: Account): string | undefined => {
  return (
    account.is_advisor?.name ||
    account.is_company?.full_name ||
    account.is_student?.name
  );
};
export const column_type: ColumnsType<Account> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "role",
    dataIndex: "role",
    key: "role",
    render: (_, acc) => (
      <Tag
        color={
          (acc.role == "ADVISOR" && "blue") ||
          (acc.role == "COMMITTEE" && "red") ||
          (acc.role == "STUDENT" && "green") ||
          "cyan"
        }
      >
        {acc.role.toLowerCase()}
      </Tag>
    ),
  },
  {
    title: "name",
    dataIndex: "name",
    key: "name",
    render: (_, acc) => <>{display_name(acc)}</>,
  },
];
