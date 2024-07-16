import React from "react";
import CustomInput from "../components/CustomInput";

const ForgetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#006666", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h4 className="text-center">Forgot password</h4>
        <p className="text-center">enter a register email</p>
        <form action="">
          <CustomInput type="text" label="Email Address" id="email" />
          <button
            type="submit"
            className="border-0 px-3 py-2 text-white w-100"
            style={{ background: "#006666" }}
          >
            send mail
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
