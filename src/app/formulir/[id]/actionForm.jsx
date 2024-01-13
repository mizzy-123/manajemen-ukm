"use client";

import PostDaftarUkm from "@/api/postDaftarUkm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ActionForm({ formulir }) {
  const router = useRouter();
  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [messageInvalid, setMessageInvalid] = useState({});
  console.log("formulir", formulir);
  return (
    <>
      <div className="mx-4 my-3">
        <svg
          onClick={() => {
            router.back();
          }}
          className="ic-back"
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
        >
          <path d="M18.125 7.25L10.875 14.5L18.125 21.75" stroke="#2A2B74" strokeWidth="2" />
        </svg>
      </div>
      {formulir.data.data !== null && formulir.data.data.status == true ? (
        <div className="container">
          {/* <!--Section Two--> */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setInvalid(false);
              const formData = new FormData(e.currentTarget);
              const form_id = formData.get("form_id");
              const name = formData.get("name");
              const nim = formData.get("nim");
              const kelamin = formData.get("kelamin");
              const email = formData.get("email");
              const nomor = formData.get("nomor");

              console.log("test", kelamin);

              try {
                const response = await PostDaftarUkm({ form_id: form_id, name: name, nim: nim, email: email, no_telepon: nomor, kelamin: kelamin });
                console.log("response", response);
                if (response.status == 200) {
                  setMessage(response.data.message);
                  setAlertSuccess(true);
                  setAlert(false);
                  setLoading(false);
                  router.push("/success");
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
              }
            }}
          >
            <div className="con-form">
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
              <div className="t-form">
                <p className="text-dark fw-bold">FORMULIR PENDAFTARAN CALON ANGGOTA BARU UKM {formulir.data.name_organization}</p>
              </div>
              <input name="form_id" className="input-text" type="text" placeholder="Masukkan nama lengkap anda" value={formulir.data.data.id} hidden readOnly />
              <div className="c-form">
                <p className="text-dark">Nama</p>
                <input name="name" className={`input-text form-control ${invalid && messageInvalid?.name?.[0] ? "is-invalid" : ""}`} type="text" placeholder="Masukkan nama lengkap anda" />
                {invalid && <div className="invalid-feedback">{messageInvalid?.name?.[0] !== undefined ? messageInvalid.name[0] : ""}</div>}
              </div>
              <div className="c-form">
                <p className="text-dark">NIM</p>
                <input name="nim" className={`input-text form-control ${invalid && messageInvalid?.nim?.[0] ? "is-invalid" : ""}`} type="text" placeholder="Masukan NIM Anda (menggunakan titik)" />
                {invalid && <div className="invalid-feedback">{messageInvalid?.nim?.[0] !== undefined ? messageInvalid.nim[0] : ""}</div>}
              </div>
              <div className="s-form">
                <p className="text-dark">Jenis Kelamin</p>
                <select name="kelamin" className={`form-select ${invalid && messageInvalid?.kelamin?.[0] ? "is-invalid" : ""}`} aria-label="Default select example">
                  <option selected>Open this select menu</option>
                  <option value="PRIA">Pria</option>
                  <option value="WANITA">Wanita</option>
                </select>
                {invalid && <div className="invalid-feedback">{messageInvalid?.kelamin?.[0] !== undefined ? messageInvalid.kelamin[0] : ""}</div>}
              </div>
              <div className="c-form">
                <p className="text-dark">Alamat Email</p>
                <input name="email" className={`input-text form-control ${invalid && messageInvalid?.email?.[0] ? "is-invalid" : ""}`} type="text" placeholder="Masukan Alamat Email Anda" />
                {invalid && <div className="invalid-feedback">{messageInvalid?.email?.[0] !== undefined ? messageInvalid.email[0] : ""}</div>}
              </div>
              <div className="c-form">
                <p className="text-dark">Nomor HP/WA</p>
                <input name="nomor" className={`input-text form-control ${invalid && messageInvalid?.no_telepon?.[0] ? "is-invalid" : ""}`} type="text" placeholder="Masukan Nomor HP / WA yang Dapat Dihubungi" />
                {invalid && <div className="invalid-feedback">{messageInvalid?.no_telepon?.[0] !== undefined ? messageInvalid.no_telepon[0] : ""}</div>}
              </div>
              <div className="c-form">
                <p className="text-dark">
                  <span className="text-danger">*</span>Pastikan Anda Sudah Mengisi Formulir Dengan Benar
                </p>
              </div>
              <div className="c-button d-flex justify-content-end">
                <button type="submit" className="button-form" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span role="status">Loading...</span>
                    </>
                  ) : (
                    "Kirim"
                  )}
                </button>
              </div>
            </div>
          </form>
          {/* <!--Section Two END--> */}
        </div>
      ) : (
        <div className="container py-2 d-flex justify-content-center align-items-center m-success">
          {/* <!--Section Two--> */}
          <div className="con-s">
            <div className="s-title">
              <p className="text-dark fw-bold fs-5">Formulir tidak ada</p>
            </div>
            <div className="s-content">
              <p className="text-content">Mohon maaf formulir tidak ada atau sudah kadaluarsa.</p>
            </div>
            <div className="s-button d-flex justify-content-end">
              <button
                className="button-form"
                onClick={() => {
                  router.push("/");
                }}
              >
                Home
              </button>
            </div>
          </div>
          {/* <!--Section Two END--> */}
        </div>
      )}
    </>
  );
}
