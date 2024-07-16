import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createNewBlogCtrl,
  getABlogCtrl,
  resetState,
  updateBlogCtrl,
} from "../features/bCategory/bcategorySlice";

const validationSchema = Yup.object({
  title: Yup.string().required("Blog Catagory name is required"),
});

const AddBlogcty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getBlodcatId = location.pathname.split("/")[3];
  const newBlogcat = useSelector((state) => state.bCategory);

  const { blogCatName, isSuccess } = newBlogcat;

  useEffect(() => {
    if (getBlodcatId !== undefined) {
      dispatch(getABlogCtrl(getBlodcatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlodcatId]);

  const handleSubmit = (values, { resetForm }) => {
    if (getBlodcatId !== undefined) {
      const data = { id: getBlodcatId, blogCatData: values };
      dispatch(updateBlogCtrl(data));
    } else {
      dispatch(createNewBlogCtrl(values));
    }

    if (isSuccess) {
      navigate("/admin/blog-category-list");
    }
  };

  return (
    <>
      <h3>{getBlodcatId !== undefined ? "Edit" : "Add"}Blog Category</h3>
      <Formik
        enableReinitialize
        initialValues={{
          title: getBlodcatId ? blogCatName : "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div className="mt-4">
              <Field
                type="text"
                name="title"
                placeholder="Blog Category Name"
                className="form-control"
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>
            <div className="mt-4">
              <button className="btn btn-success" type="submit">
                {getBlodcatId !== undefined ? "Edit" : "Add"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddBlogcty;
