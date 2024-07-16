import React, { useEffect, useState } from "react";
import { Divider, Radio, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteACoupon, getAllCoupon } from "../features/coupon/couponSlice";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import CustomModal from "../components/CustomModal";

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
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllCoupon());
  }, []);

  const couponState = useSelector((state) => state.coupon.coupons);

  const data = [];

  for (let i = 0; i < couponState.length; i++) {
    data.push({
      key: i + 1,
      name: couponState[i].name,
      discount: couponState[i].discount,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      action: (
        <>
          <Link
            to={`/admin/coupon/${couponState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(couponState[i]._id)}
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }

  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getAllCoupon());
    }, 100);
  };

  return (
    <>
      <h3>Coupon list</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCoupon(couponId);
        }}
        title="Are you sure you want to delete this coupon?"
      />
    </>
  );
};

export default CouponList;
