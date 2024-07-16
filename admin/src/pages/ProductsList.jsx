import React, { useEffect, useState } from "react";
import { Divider, Radio, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    render: (text) => <a>{text}</a>,
    defaultSortOrder: "descend",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price.length - b.pirce.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);

  const data = [];

  for (let i = 0; i < productState.length; i++) {
    data.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: `${productState[i].price}`,
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <FiEdit />
          </Link>
          <Link to="" className="ms-3 fs-3 text-danger">
            <MdDelete />
          </Link>
        </>
      ),
    });
  }

  return (
    <>
      <h3>product list</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default ProductsList;
