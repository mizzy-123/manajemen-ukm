"use client";

import { useState } from "react";
import PostForgotPassword from "../../../api/postForgotPassword";
import saveEmail from "@/cookie/saveEmail";

export default function ActionReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState("");
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
          const responseForgotPassword = await PostForgotPassword({ email });
          try {
            if (responseForgotPassword.status == 200) {
              setMessage(responseForgotPassword.data.message);
              setAlertSuccess(true);
              setAlert(false);
              setLoading(false);
              saveEmail({ email: email });
              //   router;
            }
          } catch (error) {
            setMessage(error.response.data.message);
            setAlert(true);
            setAlertSuccess(false);
            setLoading(false);
          }
        }}
      >
        <div className="form-group">
          <div className="form-label-group">
            <label className="form-label" htmlFor="default-01">
              Email
            </label>
            {/* <a className="link link-primary link-sm" href="#">
            Need Help?
          </a> */}
          </div>
          <div className="form-control-wrap">
            <input
              type="text"
              name="email"
              value={email}
              className="form-control form-control-lg"
              id="default-01"
              placeholder="Enter your email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
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
              "Send Reset Link"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
