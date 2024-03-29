"use client";

import GetMyOrganization from "@/api/getMyOrganization";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function ActionPage({ token, roleid }) {
  const [organizaton, setOrganization] = useState([]);
  const [organizationId, setOrganizationId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [namaOrganisasi, setNamaOrganisasi] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // let responseFormurlir = await GetFormulir(2, token.value);
      // const data = await responseFormurlir.json();
      const responseOrganization = await GetMyOrganization(token.value, roleid.value);
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
  };

  const presensi = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());

  const { data: dataPresensi, isLoading: loadingPresensi } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/data-presensi?organization_id=${organizationId}`, presensi, {
    refreshInterval: 1000,
  });

  return (
    <div className="nk-content">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block nk-block-lg">
              <div className="nk-block-head">
                <div className="nk-block-head-content">
                  <h4 className="nk-block-title">Data presensi</h4>
                  {/* <p>
                    Add the <code>.is-compact</code> class with <code>.table-tranx</code> class to make compact version of table.
                  </p> */}
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
                </div>
              </div>
              <div className="card card-preview">
                <table className="table table-tranx is-compact">
                  <thead>
                    <tr className="tb-tnx-head">
                      <th className="tb-tnx-id">
                        <span className="">#</span>
                      </th>
                      <th className="tb-tnx-info">
                        <span className="tb-tnx-desc d-none d-sm-inline-block">
                          <span>Name</span>
                        </span>
                        {/* <span className="tb-tnx-date d-md-inline-block d-none">
                          <span className="d-md-none">Date</span>
                          <span className="d-none d-md-block">
                            <span>Issue Date</span>
                            <span>Due Date</span>
                          </span>
                        </span> */}
                      </th>
                      <th className="tb-tnx-amount">
                        <span className="tb-tnx-total">Date time</span>
                        {/* <span className="tb-tnx-status d-none d-md-inline-block">Status</span> */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingPresensi ? (
                      <tr className="tb-tnx-item">
                        <td className="tb-tnx-id">
                          <a href="#">
                            <span>
                              <ul className="preview-list g-1">
                                <li className="preview-item">
                                  <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                </li>
                              </ul>
                            </span>
                          </a>
                        </td>
                        <td className="tb-tnx-info">
                          <div className="tb-tnx-desc">
                            <span className="title">
                              <ul className="preview-list g-1">
                                <li className="preview-item">
                                  <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                </li>
                                <li className="preview-item">
                                  <div className="spinner-grow spinner-grow-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                </li>
                              </ul>
                            </span>
                          </div>
                          {/* <div className="tb-tnx-date">
                          <span className="date">10-05-2019</span>
                          <span className="date">10-13-2019</span>
                        </div> */}
                        </td>
                        <td className="tb-tnx-amount">
                          <div className="tb-tnx-total">
                            <span className="amount">
                              <ul className="preview-list g-1">
                                <li className="preview-item">
                                  <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                </li>
                                <li className="preview-item">
                                  <div className="spinner-grow spinner-grow-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                </li>
                              </ul>
                            </span>
                          </div>
                          {/* <div className="tb-tnx-status">
                          <span className="badge badge-dot bg-warning">Due</span>
                        </div> */}
                        </td>
                      </tr>
                    ) : (
                      dataPresensi.data.map((value, i) => (
                        <tr className="tb-tnx-item" key={i}>
                          <td className="tb-tnx-id">
                            <a href="#">
                              <span>{i + 1}</span>
                            </a>
                          </td>
                          <td className="tb-tnx-info">
                            <div className="tb-tnx-desc">
                              <span className="title">{value.name}</span>
                            </div>
                            {/* <div className="tb-tnx-date">
                          <span className="date">10-05-2019</span>
                          <span className="date">10-13-2019</span>
                        </div> */}
                          </td>
                          <td className="tb-tnx-amount">
                            <div className="tb-tnx-date">
                              <span className="amount">
                                {(() => {
                                  const parsedDate = new Date(value.created_at);

                                  // Format tanggal sesuai dengan keinginan Anda
                                  const formattedDate = format(parsedDate, "dd MMM yyyy, hh:mm a");
                                  return formattedDate;
                                })()}
                              </span>
                            </div>
                            {/* <div className="tb-tnx-status">
                          <span className="badge badge-dot bg-warning">Due</span>
                        </div> */}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
