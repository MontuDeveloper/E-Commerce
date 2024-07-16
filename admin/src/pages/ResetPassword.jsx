import React from "react";
import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#006666", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h4 className="text-center">Reset password</h4>
        <p className="text-center">Reset your password</p>
        <form action="">
          <CustomInput type="password" label="Enter Password" id="email" />
          <CustomInput type="password" label="conform Password" id="email" />
          <button
            type="submit"
            className="border-0 px-3 py-2 text-white w-100"
            style={{ background: "#006666" }}
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
