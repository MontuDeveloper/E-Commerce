import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valide")
      .required("Email is required"),
    password: Yup.string().required("password is requied"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      dispatch(login(values));
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { isLoading, isError, user, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user === null) {
      navigate(" ");
    } else {
      navigate("admin");
    }
  }, [isLoading, isError, user, isSuccess, navigate]);

  return (
    <div className="py-5" style={{ background: "#006666", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h4 className="text-center">Login</h4>
        <p className="text-center">login to your account for contine</p>
        <div className="text-center">
          {message.message === "Regected" ? "you are a not a admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="name"
            val={formik.values.email}
            onChng={formik.handleChange("email")}
          />
          <div className="text-danger" style={{ fontSize: "14px" }}>
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput
            type="password"
            label="password"
            id="pass"
            name="password"
            val={formik.values.password}
            onChng={formik.handleChange("password")}
          />
          <div className="text-danger" style={{ fontSize: "14px" }}>
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-3 text-start">
            <Link to="/forget-password">Forget Password</Link>
          </div>
          <button
            type="submit"
            className="border-0 px-3 py-2 text-white w-100 text-decoration-none text-center"
            style={{ background: "#006666" }}
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
