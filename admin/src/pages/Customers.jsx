import React, { useEffect, useState } from "react";
import { Divider, Radio, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customer/customerSlice";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const Customers = () => {
  const [selectionType, setSelectionType] = useState("checkbox");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const customerstate = useSelector((state) => state.customer.customers);

  const data = [];

  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
      data.push({
        key: i + 1,
        name: customerstate[i].name,
        age: customerstate[i].email,
        address: customerstate[i].mobile,
      });
    }
  }

  return (
    <>
      <h3>Customers</h3>
      <div>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
};

export default Customers;
