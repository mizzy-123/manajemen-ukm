"use client";

import GetRole from "@/api/getRole";
import LoginAccount from "@/api/login";
import SaveRole from "@/cookie/saveRole";
import saveToken from "@/cookie/saveToken";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ActionLogin() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await LoginAccount({ account: account, password: password });
      const responseRole = await GetRole({ token: response.data.token });
      if (response && response.status === 200 && response.data && responseRole) {
        setPassword("");
        setAccount("");
        console.log(response.data);
        saveToken({ token: response.data.token });
        SaveRole({ role: responseRole.data.data[0].id });
        // setTimeout(() => {
        //   redirect("/dashboard");
        // }, 3000);
        // window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;
      }
      router.prefetch("/dashboard");
      setTimeout(() => {
        location.reload(true);
      }, 3000);
    } catch (error) {
      console.log(error);
      setAlertMessage(error.response.data.message);
      setAlert(true);
      setLoading(false);
    }
  }
  return (
    <>
      {alert ? (
        <div className="alert alert-danger" role="alert">
          {alertMessage}
        </div>
      ) : (
        ""
      )}
      <form onSubmit={(e) => handleSubmit(e)} action="#" className="form-validate is-alter" autoComplete="off">
        <div className="form-group">
          <div className="form-label-group">
            <label className="form-label" htmlFor="email-address">
              Email or NIM
            </label>
            <a className="link link-primary link-sm" tabIndex="-1" href="#">
              Need Help?
            </a>
          </div>
          <div className="form-control-wrap">
            <input value={account} onChange={(e) => setAccount(e.target.value)} autoComplete="off" type="text" className="form-control form-control-lg" required id="email-address" placeholder="Enter your email address or username" />
            <div className="invalid-feedback">halo</div>
          </div>
        </div>
        {/* <!-- .form-group --> */}
        <div className="form-group">
          <div className="form-label-group">
            <label className="form-label" htmlFor="password">
              Passcode
            </label>
            <a className="link link-primary link-sm" tabIndex="-1" href="html/pages/auths/auth-reset.html">
              Forgot Code?
            </a>
          </div>
          <div className="form-control-wrap">
            <a tabIndex="-1" href="#" className="form-icon form-icon-right passcode-switch lg" data-target="password">
              <em className="passcode-icon icon-show icon ni ni-eye"></em>
              <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
            </a>
            <input value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" type="password" className="form-control form-control-lg" required id="password" placeholder="Enter your passcode" />
            <div className="invalid-feedback">halo</div>
          </div>
        </div>
        {/* <!-- .form-group --> */}
        <div className="form-group">
          <button className="btn btn-lg btn-primary btn-block" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
