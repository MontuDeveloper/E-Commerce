import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createCategory,
  getACategory,
  updataCategory,
} from "../features/pCategory/pcategorySlice";

const validationSchema = Yup.object({
  title: Yup.string().required("Category name is required"),
});

const AddProductcty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getCatId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.pCategory);

  const { categoryName, isSuccess } = newCategory;

  useEffect(() => {
    if (getCatId !== undefined) {
      dispatch(getACategory(getCatId));
    }
  }, [getCatId]);

  const handleSubmit = (values, { resetForm }) => {
    if (getCatId !== undefined) {
      const data = { id: getCatId, pcatData: values };
      dispatch(updataCategory(data));
    } else {
      dispatch(createCategory(values));
    }
    if (isSuccess) {
      navigate("/admin/list-category");
    }
  };

  return (
    <>
      <h3>{getCatId !== undefined ? "Edit" : "Add"} Product Category</h3>
      <Formik
        enableReinitialize
        initialValues={{
          title: getCatId ? categoryName : "",
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
                placeholder="Category Name"
                className="form-control"
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>
            <div className="mt-4">
              <button className="btn btn-success" type="submit">
                {getCatId !== undefined ? "Edit" : "Add"} Category
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddProductcty;
