"use client";

import GetDataOrganization from "@/api/getDataOrganization";
import GetMyOrganization from "@/api/getMyOrganization";
import UpdateDataOrganization from "@/api/updateDataOrganization";
import { useEffect, useState } from "react";

export default function ActionPage({ token, roleid }) {
  const [organizaton, setOrganization] = useState([]);
  const [organizationId, setOrganizationId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [namaOrganisasi, setNamaOrganisasi] = useState(null);

  const [dataUkm, setDataUkm] = useState(null);

  const [loadingDataOrganization, setLoadingDataOrganization] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [changeImage, setChangeImage] = useState(false);

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

  useEffect(() => {
    setLoadingDataOrganization(true);
    async function fetchData() {
      const dataOrganization = await GetDataOrganization({ token: token.value, organization_id: organizationId });
      const data = await dataOrganization.json();
      setDataUkm(data.data);
      setLoadingDataOrganization(false);
    }
    fetchData();
  }, [organizationId, token.value]);

  const SelectUkm = (e, id, name) => {
    e.preventDefault();
    setOrganizationId(id);
    setNamaOrganisasi(name);
  };

  console.log("data org: ", dataUkm);
  return (
    <div className="nk-content">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="components-preview wide-md mx-auto">
              <div className="nk-block-head nk-block-head-lg wide-sm">
                <div className="nk-block-head-content">
                  <h4 className="nk-block-title">Edit organization</h4>
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
              <div className="nk-block nk-block-lg">
                <div className="nk-block-head">
                  {/* <div className="nk-block-head-content">
                    <h4 className="title nk-block-title">Basic example</h4>
                    <div className="nk-block-des">
                      <p>
                        Place one add-on or button on either side of an input. You may also place one on both sides of an input. We do not support multiple form-controls in a single input group and{" "}
                        <code className="code-tag">&lt;label&gt;</code>s must come outside the input group.
                      </p>
                    </div>
                  </div> */}
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
                </div>
                <div className="card card-bordered card-preview">
                  <div className="card-inner">
                    <div className="preview-block">
                      <span className="preview-title-lg overline-title">Default Preview</span>
                      {loadingDataOrganization ? (
                        <div className="row gy-4">
                          <div className="col-sm-6">
                            <div className="form-group">
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
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
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
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
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
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
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
                            </div>
                          </div>
                        </div>
                      ) : (
                        dataUkm && (
                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();

                              setButtonLoading(true);
                              const formData = new FormData(e.currentTarget);
                              const name = formData.get("name");
                              const visi = formData.get("visi");
                              const misi = formData.get("misi");
                              const logo = formData.get("logo");

                              try {
                                const response = await UpdateDataOrganization({ token: token.value, organization_id: organizationId, name_organization: name, foto: logo, visi: visi, misi: misi });
                                if (response.status == 200) {
                                  setMessage(response.data.message);
                                  setAlertSuccess(true);
                                  setAlert(false);
                                  setButtonLoading(false);
                                }
                              } catch (error) {
                                setMessage(error.response.data.message);
                                setAlert(true);
                                setAlertSuccess(false);
                                setButtonLoading(false);
                              }
                            }}
                          >
                            <div className="row gy-4">
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="form-label" htmlFor="default-01">
                                    Name organization
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      value={dataUkm.name_organization}
                                      onChange={(e) => {
                                        setDataUkm({ ...dataUkm, name_organization: e.target.value });
                                      }}
                                      name="name"
                                      className="form-control"
                                      id="default-01"
                                      placeholder="Input placeholder"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="form-label" htmlFor="default-textarea">
                                    Visi
                                  </label>
                                  <div className="form-control-wrap">
                                    <textarea
                                      className="form-control no-resize"
                                      id="default-textarea"
                                      name="visi"
                                      onChange={(e) => {
                                        setDataUkm({ ...dataUkm, visi: e.target.value });
                                      }}
                                    >
                                      {dataUkm.visi && dataUkm.visi}
                                    </textarea>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="form-label" htmlFor="default-06">
                                    Logo ukm
                                  </label>
                                  <div className="form-control-wrap">
                                    <div className="form-file">
                                      <input
                                        type="file"
                                        className="form-control"
                                        name="logo"
                                        onChange={(e) => {
                                          const file = e.target.files[0];
                                          if (file) {
                                            const reader = new FileReader();

                                            reader.onload = (e) => {
                                              setDataUkm({ ...dataUkm, foto: e.target.result });
                                            };

                                            reader.readAsDataURL(file);
                                            setChangeImage(true);
                                          }
                                        }}
                                      />
                                    </div>
                                    {!changeImage ? (
                                      <img src={dataUkm.foto && `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${dataUkm.foto}`} className="mt-3" alt="" width={200} />
                                    ) : (
                                      <img src={dataUkm.foto && `${dataUkm.foto}`} className="mt-3" alt="" width={200} />
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="form-label" htmlFor="default-textarea">
                                    Misi
                                  </label>
                                  <div className="form-control-wrap">
                                    <textarea
                                      className="form-control no-resize"
                                      id="default-textarea"
                                      name="misi"
                                      onChange={(e) => {
                                        setDataUkm({ ...dataUkm, misi: e.target.value });
                                      }}
                                    >
                                      {dataUkm.misi && dataUkm.misi}
                                    </textarea>
                                  </div>
                                </div>
                                <button type="submit" className="btn btn-lg btn-primary" disabled={buttonLoading}>
                                  {buttonLoading ? (
                                    <>
                                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                      <span role="status">Loading...</span>
                                    </>
                                  ) : (
                                    "Update"
                                  )}
                                </button>
                              </div>
                            </div>
                          </form>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
