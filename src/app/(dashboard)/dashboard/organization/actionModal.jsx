"use client";

import { useContext, useRef, useState } from "react";
import { AppContext } from "./actionPage";
import useSWR from "swr";
import PostTambahUkm from "@/api/postTambahUkm";
import UpdateUkm from "@/api/updateUkm";

export default function ActionModal() {
  const { token, organization, setOrganization } = useContext(AppContext);

  const refSubmit = useRef(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [messageInvalid, setMessageInvalid] = useState({});

  //   const allRole = (...args) =>
  //     fetch(...args, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token.value}`,
  //         Accept: "application/json",
  //       },
  //     }).then((res) => res.json());

  //   const { data: dataAllRole, isLoading: loadingRole } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/all-role-except-sa`, allRole, {
  //     revalidateIfStale: true,
  //   });

  return (
    <>
      <div className="modal fade" id="modalTambahUkm">
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
              <h5 className="modal-title">Tambah organisasi</h5>
              <a href="#" className="close" data-bs-dismiss="modal" aria-label="Close" ref={refSubmit}>
                <em className="icon ni ni-cross"></em>
              </a>
            </div>
            <div className="modal-body">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setInvalid(false);
                  setLoading(true);
                  const formData = new FormData(e.currentTarget);
                  const nama_organisasi = formData.get("nama_organisasi");
                  const name = formData.get("name");
                  const nim = formData.get("nim");
                  const email = formData.get("email");
                  const password = formData.get("password");

                  try {
                    const response = await PostTambahUkm({ token: token.value, name_organization: nama_organisasi, name: name, nim: nim, email: email, password: password });
                    if (response.status == 200) {
                      setMessage(response.data.message);
                      setAlertSuccess(true);
                      setAlert(false);
                      setLoading(false);
                      setTimeout(() => {
                        setAlertSuccess(false);
                        setAlert(false);
                        refSubmit.current.click();
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
                    }
                    console.log(error.response.data.message);
                  }
                }}
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">
                    Nama ukm
                  </label>
                  <div className="form-control-wrap">
                    <input name="nama_organisasi" type="text" className={`form-control ${invalid && messageInvalid?.name_organization?.[0] ? "is-invalid" : ""}`} />
                    {invalid && <div className="invalid-feedback">{messageInvalid?.name_organization?.[0] !== undefined ? messageInvalid.name_organization[0] : ""}</div>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">
                    Nama admin ukm
                  </label>
                  <div className="form-control-wrap">
                    <input type="text" name="name" className={`form-control ${invalid && messageInvalid?.name?.[0] ? "is-invalid" : ""}`} />
                    {invalid && <div className="invalid-feedback">{messageInvalid?.name?.[0] !== undefined ? messageInvalid.name[0] : ""}</div>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">
                    NIM admin ukm
                  </label>
                  <div className="form-control-wrap">
                    <input type="text" name="nim" className={`form-control ${invalid && messageInvalid?.nim?.[0] ? "is-invalid" : ""}`} />
                    {invalid && <div className="invalid-feedback">{messageInvalid?.nim?.[0] !== undefined ? messageInvalid.nim[0] : ""}</div>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">
                    Email admin ukm
                  </label>
                  <div className="form-control-wrap">
                    <input type="email" name="email" className={`form-control ${invalid && messageInvalid?.email?.[0] ? "is-invalid" : ""}`} />
                    {invalid && <div className="invalid-feedback">{messageInvalid?.email?.[0] !== undefined ? messageInvalid.email[0] : ""}</div>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">
                    Password admin ukm
                  </label>
                  <div className="form-control-wrap">
                    <input type="password" name="password" className={`form-control ${invalid && messageInvalid?.password?.[0] ? "is-invalid" : ""}`} />
                    {invalid && <div className="invalid-feedback">{messageInvalid?.password?.[0] !== undefined ? messageInvalid.password[0] : ""}</div>}
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
      <div className="modal fade" id="modalEditUkm">
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
              <h5 className="modal-title">View details</h5>
              <a href="#" className="close" data-bs-dismiss="modal" aria-label="Close" ref={refSubmit}>
                <em className="icon ni ni-cross"></em>
              </a>
            </div>
            <div className="modal-body">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  const formData = new FormData(e.currentTarget);
                  const id = formData.get("id");
                  const name = formData.get("name");

                  try {
                    const response = await UpdateUkm({ token: token.value, organization_id: id, name_organization: name });
                    if (response.status == 200) {
                      setMessage(response.data.message);
                      setAlertSuccess(true);
                      setAlert(false);
                      setLoading(false);
                      setTimeout(() => {
                        setAlertSuccess(false);
                        setAlert(false);
                        refSubmit.current.click();
                      }, 2000);
                    }
                  } catch (error) {
                    setMessage(error.response.data.message);
                    setAlert(true);
                    setAlertSuccess(false);
                    setLoading(false);
                    console.log(error.response.data.message);
                  }
                }}
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">
                    Nama UKM
                  </label>
                  <div className="form-control-wrap">
                    <input name="id" type="number" value={organization.id} hidden readOnly />
                    <input name="name" type="text" className="form-control" value={organization.name_organization} onChange={(e) => setOrganization({ ...organization, name_organization: e.target.value })} />
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
