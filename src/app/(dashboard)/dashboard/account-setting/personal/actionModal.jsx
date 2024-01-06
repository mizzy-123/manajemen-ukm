"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./actionPage";
import PostChangePassword from "@/api/postChangePassword";
import PostChangeProfile from "@/api/postChangeProfile";
import { useRouter } from "next/navigation";

export default function ActionModal() {
  const { token, roleid, profile } = useContext(AppContext);
  const refSubmit = useRef(null);
  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [messageInvalid, setMessageInvalid] = useState({});
  const [profileUser, setProfileUser] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoadingProfile(true);
    setProfileUser(profile);
    setLoadingProfile(false);
  }, [profile]);
  return (
    <>
      <div className="modal fade" role="dialog" id="profile-edit">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
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
            <a href="#" className="close" data-bs-dismiss="modal" aria-label="Close" ref={refSubmit}>
              <em className="icon ni ni-cross-sm"></em>
            </a>
            <div className="modal-body modal-body-lg">
              <h5 className="title">Update Profile</h5>
              <ul className="nk-nav nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" data-bs-toggle="tab" href="#personal">
                    Personal
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="personal">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setLoading(true);
                      setInvalid(false);
                      const formData = new FormData(e.currentTarget);
                      const name = formData.get("name");
                      const nim = formData.get("nim");
                      const no_telepon = formData.get("no_telepon");

                      try {
                        const response = await PostChangeProfile({ token: token, name: name, nim: nim, no_telepon: no_telepon });
                        if (response.status == 200) {
                          setMessage(response.data.message);
                          setAlertSuccess(true);
                          setAlert(false);
                          setLoading(false);
                          setTimeout(() => {
                            setAlertSuccess(false);
                            setAlert(false);
                            refSubmit.current.click();
                            router.refresh();
                          }, 2000);
                        }
                      } catch (error) {
                        if (error.response.status == 500) {
                          setMessage(error.response.data.message);
                          setAlert(true);
                          setAlertSuccess(false);
                          setLoading(false);
                        } else if (error.response.status == 400) {
                          setMessageInvalid(error.response.data.message);
                          setInvalid(true);
                          setLoading(false);
                        } else {
                          setMessage(error.response.data.message);
                          setAlert(true);
                          setAlertSuccess(false);
                          setLoading(false);
                        }
                        console.log(error.response.data.message);
                      }
                    }}
                  >
                    <div className="row gy-4">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="full-name">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className={`form-control form-control-lg ${invalid && messageInvalid?.name?.[0] ? "is-invalid" : ""}`}
                            id="full-name"
                            value={!loadingProfile ? profileUser.data.name : ""}
                            placeholder="Enter Full name"
                            onChange={(e) => {
                              setProfileUser({ ...profileUser, data: { ...profileUser.data, name: e.target.value } });
                            }}
                          />
                          {invalid && <div className="invalid-feedback">{messageInvalid?.name?.[0] !== undefined ? messageInvalid.name[0] : ""}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="display-name">
                            NIM
                          </label>
                          <input
                            type="text"
                            name="nim"
                            className={`form-control form-control-lg ${invalid && messageInvalid?.nim?.[0] ? "is-invalid" : ""}`}
                            id="display-name"
                            value={!loadingProfile ? profileUser.data.nim : ""}
                            placeholder="Enter display name"
                            onChange={(e) => {
                              setProfileUser({ ...profileUser, data: { ...profileUser.data, nim: e.target.value } });
                            }}
                          />
                          {invalid && <div className="invalid-feedback">{messageInvalid?.nim?.[0] !== undefined ? messageInvalid.nim[0] : ""}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="phone-no">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            name="no_telepon"
                            className={`form-control form-control-lg ${invalid && messageInvalid?.no_telepon?.[0] ? "is-invalid" : ""}`}
                            id="phone-no"
                            value={!loadingProfile && profileUser.data.no_telepon !== null ? profileUser.data.no_telepon : ""}
                            placeholder="Phone Number"
                            onChange={(e) => {
                              setProfileUser({ ...profileUser, data: { ...profileUser.data, no_telepon: e.target.value } });
                            }}
                          />
                          {invalid && <div className="invalid-feedback">{messageInvalid?.no_telepon?.[0] !== undefined ? messageInvalid.no_telepon[0] : ""}</div>}
                        </div>
                      </div>
                      <div className="col-12">
                        <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                          <li>
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
                          </li>
                          <li>
                            <a href="#" data-bs-dismiss="modal" className="link link-light">
                              Cancel
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
