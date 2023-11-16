"use client";
import GetMyOrganization from "@/api/getMyOrganization";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useSWR from "swr";
export default function ActionTablePiket({ token, roleid, setIdUkm, setIdUserPiket, setNameUserPiket }) {
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());
  const [organizaton, setOrganization] = useState([]);
  const [organizationId, setOrganizationId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [namaOrganisasi, setNamaOrganisasi] = useState(null);
  useEffect(() => {
    async function fetchData() {
      // let responseFormurlir = await GetFormulir(2, token.value);
      // const data = await responseFormurlir.json();
      const responseOrganization = await GetMyOrganization(token.value, roleid);
      const dataOrganization = await responseOrganization.json();
      if (!responseOrganization.ok) {
        // const error = new Error("message");
        // error.stack = "401";
        // throw error;
        throw new Error("Something wrong");
      }
      // setFormulir(data.data);
      setOrganization(dataOrganization.data);
      setLoading(false);
    }
    fetchData();
  }, [token]);

  const SelectUkm = (e, id, name) => {
    e.preventDefault();
    setOrganizationId(id);
    setNamaOrganisasi(name);
    setIdUkm(id);
  };
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jadwal-piket?organization_id=${organizationId}`, fetcher, {
    refreshInterval: 1000,
  });

  return (
    <div className="components-preview wide-md mx-auto">
      <div className="nk-block nk-block-lg">
        <div className="nk-block-head nk-block-head">
          <div className="nk-block-head-content">
            <h4 className="nk-block-title">Jadwal piket</h4>
            <div className="nk-block-des">
              <p>{/* Use <code className="code-class">.table-stripped</code> class in <code className="code-tag">&lt;table&gt;</code> tag to make zebra stripping on table row. */}</p>
            </div>
            <div className="d-flex justify-content-between">
              <div className="drodown">
                <a href="#" className="dropdown-toggle btn btn-white btn-dim btn-outline-light" data-bs-toggle="dropdown">
                  <span>
                    <span className="d-none d-md-inline">{"-->"}</span> {namaOrganisasi ? namaOrganisasi : "Select ukm"}
                  </span>
                  <em className="dd-indc icon ni ni-chevron-right"></em>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <ul className="link-list-opt no-bdr">
                    {loading ? (
                      <>
                        <li className="preview-item">
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <div className="spinner-grow spinner-grow-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </li>
                        <li className="preview-item">
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <div className="spinner-grow spinner-grow-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </li>
                      </>
                    ) : (
                      organizaton.map((value, i) => (
                        <li key={i}>
                          <a href="#" onClick={(e) => SelectUkm(e, value.id, value.name_organization)}>
                            <span>{value.name_organization}</span>
                          </a>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
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
          </div>
        </div>
        <div className="card card-bordered card-preview">
          <div className="card-inner">
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <ul className="preview-list g-1">
                  <li className="preview-item">
                    <div className="spinner-grow text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </li>
                  <li className="preview-item">
                    <div className="spinner-grow text-secondary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </li>
                  <li className="preview-item">
                    <div className="spinner-grow text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </li>
                  <li className="preview-item">
                    <div className="spinner-grow text-danger" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </li>
                  <li className="preview-item">
                    <div className="spinner-grow text-warning" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </li>
                  <li className="preview-item">
                    <div className="spinner-grow text-info" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </li>
                  <li className="preview-item">
                    <div className="spinner-grow text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </li>
                  <li className="preview-item">
                    <div className="spinner-grow text-dark" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              data.data.map((value, i) => (
                <table key={i} className="table table-striped">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th scope="col" colSpan={5} className="">
                        {value.nama_hari}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {value.user_piket.map((data, x) => (
                      <tr key={x}>
                        <th scope="row">{x + 1}</th>
                        <td>
                          {data.user.name}{" "}
                          <a
                            href="#"
                            className="text-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#editPiket"
                            onClick={() => {
                              setIdUserPiket(data.id);
                              setNameUserPiket(data.user.name);
                            }}
                          >
                            edit
                          </a>{" "}
                          <a
                            href="#"
                            className="text-danger"
                            onClick={(e) => {
                              e.preventDefault();
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Yes, delete it!",
                              }).then(async function (result) {
                                if (result.value) {
                                  // Swal.fire("Deleted!", "Your file has been deleted.", "success");
                                  let timerInterval;

                                  // Tampilkan SweetAlert dengan pesan "Loading"
                                  Swal.fire({
                                    title: "Loading...",
                                    html: "Please wait.",
                                    timerProgressBar: true,
                                    didOpen: () => {
                                      Swal.showLoading();
                                    },
                                    willClose: () => {
                                      clearInterval(timerInterval);
                                    },
                                    showConfirmButton: false, // Sembunyikan tombol "OK"
                                  });

                                  try {
                                    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/delete-petugas-piket/${data.id}`, {
                                      headers: {
                                        Accept: "application/json",
                                        Authorization: `Bearer ${token.value}`,
                                      },
                                    });

                                    if (response.status == 200) {
                                      Swal.close();
                                      Swal.fire("Deleted!", "Your file has been deleted.", "success");
                                    }
                                  } catch (error) {
                                    Swal.close();
                                    Swal.fire({
                                      icon: "error",
                                      title: "Error",
                                      text: error.response.data.message,
                                    });
                                  }
                                }
                              });
                            }}
                          >
                            delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
