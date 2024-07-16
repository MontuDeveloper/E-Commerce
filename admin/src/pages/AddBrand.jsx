import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createBrand,
  getABrand,
  resetState,
  updateBrand,
} from "../features/brand/brandSlice";

const validationSchema = Yup.object({
  title: Yup.string().required("Product name is required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  const handleSubmit = (values, { resetForm }) => {
    if (getBrandId !== undefined) {
      const data = { id: getBrandId, brandData: values };
      dispatch(updateBrand(data));
    } else {
      dispatch(createBrand(values));
    }
    if (isSuccess) {
      navigate("/admin/list-brand"); // Navigate on success
    }
  };

  return (
    <>
      <h3>{getBrandId !== undefined ? "Edit" : "Add"} Brand</h3>
      <Formik
        enableReinitialize
        initialValues={{
          title: getBrandId ? brandName : "",
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
                placeholder="Product Name"
                className="form-control"
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>
            <div className="mt-4">
              <button className="btn btn-success" type="submit">
                {getBrandId !== undefined ? "Edit" : "Add"} Brand
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddBrand;
