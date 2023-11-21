"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "./actionPage";
import GetMyOrganization from "@/api/getMyOrganization";
import useSWR from "swr";
import { format } from "date-fns";

export default function ActionContent() {
  const { token, roleid, setDataOrganisasi, setDataProker } = useContext(AppContext);
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
    // setIdUkm(id);
    setDataOrganisasi({
      id: id,
      name: name,
    });
  };

  const allRapatProker = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());

  const { data: dataProker, isLoading: loadingProker } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/all-rapat-proker?organization_id=${organizationId}`, allRapatProker, {
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
                  <h4 className="nk-block-title">Rapat</h4>
                  <p>{/* The following table can be use for <strong className="text-primary">order history, invoice listing</strong> related transaction. */}</p>
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
                    <div className="nk-block-head-content">
                      <li className="nk-block-tools-opt" data-bs-toggle="modal" data-bs-target="#modalProker">
                        <a href="#" className="btn btn-icon btn-primary d-md-none">
                          <em className="icon ni ni-plus"></em>
                        </a>
                        <a href="#" className="btn btn-primary d-none d-md-inline-flex">
                          <em className="icon ni ni-plus"></em>
                          <span>Add</span>
                        </a>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-preview">
                <table className="table table-orders">
                  <thead className="tb-odr-head">
                    <tr className="tb-odr-item">
                      <th className="tb-odr-info">
                        <span className="tb-odr-id">No</span>
                        <span className="tb-odr-date d-none d-md-inline-block">Nama</span>
                      </th>
                      <th className="tb-odr-info">
                        <span className="tb-odr-id">Lokasi</span>
                      </th>
                      <th className="tb-odr-amount">
                        <span className="tb-odr-total">Waktu</span>
                        {/* <span className="tb-odr-status d-none d-md-inline-block"></span> */}
                      </th>
                      <th className="tb-odr-action">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody className="tb-odr-body">
                    {loadingProker ? (
                      <tr className="tb-odr-item">
                        <td className="tb-odr-info">
                          <span className="tb-odr-id">
                            <a href="#">
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </a>
                          </span>
                          <span className="tb-odr-date">
                            <div className="spinner-border spinner-border-sm" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </span>
                        </td>
                        <td className="tb-odr-info">
                          <span className="tb-odr-id">
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
                        </td>

                        <td className="tb-odr-amount">
                          <span className="tb-odr-total">
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
                          </span>
                        </td>
                        <td className="tb-odr-action">
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
                        </td>
                      </tr>
                    ) : (
                      dataProker.data.map((value, i) => (
                        <tr className="tb-odr-item" key={i}>
                          <td className="tb-odr-info">
                            <span className="tb-odr-id">
                              <a href="#">{i + 1}</a>
                            </span>
                            <span className="tb-odr-date">{value.name}</span>
                          </td>
                          <td className="tb-odr-info">
                            <span className="tb-odr-id">{value.lokasi}</span>
                          </td>

                          <td className="tb-odr-amount">
                            <span className="tb-odr-total">
                              <span className="amount">
                                {(() => {
                                  const parsedDate = new Date(value.waktu);

                                  // Format tanggal sesuai dengan keinginan Anda
                                  const formattedDate = format(parsedDate, "dd MMM yyyy, hh:mm a");
                                  return formattedDate;
                                })()}
                              </span>
                            </span>
                          </td>
                          <td className="tb-odr-action">
                            {/* <div className="tb-odr-btns d-none d-md-inline">
                              <a href="#" className="btn btn-sm btn-primary">
                                View
                              </a>
                            </div> */}
                            <div className="dropdown">
                              <a className="text-soft dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown" data-offset="-8,0">
                                <em className="icon ni ni-more-h"></em>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end dropdown-menu-xs">
                                <ul className="link-list-plain">
                                  <li>
                                    <a
                                      href="#"
                                      className="text-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modalEdit"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        const parsedDate = new Date(value.waktu);
                                        const formattedDate = format(parsedDate, "yyyy-MM-dd");
                                        const formattedTime = format(parsedDate, "HH:mm:ss");
                                        setDataProker({
                                          id: value.id,
                                          name: value.name,
                                          lokasi: value.lokasi,
                                          date: formattedDate,
                                          time: formattedTime,
                                        });
                                      }}
                                    >
                                      Edit
                                    </a>
                                  </li>
                                  {/* <li>
                                    <a href="#" className="text-primary">
                                      View
                                    </a>
                                  </li> */}
                                  <li>
                                    <a href="#" className="text-danger">
                                      Remove
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
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
