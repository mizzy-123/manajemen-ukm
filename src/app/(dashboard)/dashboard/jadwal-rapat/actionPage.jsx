"use client";

import { useEffect, useState } from "react";
import TableResult from "./tableResult";
import GetMyOrganization from "@/api/getMyOrganization";

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
  return (
    <div className="nk-content">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block nk-block-lg">
              <div className="nk-block-head">
                <div className="nk-block-head-content">
                  <h4 className="nk-block-title">Timeline proker dan rapat</h4>
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
                    <TableResult token={token} organizationId={organizationId} />
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
