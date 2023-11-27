"use client";

import GetMyOrganization from "@/api/getMyOrganization";
import PostAbsen from "@/api/postAbsen";
import { useEffect, useState } from "react";

export default function ActionPage({ token, roleid }) {
  const [organizaton, setOrganization] = useState([]);
  const [organizationId, setOrganizationId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [namaOrganisasi, setNamaOrganisasi] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState("");
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
    <div className="nk-block nk-block-lg">
      <div className="nk-block-head">
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
          </div>
        </div>
      </div>
      <div className="card card-bordered card-preview">
        <div className="card-inner">
          <div className="d-flex justify-content-center">
            {organizationId !== 0 ? (
              <button
                disabled={buttonLoading}
                href="#"
                className="btn btn-primary"
                onClick={async (e) => {
                  e.preventDefault();
                  setButtonLoading(true);
                  try {
                    const response = await PostAbsen({ token: token, organizationId: organizationId });
                    setMessage(response.data.message);
                    setAlert(false);
                    setAlertSuccess(true);
                    setButtonLoading(false);
                  } catch (error) {
                    setMessage(error.response.data.message);
                    setAlert(true);
                    setAlertSuccess(false);
                    setButtonLoading(false);
                    console.log("error post", error.response);
                  }
                }}
              >
                {buttonLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">Loading...</span>
                  </>
                ) : (
                  <>
                    <em className="icon ni ni-calendar-alt"></em>
                    <span>Absen hari ini</span>{" "}
                  </>
                )}
              </button>
            ) : (
              <p>Pilih ukm terlebih dahulu sebelum absen</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
