import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createColor,
  getAColor,
  resetState,
  updateAColor,
} from "../features/color/colorSlice";

const validationSchema = Yup.object({
  title: Yup.string().required("color is required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getColorId = location.pathname.split("/")[3];
  const newColorSta = useSelector((state) => state.color);

  const { colorName, isSuccess } = newColorSta;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  const handleSubmit = (values, { resetForm }) => {
    if (getColorId !== undefined) {
      const data = { id: getColorId, colorData: values };
      dispatch(updateAColor(data));
      console.log(data);
    } else {
      dispatch(createColor(values));
    }
    if (isSuccess) {
      navigate("/admin/list-color"); // Navigate on success
    }
  };

  return (
    <>
      <h3>{getColorId !== undefined ? "Edit" : "Add"} color</h3>
      <Formik
        enableReinitialize
        initialValues={{
          title: getColorId ? colorName : "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div className="mt-4">
              <Field
                type="color"
                name="title"
                placeholder="color Name"
                className="form-control"
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>
            <div className="mt-4">
              <button className="btn btn-success" type="submit">
                {getColorId !== undefined ? "Edit" : "Add"}
                ADD
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddColor;
