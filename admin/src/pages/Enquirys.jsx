import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquirys,
  getEnquirys,
  resetState,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import { Link } from "react-router-dom";
import { CiViewBoard } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import CustomModal from "../components/CustomModal";

//

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquirys = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquirys());
  }, []);

  const EnquriyState = useSelector((state) => state.enquriy.enquirys);

  const data = EnquriyState.map((item) => ({
    key: item._id || Math.random().toString(36).substring(2, 15), // Use a unique ID if available
    name: item.name,
    email: item.email,
    mobile: item.mobile,
    status: (
      <>
        <select
          name=""
          defaultValue={item.status ? item.status : "Submitted"}
          className="form-control form-select"
          id=""
          onChange={(e) => setEnquiryStatus(e.target.value, item._id)}
        >
          <option value="Submitted">Submitted</option>
          <option value="Contacted">Contacted</option>
          <option value="InProgress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </>
    ),
    action: (
      <>
        <button
          to=""
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(item._id)}
        >
          <MdDelete />
        </button>
        <Link
          to={`/admin/enquiries/${item._id}`}
          className="ms-3 fs-3 text-danger"
        >
          <CiViewBoard />
        </Link>
      </>
    ),
  }));

  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
  };

  const deletedEnquiry = (e) => {
    dispatch(deleteAEnquirys(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquirys());
    }, 100);
  };

  return (
    <>
      <h3>Enquiry list</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deletedEnquiry(enqId);
        }}
        title="Are you sure you want to delete this Enquiry ?"
      />
    </>
  );
};

export default Enquirys;
