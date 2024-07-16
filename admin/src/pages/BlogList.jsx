import React, { useEffect, useState } from "react";
import { Divider, Radio, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, getBlogs, resetState } from "../features/blog/blogSlice";
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
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, [dispatch]);

  const getBlogState = useSelector((state) => state.blogs.blogs);

  const data = getBlogState.map((item) => ({
    key: item._id || Math.random().toString(36).substring(2, 15), // Use a unique ID if available
    name: item.title,
    category: item.category,
    action: (
      <>
        <Link to={`/admin/blog/${item._id}`} className=" fs-3 text-danger">
          <FiEdit />
        </Link>
        <button
          to=""
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(item._id)}
        >
          <MdDelete />
        </button>
      </>
    ),
  }));

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
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
          deleteBlog(blogId);
        }}
        title="Are you sure you want to delete this blog?"
      />
    </>
  );
};

export default BlogList;
