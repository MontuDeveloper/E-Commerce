import React, { useEffect, useState } from "react";
import { Divider, Radio, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABlogCtrl,
  getCategories,
} from "../features/bCategory/bcategorySlice";
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
    title: "Action",
    dataIndex: "action",
  },
];

const Blogcatlist = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [bcatId, setbcatId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setbcatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const bCatState = useSelector((state) => state.bCategory.bCatagories);

  const data = bCatState.map((item) => ({
    key: item._id || Math.random().toString(36).substring(2, 15), // Use a unique ID if available
    name: item.title,
    action: (
      <>
        <Link
          to={`/admin/blog-category/${item._id}`}
          className=" fs-3 text-danger"
        >
          <FiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(item._id)}
        >
          <MdDelete />
        </button>
      </>
    ),
  }));

  const deleteBlogct = (e) => {
    dispatch(deleteABlogCtrl(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };
  return (
    <>
      <h3>brand list</h3>
      <div>
        <Table columns={columns} dataSource={data} />
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteBlogct(bcatId);
          }}
          title="Are you sure you want to delete this blog category?"
        />
      </div>
    </>
  );
};

export default Blogcatlist;
