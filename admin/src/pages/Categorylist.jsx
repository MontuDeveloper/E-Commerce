import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteACategory,
} from "../features/pCategory/pcategorySlice";
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
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Catagorylist = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const pCatagoryState = useSelector((state) => state.pCategory.pCatagories);

  const data = pCatagoryState.map((item) => ({
    key: item._id,
    name: item.title,
    action: (
      <>
        <Link className="fs-3 text-danger" to={`/admin/category/${item._id}`}>
          <FiEdit />
        </Link>
        <button
          to="#"
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(item._id)}
        >
          <MdDelete />
        </button>
      </>
    ),
  }));

  const deleteCategory = (e) => {
    dispatch(deleteACategory(e));
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
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(pCatId);
        }}
        title="Are you sure you want to delete this category ?"
      />
    </>
  );
};

export default Catagorylist;
