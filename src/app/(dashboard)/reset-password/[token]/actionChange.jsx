"use client";

import PostChangeForgotPassword from "@/api/postChangeForgotPassword";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ActionChange({ token }) {
  //   const [email, setEmail] = useState("");
  const searchParams = useSearchParams();
  const emailparams = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState("");
  console.log("emailparams", emailparams);
  return (
    <>
      {alert ? (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      ) : (
        ""
      )}

      {alertSuccess ? (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      ) : (
        ""
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const formData = new FormData(e.currentTarget);
          const password = formData.get("password");
          const password_confirmation = formData.get("password_confirmation");
          try {
            const responseForgotPassword = await PostChangeForgotPassword({ email: emailparams, password: password, password_confirmation: password_confirmation, token: token });
            if (responseForgotPassword.status == 200) {
              setMessage(responseForgotPassword.data.message);
              setAlertSuccess(true);
              setAlert(false);
              setLoading(false);
              //   router;
              // router.push("/reset-password/success");
            }
          } catch (error) {
            if (error.response.data.message !== undefined) {
              setMessage(error.response.data.message);
            } else {
              setMessage(error.response.data.error);
            }
            console.log("error", error.response);
            setAlert(true);
            setAlertSuccess(false);
            setLoading(false);
          }
        }}
      >
        <div className="form-group">
          <div className="form-label-group">
            <label className="form-label" htmlFor="default-01">
              New Password
            </label>
            {/* <a className="link link-primary link-sm" href="#">
            Need Help?
          </a> */}
          </div>
          <div className="form-control-wrap">
            <input type="password" name="password" className="form-control form-control-lg" id="default-01" placeholder="Enter your email address" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-label-group">
            <label className="form-label" htmlFor="default-02">
              Konfirmasi password
            </label>
            {/* <a className="link link-primary link-sm" href="#">
            Need Help?
          </a> */}
          </div>
          <div className="form-control-wrap">
            <input type="password" name="password_confirmation" className="form-control form-control-lg" id="default-02" placeholder="Enter your email address" />
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-lg btn-primary btn-block" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
