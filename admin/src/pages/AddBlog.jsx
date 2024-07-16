import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getCategories } from "../features/bCategory/bcategorySlice";
import { delImg, uploadonImg } from "../features/upload/uploadSlice";
import {
  createBlog,
  getABlog,
  resetState,
  updateBlog,
} from "../features/blog/blogSlice";
import ReactQuill from "react-quill";

const validationSchema = Yup.object({
  title: Yup.string().required("Blog name is required"),
  // description: Yup.string().required("Blog description is required"),
  category: Yup.string().required("Blog is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getBlogId = location.pathname.split("/")[3];
  const bCatState = useSelector((state) => state.bCategory.bCatagories);
  const imgState = useSelector((state) => state.upload.images);
  const blogState = useSelector((state) => state.blogs);

  const [disc, setDisc] = useState("");

  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    blogTitle,
    blogDesc,
    blogCat,
    blogImg,
    updatedBlog,
  } = blogState;

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfullly!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleImageUpload = async (acceptedFiles) => {
    dispatch(uploadonImg(acceptedFiles));
  };

  const img = blogImg ? blogImg : [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  const handleSubmit = async (values, { resetForm }) => {
    const blogData = {
      ...values,
      images: img,
      description: disc,
    };
    console.log(blogData);

    if (getBlogId !== undefined) {
      const data = { id: getBlogId, blogData: blogData };
      dispatch(updateBlog(data));
    } else {
      dispatch(createBlog(blogData));
    }
    if (isSuccess) {
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-list");
      }, 300);
    }
  };

  return (
    <div>
      <h1>Add Blog</h1>
      <Formik
        enableReinitialize
        initialValues={{
          title: getBlogId ? blogTitle : "",
          description: getBlogId ? blogDesc : "",
          category: getBlogId ? blogCat : "",
          images: {},
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div className="mb-4">
              <Field
                type="text"
                name="title"
                placeholder="Blog Name"
                className="form-control"
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div className="mb-4">
              <ReactQuill
                theme="snow"
                name="description"
                onChange={(e) => {
                  setDisc(e);
                }}
                value={disc}
                placeholder="write a description here..."
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </div>

            <div className="mb-4">
              <Field
                as="select"
                name="category"
                value={values.category}
                className="form-control"
              >
                <option>-- Select Category --</option>
                {bCatState.map((i, j) => (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
                ))}
              </Field>
            </div>

            <div className="bg-white border-1 p-5 text-center mb-4">
              <Dropzone onDrop={handleImageUpload} value={values.images}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>

            <div className="flex gap-2 overflow-x-auto h-32 border rounded">
              {img.map((image, i) => {
                return (
                  <div key={i} className=" position-relative">
                    <button
                      type="button"
                      onClick={() => dispatch(delImg(i.public_id))}
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img
                      draggable="false"
                      src={image.url}
                      alt="Product"
                      className="object-contain"
                      width={200}
                      height={200}
                    />
                  </div>
                );
              })}
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding Product..." : "Add Product"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBlog;
