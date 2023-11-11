"use client";

import { useContext, useRef, useState } from "react";
import { AppContext } from "./actionPage";
import useSWR from "swr";
import UpdateRole from "@/api/updateRole";

export default function ActionModal() {
  const { token, roleid, idUkm, namaUkm, idMahasiswa, namaMahasiswa, dataMahasiswa } = useContext(AppContext);

  const refSubmit = useRef(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  const allRole = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());

  const { data: dataAllRole, isLoading: loadingRole } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/all-role-except-sa`, allRole, {
    revalidateIfStale: true,
  });

  return (
    <>
      <div className="modal fade" id="modalRole">
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
              <h5 className="modal-title">Ganti role</h5>
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
                  const mahasiswa_id = formData.get("mahasiswa_id");
                  const organization_id = formData.get("organization_id");
                  const role_id = formData.get("role_id");

                  try {
                    const response = await UpdateRole({ token: token.value, user_id: mahasiswa_id, organization_id: organization_id, role_id: role_id });
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
                  }
                }}
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">
                    Mahasiswa
                  </label>
                  <div className="form-control-wrap">
                    <input type="text" className="form-control" defaultValue={namaMahasiswa} id="full-name" readOnly />
                    <input name="mahasiswa_id" type="number" className="form-control" value={idMahasiswa} id="full-name" hidden readOnly />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">
                    UKM
                  </label>
                  <div className="form-control-wrap">
                    <input type="text" className="form-control" defaultValue={namaUkm} id="full-name" readOnly />
                    <input name="organization_id" type="number" className="form-control" value={idUkm} id="full-name" hidden readOnly />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">
                    Ingin ganti role ke?
                  </label>
                  <div className="form-control-wrap">
                    <select className="form-select" aria-label="Default select example" name="role_id">
                      {loadingRole ? (
                        <option>Loading...</option>
                      ) : (
                        dataAllRole.data.map((value, i) => (
                          <option key={i} value={value.id}>
                            {value.name}
                          </option>
                        ))
                      )}
                    </select>
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
      <div className="modal fade" id="modalDetail">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">View details</h5>
              <a href="#" className="close" data-bs-dismiss="modal" aria-label="Close" ref={refSubmit}>
                <em className="icon ni ni-cross"></em>
              </a>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  Mahasiswa
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={dataMahasiswa.name} id="full-name" readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  UKM
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={namaUkm} id="full-name" readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  Email
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={dataMahasiswa.email} id="full-name" readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  Phone
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={dataMahasiswa.no_telepon} id="full-name" readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  NIM
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={dataMahasiswa.nim} id="full-name" readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  Role
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={dataMahasiswa.role} id="full-name" readOnly />
                </div>
              </div>
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
