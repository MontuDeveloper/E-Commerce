import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    render: (amount) => `$${amount.toFixed(2)}`, // Format amount as currency
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, []);

  const orderState = useSelector((state) => state.auth.orderByUser);
  const products = orderState ? orderState.products : [];

  const data = products.map((item, index) => ({
    key: index + 1,
    name: item.product.title,
    brand: item.product.brand,
    count: item.count,
    amount: item.product.price, // Assuming price is in the product object
    color: item.product.color,
    date: item.product.createdAt,
  }));

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ViewOrder;
