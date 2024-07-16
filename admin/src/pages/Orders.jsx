import React, { useEffect, useState } from "react";
import { Divider, Radio, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const OrderState = useSelector((state) => state.auth.orders);

  const data = [];
  for (let i = 0; i < OrderState.length; i++) {
    data.push({
      key: i + 1,
      name: OrderState[i].orderby.name,
      product: OrderState[i].products.map((i, j) => {
        return (
          <>
            <ul>
              <li>{i.product.title}</li>
            </ul>
          </>
        );
      }),
      amount: OrderState[i].paymentIntent.amount,
      date: new Date(OrderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <Link
            to={`/admin/orders/${OrderState[i].orderby._id}`}
            className="text-danger"
          >
            View Order
          </Link>
        </>
      ),
    });
  }

  return (
    <>
      <h3>Order list</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default Orders;
