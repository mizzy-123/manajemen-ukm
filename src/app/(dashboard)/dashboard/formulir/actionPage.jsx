"use client";

import { useRef, useState } from "react";
import ActionTable from "./actionTable";
import PostRecruitment from "@/api/postRecruitment";

export default function ActionPage({ token, roleid }) {
  //   const [closeModal, setCloseModal] = useState(false);
  const refSubmit = useRef(null);
  const [ukm, setUkm] = useState("");
  const [ukm_id, setUkmId] = useState(0);
  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const SaveSubmit = async (e) => {
    // setCloseModal(true);
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const organization_id = formData.get("organization_id");
    const expired = formData.get("expired");
    try {
      const response = await PostRecruitment({ token: token, organization_id: organization_id, expired: expired });
      if (response.status == 200) {
        setMessage(response.data.message);
        setAlertSuccess(true);
        setAlert(false);
        setLoading(false);
        formData.set("expired", "");
        setTimeout(() => {
          setAlertSuccess(false);
          setAlert(false);
          refSubmit.current.click();
        }, 2000);
      } else {
        setMessage(response.data.message);
        setAlert(true);
        setAlertSuccess(false);
        setLoading(false);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setAlert(true);
      setAlertSuccess(false);
      setLoading(false);
    }

    console.log(formData.get("expired"));
    console.log(formData.get("organization_id"));
  };
  return (
    <>
      <div className="nk-content ">
        <div className="container-fluid">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="components-preview wide-md mx-auto">
                <div className="nk-block-head nk-block-head-lg wide-sm">
                  <div className="nk-block-head-content">
                    <div className="nk-block-head-sub">
                      <a className="back-to" href="html/components.html">
                        <em className="icon ni ni-arrow-left"></em>
                        <span>Components</span>
                      </a>
                    </div>
                    <h2 className="nk-block-title fw-normal">Exclusive & Special Table</h2>
                    <div className="nk-block-des">
                      <p className="lead">
                        <strong>Softnio Team</strong> understand the value of <strong>real case-use</strong>, so our team designed some large content base table which is <strong>well optimized</strong> and fit on every screen. It gives you
                        extra ease on your project and surely you loved it.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="nk-block nk-block-lg">
                  <div className="nk-block-head d-flex justify-content-between">
                    <div className="nk-block-head-content">
                      <h4 className="nk-block-title">Transaction List - With Action</h4>
                      <p>
                        The following table can be use for <strong className="text-primary">invoice, payment history</strong> related transaction.
                      </p>
                    </div>
                    <div className="nk-block-head-content" data-bs-toggle="modal" data-bs-target="#modalForm">
                      <li className="nk-block-tools-opt">
                        <a href="#" className="btn btn-icon btn-primary d-md-none" onClick={(e) => e.preventDefault()}>
                          <em className="icon ni ni-plus"></em>
                        </a>
                        <a href="#" className="btn btn-primary d-none d-md-inline-flex" onClick={(e) => e.preventDefault()}>
                          <em className="icon ni ni-plus"></em>
                          <span>Add</span>
                        </a>
                      </li>
                    </div>
                  </div>
                  <ActionTable token={token} roleid={roleid.value} ukm={(data) => setUkm(data)} idukm={(data) => setUkmId(data)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modalForm">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
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
            <div className="modal-header">
              <h5 className="modal-title">Tambah rekruitment</h5>
              <a href="#" className="close" data-bs-dismiss="modal" aria-label="Close" ref={refSubmit}>
                <em className="icon ni ni-cross"></em>
              </a>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => SaveSubmit(e)}>
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">
                    UKM
                  </label>
                  <div className="form-control-wrap">
                    <input type="text" value={ukm} className="form-control" id="full-name" required readOnly />
                    <input name="organization_id" type="number" value={ukm_id} className="form-control" id="full-name" hidden />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Datepicker with Icon</label>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <em className="icon ni ni-calendar"></em>
                    </div>
                    <input name="expired" type="text" className="form-control date-picker" data-date-format="yyyy-mm-dd" required />
                  </div>
                  <div className="form-note">
                    Date format <code>yyyy-mm-dd</code>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-lg btn-primary" disabled={loading}>
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
            </div>
            <div className="modal-footer bg-light">
              <span className="sub-text">Modal Footer Text</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
