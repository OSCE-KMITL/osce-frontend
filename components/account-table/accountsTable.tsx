import { Table } from "antd";
import React from "react";
import { Account } from "../../src/__generated__/graphql";
import { ColumnsType } from "antd/es/table";
import { column_type } from "./column-type";

interface AccountTable {
  data_source: Account[];
  loading: boolean;
}

type AccountTableProps = AccountTable;

const AccountsTable: React.FC<AccountTableProps> = ({
  data_source,
  loading,
}) => {
  return (
    <Table
      rowClassName={(record, index) =>
        index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"
      }
      dataSource={data_source}
      columns={column_type}
      loading={loading}
    ></Table>
  );
};

export default AccountsTable;
