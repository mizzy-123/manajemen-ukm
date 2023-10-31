"use client";

import GetFormulir from "@/api/getFormulir";
import GetMyOrganization from "@/api/getMyOrganization";
import { useEffect, useState } from "react";

export default function ActionTable({ token }) {
  const [formulir, setFormulir] = useState([]);
  const [organizaton, setOrganization] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let responseFormurlir = await GetFormulir(2, token.value);
      const data = await responseFormurlir.json();
      const responseOrganization = await GetMyOrganization(token.value);
      const dataOrganization = await responseOrganization.json();
      if (!responseFormurlir.ok) {
        // const error = new Error("message");
        // error.stack = "401";
        // throw error;
        throw new Error("Something wrong");
      }
      setFormulir(data.data);
      setOrganization(dataOrganization.data);
    }
    fetchData();
  }, []);

  const SelectUkm = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="drodown">
        <a href="#" className="dropdown-toggle btn btn-white btn-dim btn-outline-light" data-bs-toggle="dropdown">
          <span>
            <span className="d-none d-md-inline">{"-->"}</span> Select ukm
          </span>
          <em className="dd-indc icon ni ni-chevron-right"></em>
        </a>
        <div className="dropdown-menu dropdown-menu-end">
          <ul className="link-list-opt no-bdr">
            {organizaton.map((value, i) => (
              <li key={i}>
                <a href="#" onClick={(e) => SelectUkm(e)}>
                  <span>{value.name_organization}</span>
                </a>
              </li>
            ))}
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
          <tbody>
            {formulir.map((value, i) => (
              <tr key={i} className="tb-tnx-item">
                <td className="tb-tnx-id">
                  <a href="#">
                    <span>{i + 1}</span>
                  </a>
                </td>
                <td className="tb-tnx-info">
                  <div className="tb-tnx-desc">
                    <span className="title">Formulir pendaftaran</span>
                  </div>
                  <div className="tb-tnx-date">
                    <span className="date">
                      {(() => {
                        const date = new Date(value.created_at);
                        const tahun = date.getFullYear();
                        const bulan = String(date.getMonth() + 1).padStart(2, "0");
                        const tanggal = String(date.getDate()).padStart(2, "0");
                        return `${tahun}-${bulan}-${tanggal}`;
                      })()}
                    </span>
                    <span className="date">{value.expired}</span>
                  </div>
                </td>
                <td className="tb-tnx-amount is-alt">
                  <div className="tb-tnx-total">
                    <span className="amount">{value.dataform_count}</span>
                  </div>
                  <div className="tb-tnx-status">
                    <span
                      className={`badge badge-dot ${(() => {
                        if (value.status == 1) {
                          return "bg-success";
                        } else {
                          return "bg-danger";
                        }
                      })()}`}
                    >
                      {(() => {
                        if (value.status == 1) {
                          return "Active";
                        } else {
                          return "Inactive";
                        }
                      })()}
                    </span>
                  </div>
                </td>
                <td className="tb-tnx-action">
                  <div className="dropdown">
                    <a className="text-soft dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown">
                      <em className="icon ni ni-more-h"></em>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-xs">
                      <ul className="link-list-plain">
                        <li>
                          <a href="#">View</a>
                        </li>
                        <li>
                          <a href="#">Edit</a>
                        </li>
                        <li>
                          <a href="#">Remove</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
