import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAColor,
  getColors,
  resetState,
} from "../features/color/colorSlice";
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

const ColorList = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);

  const ColorState = useSelector((state) => state.color.colors);

  const data = ColorState.map((color) => ({
    key: color._id,
    name: color.title,

    action: (
      <>
        <Link to={`/admin/color/${color._id}`} className=" fs-3 text-danger">
          <FiEdit />
        </Link>
        <button
          to=""
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(color._id)}
        >
          <MdDelete />
        </button>
      </>
    ),
  }));

  const deleteColor = (e) => {
    dispatch(deleteAColor(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
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
          deleteColor(colorId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </>
  );
};

export default ColorList;
