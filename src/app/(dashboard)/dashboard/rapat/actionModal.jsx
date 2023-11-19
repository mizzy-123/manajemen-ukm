"use client";

import { useContext, useRef, useState } from "react";
import { AppContext } from "./actionPage";
import PostTambahProker from "@/api/postTambahProker";

export default function ActionModal() {
  const { token, roleid, dataOrganisasi } = useContext(AppContext);
  const refSubmit = useRef(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [messageInvalid, setMessageInvalid] = useState({});
  return (
    <>
      <div className="modal fade" id="modalProker">
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
              <h5 className="modal-title">Tambah kegiatan/proker</h5>
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
                  const organization_id = dataOrganisasi.id;
                  const name = formData.get("name");
                  const lokasi = formData.get("lokasi");
                  const tanggal = formData.get("tanggal");
                  const waktu = formData.get("waktu");

                  try {
                    const response = await PostTambahProker({ token: token.value, organization_id: organization_id, name: name, lokasi: lokasi, tanggal: tanggal, waktu: waktu });
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
                  <label className="form-label">Nama ukm</label>
                  <div className="form-control-wrap">
                    <input type="number" className="form-control" defaultValue={dataOrganisasi.id} id="full-name" hidden readOnly />
                    <input name="mahasiswa_id" type="text" className="form-control" value={dataOrganisasi.name} id="full-name" readOnly />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Nama kegiatan
                  </label>
                  <div className="form-control-wrap">
                    <input name="name" type="text" className={`form-control ${invalid && messageInvalid?.name?.[0] ? "is-invalid" : ""}`} id="name" />
                    {invalid && <div className="invalid-feedback">{messageInvalid?.name?.[0] !== undefined ? messageInvalid.name[0] : ""}</div>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lokasi">
                    Lokasi
                  </label>
                  <div className="form-control-wrap">
                    <input name="lokasi" type="text" className={`form-control ${invalid && messageInvalid?.lokasi?.[0] ? "is-invalid" : ""}`} id="lokasi" />
                    {invalid && <div className="invalid-feedback">{messageInvalid?.lokasi?.[0] !== undefined ? messageInvalid.lokasi[0] : ""}</div>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Tanggal</label>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <em className="icon ni ni-calendar"></em>
                    </div>
                    <input name="tanggal" type="text" className={`form-control date-picker ${invalid && messageInvalid?.tanggal?.[0] ? "is-invalid" : ""}`} data-date-format="yyyy-mm-dd" required />
                    {invalid && <div className="invalid-feedback">{messageInvalid?.tanggal?.[0] !== undefined ? messageInvalid.tanggal[0] : ""}</div>}
                  </div>
                  <div className="form-note">
                    Date format <code>yyyy-mm-dd</code>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="waktu">
                    Waktu
                  </label>
                  <div className="form-control-wrap">
                    <input name="waktu" type="time" className={`form-control ${invalid && messageInvalid?.waktu?.[0] ? "is-invalid" : ""}`} placeholder="Input time" id="waktu" />
                    {invalid && <div className="invalid-feedback">{messageInvalid?.waktu?.[0] !== undefined ? messageInvalid.waktu[0] : ""}</div>}
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
