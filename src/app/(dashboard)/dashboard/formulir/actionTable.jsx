"use client";

import GetFormulir from "@/api/getFormulir";
import GetMyOrganization from "@/api/getMyOrganization";
import { useEffect, useState } from "react";
import TableResult from "./tableResult";

export default function ActionTable({ token, roleid }) {
  // const [formulir, setFormulir] = useState([]);
  const [organizaton, setOrganization] = useState([]);
  const [organizationId, setOrganizationId] = useState(null);
  const [isLoading, setLoading] = useState(true);
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
      console.log("dataOrganization", dataOrganization);
    }
    fetchData();
  }, [token]);

  const SelectUkm = (e, id, name) => {
    e.preventDefault();
    setOrganizationId(id);
    setNamaOrganisasi(name);
    console.log("id", id);
  };
  return (
    <>
      <div className="drodown">
        <a href="#" className="dropdown-toggle btn btn-white btn-dim btn-outline-light" data-bs-toggle="dropdown">
          <span>
            <span className="d-none d-md-inline">{"-->"}</span> {namaOrganisasi ? namaOrganisasi : "Select ukm"}
          </span>
          <em className="dd-indc icon ni ni-chevron-right"></em>
        </a>
        <div className="dropdown-menu dropdown-menu-end">
          <ul className="link-list-opt no-bdr">
            {isLoading ? (
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
      <div className="card card-preview">
        <table className="table table-tranx">
          <thead>
            <tr className="tb-tnx-head">
              <th className="tb-tnx-id">
                <span className="">#</span>
              </th>
              <th className="tb-tnx-info">
                <span className="tb-tnx-desc d-none d-sm-inline-block">
                  <span>Bill For</span>
                </span>
                <span className="tb-tnx-date d-md-inline-block d-none">
                  <span className="d-md-none">Date</span>
                  <span className="d-none d-md-block">
                    <span>Dibuat</span>
                    <span>Kadaluarsa</span>
                  </span>
                </span>
              </th>
              <th className="tb-tnx-amount is-alt">
                <span className="tb-tnx-total">Total Pendaftar</span>
                <span className="tb-tnx-status d-none d-md-inline-block">Status</span>
              </th>
              <th className="tb-tnx-action">
                <span>&nbsp;</span>
              </th>
            </tr>
          </thead>
          <tbody>{organizationId && <TableResult token={token} id_ukm={organizationId} roleid={roleid} />}</tbody>
        </table>
      </div>
    </>
  );
}
