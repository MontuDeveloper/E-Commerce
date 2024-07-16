import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../features/coupon/couponSlice";

const validationSchema = Yup.object({
  name: Yup.string().required("Coupon name is required"),
  expiry: Yup.date().required("Expiry Date is Required"),
  discount: Yup.number().required("Discount Percentage is Required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);

  const { isSuccess, createdCoupon, couponName, couponDiscount, couponExpiry } =
    newCoupon;

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    if (getCouponId !== undefined) {
      const data = { id: getCouponId, couponData: values };
      dispatch(updateACoupon(data));
    } else {
      dispatch(createCoupon(values));
    }
    if (isSuccess) {
      navigate("/admin/coupon-list");
    }
  };

  return (
    <>
      <h3>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
      <Formik
        enableReinitialize
        initialValues={{
          name: getCouponId ? couponName : "",
          expiry: getCouponId ? changeDateFormat(couponExpiry) : "",
          discount: getCouponId ? couponDiscount : "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div className="mt-4">
              <Field
                type="text"
                name="name"
                placeholder="Product Name"
                className="form-control"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="mt-4">
              <Field
                type="date"
                name="expiry"
                placeholder="expiry date"
                className="form-control"
              />
              <ErrorMessage name="expiry" component="div" className="error" />
            </div>

            <div className="mt-4">
              <Field
                type="number"
                name="discount"
                placeholder="Discount Percentage"
                className="form-control"
              />
              <ErrorMessage name="discount" component="div" className="error" />
            </div>

            <div className="mt-4">
              <button className="btn btn-success" type="submit">
                {getCouponId !== undefined ? "Edit" : "Add"} Coupon
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddCoupon;
