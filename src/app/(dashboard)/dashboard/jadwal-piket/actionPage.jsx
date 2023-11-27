"use client";

import GetMyOrganization from "@/api/getMyOrganization";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import ActionTablePiket from "./actionTablePiket";
import PostJadwalPiket from "@/api/postJadwalPiket";
import UpdateUserPiket from "@/api/updateUserPiket";

export default function ActionPage({ token, roleid }) {
  const refSubmit = useRef(null);
  const reftambah = useRef(null);
  const [isClient, setClient] = useState(false);
  const [idUkm, setIdUkm] = useState(null);
  const [idUserPiket, setIdUserPiket] = useState(0);
  const [nameUserPiket, setNameUserPiket] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  const allUser = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());
  const { data: dataAllUser, isLoading: loadingAllUser } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/allUser`, allUser, {
    revalidateIfStale: true,
  });

  // const organization = (...args) =>
  //   fetch(...args, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token.value}`,
  //       Accept: "application/json",
  //     },
  //   }).then((res) => res.json());
  // const { data: myOrganization, isLoading: loadingOrg } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/myorganization?role_id=${roleid}`, organization, {
  //   revalidateIfStale: true,
  // });

  const jadwal = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());
  const { data: dataJadwal, isLoading: loadingJadwal } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jadwal-piket/organization?organization_id=${idUkm}`, jadwal, {
    revalidateIfStale: true,
  });

  return (
    <>
      {isClient && (
        <>
          <div className="nk-content ">
            <div className="container-fluid">
              <div className="nk-content-inner">
                <div className="nk-content-body">
                  <ActionTablePiket token={token} roleid={roleid} setIdUkm={(e) => setIdUkm(e)} setIdUserPiket={(e) => setIdUserPiket(e)} setNameUserPiket={(e) => setNameUserPiket(e)} />
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
                  <h5 className="modal-title">Tambah petugas piket</h5>
                  <a href="#" className="close" data-bs-dismiss="modal" aria-label="Close" ref={reftambah}>
                    <em className="icon ni ni-cross"></em>
                  </a>
                </div>
                <div className="modal-body">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setLoading(true);
                      const formData = new FormData(e.currentTarget);
                      const organization_id = formData.get("organization_id");
                      const hari_id = formData.get("hari_id");
                      const mahasiswa_id = formData.get("mahasiswa_id");
                      try {
                        const response = await PostJadwalPiket({ token: token, mahasiswa_id: mahasiswa_id, hari_id: hari_id });
                        if (response.status == 200) {
                          setMessage(response.data.message);
                          setAlertSuccess(true);
                          setAlert(false);
                          setLoading(false);
                          setTimeout(() => {
                            setAlertSuccess(false);
                            setAlert(false);
                            reftambah.current.click();
                          }, 2000);
                        }
                      } catch (error) {
                        setMessage(error.response.data.message);
                        setAlert(true);
                        setAlertSuccess(false);
                        setLoading(false);
                      }
                      console.log("org", organization_id);
                      console.log("mh", mahasiswa_id);
                    }}
                  >
                    <div className="form-group">
                      <label className="form-label" htmlFor="full-name">
                        Pilih jadwal
                      </label>
                      <div className="form-control-wrap">
                        <input name="organization_id" type="number" defaultValue={idUkm} className="form-control" id="full-name" hidden />
                        <select className="form-select" aria-label="Default select example" name="hari_id">
                          {loadingJadwal ? (
                            <>
                              <option>Loading...</option>
                            </>
                          ) : (
                            dataJadwal.data.map((value, i) => (
                              <option key={i} value={value.id}>
                                {value.nama_hari}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="full-name">
                        Mahasiswa
                      </label>
                      <div className="form-control-wrap">
                        <select className="form-select" aria-label="Default select example" name="mahasiswa_id">
                          {loadingAllUser ? (
                            <>
                              <option>Loading...</option>
                            </>
                          ) : (
                            dataAllUser.data.map((value, i) => (
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

          <div className="modal fade" id="editPiket">
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
                  <h5 className="modal-title">Pindah jadwal</h5>
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
                      const userpiket_id = formData.get("userpiket_id");
                      const hari_id = formData.get("hari_id");

                      try {
                        const response = await UpdateUserPiket({ token: token, userpiket_id: userpiket_id, hari_id: hari_id });
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
                      console.log(idUserPiket);
                      console.log(userpiket_id);
                      console.log(hari_id);
                    }}
                  >
                    <div className="form-group">
                      <label className="form-label" htmlFor="full-name">
                        Mahasiswa
                      </label>
                      <div className="form-controler-wrap">
                        <input type="text" className="form-control" defaultValue={nameUserPiket} id="full-name" readOnly />
                        <input name="userpiket_id" type="number" className="form-control" value={idUserPiket} id="full-name" hidden readOnly />
                      </div>
                      <label className="form-label" htmlFor="full-name">
                        Pindah ke jadwal hari?
                      </label>
                      <div className="form-control-wrap">
                        <input name="organization_id" type="number" defaultValue={idUkm} className="form-control" id="full-name" hidden />
                        <select className="form-select" aria-label="Default select example" name="hari_id">
                          {loadingJadwal ? (
                            <>
                              <option>Loading...</option>
                            </>
                          ) : (
                            dataJadwal.data.map((value, i) => (
                              <option key={i} value={value.id}>
                                {value.nama_hari}
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
        </>
      )}
    </>
  );
}
