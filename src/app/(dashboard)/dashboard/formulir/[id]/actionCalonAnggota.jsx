"use client";

import GetDaftarCalon from "@/api/getDaftarCalon";
import PostSelectedAngkatCalon from "@/api/postSelectedAngkatCalon";
import PostSelectedRejectCalon from "@/api/postSelectedRejectCalon";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useContext } from "react";
import { AppContext } from "./actionPage";

export default function ActionCalonAnggota({ token, formid }) {
  const { setDataMahasiswa } = useContext(AppContext);
  const [isClient, setClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [links, setLinks] = useState([]);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState("");
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const status = searchParams.get("status");
  const refSearch = useRef(null);
  // const [checked, setChecked] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const responseCalon = await GetDaftarCalon({ token: token, formid: formid, page: page, search: search, status: status });
      if (responseCalon.ok) {
        const getDataCalon = await responseCalon.json();
        console.log(getDataCalon);
        setLinks(getDataCalon.data.links);
        setData(getDataCalon.data.data);
        setTotalPage(getDataCalon.data.total);
        setIsLoading(false);
      }
    }
    fetchData();
    setClient(true);
    console.log("passing", token, formid);
  }, [search, page, token, formid, status, refresh]);

  const paginateClick = (e, url) => {
    e.preventDefault();
    const urlApi = new URL(url);
    const paramsUrl = urlApi.searchParams;
    const page = paramsUrl.get("page");
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(pathname + "?" + params.toString());
    console.log(search);
  };

  const prevnextClick = (e, url, active) => {
    e.preventDefault();
    if (url !== null) {
      const urlApi = new URL(url);
      const paramsUrl = urlApi.searchParams;
      const page = paramsUrl.get("page");
      const status = paramsUrl.get("status");
      const params = new URLSearchParams(searchParams);
      params.set("page", page);
      params.set("status", status);
      router.push(pathname + "?" + params.toString());
      console.log(search);
    }
  };

  const paginateChange = (e) => {
    const urlApi = new URL(e.target.value);
    const paramsUrl = urlApi.searchParams;
    const page = paramsUrl.get("page");
    const status = paramsUrl.get("status");
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    params.set("status", status);
    router.push(pathname + "?" + params.toString());
    console.log(search);
    console.log("url", e.target.value);
  };

  const handleSearch = (e) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    params.delete("status");
    params.set("search", refSearch.current.value);
    router.push(pathname + "?" + params.toString());
    console.log("ref", refSearch.current.value);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(data);
    } else {
      setSelectedItems([]);
    }
    console.log("select all:", selectAll);
  };

  const handleItemChange = (item, i) => {
    const updatedItems = [...selectedItems];
    if (updatedItems.includes(item)) {
      const index = updatedItems.indexOf(item);
      updatedItems.splice(index, 1);
    } else {
      updatedItems.push(item);
    }
    console.log("item change:", i);
    console.log("data", updatedItems);
    setSelectedItems(updatedItems);
  };

  const AcceptClick = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    try {
      const response = await PostSelectedAngkatCalon({ token: token, selectedData: selectedItems });
      setMessage(response.data.message);
      setAlert(false);
      setAlertSuccess(true);
      setRefresh(!refresh);
      setSelectAll(false);
      setSelectedItems([]);
      // setIsLoading(false);
    } catch (error) {
      setMessage(error.response.data.message);
      setAlert(true);
      setAlertSuccess(false);
      // setIsLoading(false);
    }
  };

  const RejectClick = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    try {
      const response = await PostSelectedRejectCalon({ selectedData: selectedItems, token: token });
      setMessage(response.data.message);
      setAlert(false);
      setAlertSuccess(true);
      setRefresh(!refresh);
      setSelectAll(false);
      setSelectedItems([]);
      // setIsLoading(false);
    } catch (error) {
      setMessage(error.response.data.message);
      setAlert(true);
      setAlertSuccess(false);
      // setIsLoading(false);
    }
  };

  const StatusClick = (e, id_status) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (params.has("page")) {
      params.delete("page");
    }
    if (params.has("status")) {
      params.delete("search");
    }
    params.set("status", id_status);
    router.push(pathname + "?" + params.toString());
    console.log("id_status", id_status);
  };

  return (
    <>
      {isClient && (
        <div className="nk-content-body">
          <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-between">
              <div className="nk-block-head-content">
                <h3 className="nk-block-title page-title">Data calon angota</h3>
                <div className="nk-block-des text-soft">{/* <p>You have total 2,595 users.</p> */}</div>
              </div>
              {/* <div className="nk-block-head-content">
                <div className="toggle-wrap nk-block-tools-toggle">
                  <a href="#" className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="more-options">
                    <em className="icon ni ni-more-v"></em>
                  </a>
                  <div className="toggle-expand-content" data-content="more-options">
                    <ul className="nk-block-tools g-3">
                      <li>
                        <div className="form-control-wrap">
                          <div className="form-icon form-icon-right">
                            <em className="icon ni ni-search"></em>
                          </div>
                          <input type="text" className="form-control" id="default-04" placeholder="Search by name" />
                        </div>
                      </li>
                      <li>
                        <div className="drodown">
                          <a href="#" className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white" data-bs-toggle="dropdown">
                            Status
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <ul className="link-list-opt no-bdr">
                              <li>
                                <a href="#">
                                  <span>Actived</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <span>Inactived</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <span>Blocked</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li className="nk-block-tools-opt">
                        <a href="#" className="btn btn-icon btn-primary d-md-none">
                          <em className="icon ni ni-plus"></em>
                        </a>
                        <a href="#" className="btn btn-primary d-none d-md-inline-flex">
                          <em className="icon ni ni-plus"></em>
                          <span>Add</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
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
          <div className="form-control-wrap col-md-6 col-sm-6 mb-3">
            <div className="input-group">
              <input ref={refSearch} type="text" className="form-control" placeholder="Search..." />
              <div className="input-group-append">
                <button className="btn btn-outline-primary btn-dim" onClick={(e) => handleSearch(e)}>
                  Search
                </button>
              </div>
              <div className="input-group-append ms-3">
                <div className="drodown">
                  <a href="#" className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white" data-bs-toggle="dropdown">
                    Status
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <ul className="link-list-opt no-bdr">
                      <li>
                        <a href="#" onClick={(e) => StatusClick(e, 1)}>
                          <span>Accept</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" onClick={(e) => StatusClick(e, 3)}>
                          <span>Reject</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" onClick={(e) => StatusClick(e, 2)}>
                          <span>Pending</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nk-block">
            <div className="nk-tb-list is-separate mb-3">
              <div className="nk-tb-item nk-tb-head">
                <div className="nk-tb-col nk-tb-col-check">
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className="custom-control-input" id="uid" />
                    <label className="custom-control-label" htmlFor="uid"></label>
                  </div>
                </div>
                <div className="nk-tb-col">
                  <span className="sub-text">Calon anggota</span>
                </div>
                <div className="nk-tb-col tb-col-mb">
                  <span className="sub-text">NIM</span>
                </div>
                <div className="nk-tb-col tb-col-md">
                  <span className="sub-text">Phone</span>
                </div>
                <div className="nk-tb-col tb-col-lg">
                  <span className="sub-text">Kelamin</span>
                </div>
                <div className="nk-tb-col tb-col-lg">
                  <span className="sub-text">Tanggal daftar</span>
                </div>
                <div className="nk-tb-col tb-col-md">
                  <span className="sub-text">Status</span>
                </div>
                <div className="nk-tb-col nk-tb-col-tools">
                  <ul className="nk-tb-actions gx-1 my-n1">
                    <li>
                      <div className="drodown">
                        <a href="#" className="dropdown-toggle btn btn-icon btn-trigger me-n1" data-bs-toggle="dropdown">
                          <em className="icon ni ni-more-h"></em>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <a href="#" onClick={(e) => AcceptClick(e)}>
                                <em className="icon ni ni-mail"></em>
                                <span>Accept</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" onClick={(e) => RejectClick(e)}>
                                <em className="icon ni ni-na"></em>
                                <span>Reject</span>
                              </a>
                            </li>
                            {/* <li>
                              <a href="#">
                                <em className="icon ni ni-trash"></em>
                                <span>Remove Seleted</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <em className="icon ni ni-shield-star"></em>
                                <span>Reset Password</span>
                              </a>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {isLoading ? (
                <div className="nk-tb-item">
                  <div className="nk-tb-col nk-tb-col-check">
                    <div className="custom-control custom-control-sm custom-checkbox notext">
                      <input type="checkbox" className="custom-control-input" id="uid1" />
                      <label className="custom-control-label" htmlFor="uid1"></label>
                    </div>
                  </div>
                  <div className="nk-tb-col">
                    <a href="#">
                      <div className="user-card">
                        <div className="user-info">
                          <span className="tb-lead">
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

                            {/* <span className="dot dot-success d-md-none ms-1"></span> */}
                          </span>
                          <span></span>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="nk-tb-col tb-col-mb">
                    <span className="tb-amount">
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
                      {/* <span className="currency">USD</span> */}
                    </span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span>
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
                  <div className="nk-tb-col tb-col-lg">
                    <span>
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
                  <div className="nk-tb-col tb-col-lg">
                    <span>
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
                </div>
              ) : (
                data.map((value, i) => (
                  <div key={i} className="nk-tb-item">
                    <div className="nk-tb-col nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(value)}
                          onChange={() => handleItemChange(value, i)} // Kirim seluruh objek nilai
                          className="custom-control-input"
                          id={`uid${i}`}
                        />
                        <label className="custom-control-label" htmlFor={`uid${i}`}></label>
                      </div>
                    </div>
                    <div className="nk-tb-col">
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDetail"
                        onClick={(e) => {
                          setDataMahasiswa({
                            name: value.name,
                            email: value.email,
                            no_telepon: value.no_telepon,
                            nim: value.nim,
                            kelamin: value.kelamin,
                          });
                        }}
                      >
                        <div className="user-card">
                          <div className="user-info">
                            <span className="tb-lead">
                              {value.name}
                              <span
                                className={`dot ${(() => {
                                  if (value.status == 3) {
                                    return "dot-danger";
                                  } else if (value.status == 1) {
                                    return "dot-success";
                                  } else {
                                    return "dot-warning";
                                  }
                                })()} d-md-none ms-1`}
                              ></span>
                            </span>
                            <span>{value.email}</span>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="nk-tb-col tb-col-mb">
                      <span className="tb-amount">
                        {value.nim}
                        {/* <span className="currency">USD</span> */}
                      </span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span>{value.no_telepon}</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                      <span>{value.kelamin}</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                      <span>
                        {(() => {
                          const date = new Date(value.created_at);
                          const tahun = date.getFullYear();
                          const bulan = String(date.getMonth() + 1).padStart(2, "0");
                          const tanggal = String(date.getDate()).padStart(2, "0");
                          return `${tahun}-${bulan}-${tanggal}`;
                        })()}
                      </span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span
                        className={`tb-status ${(() => {
                          if (value.status == 3) {
                            return "text-danger";
                          } else if (value.status == 1) {
                            return "text-success";
                          } else {
                            return "text-warning";
                          }
                        })()}`}
                      >
                        {(() => {
                          if (value.status == 3) {
                            return "Reject";
                          } else if (value.status == 1) {
                            return "Accept";
                          } else {
                            return "Pending";
                          }
                        })()}
                      </span>
                    </div>
                    <div className="nk-tb-col nk-tb-col-tools">
                      {/* <ul className="nk-tb-actions gx-1">
                        <li className="nk-tb-action-hidden">
                          <a href="#" className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
                            <em className="icon ni ni-mail-fill"></em>
                          </a>
                        </li>
                        <li className="nk-tb-action-hidden">
                          <a href="#" className="btn btn-trigger btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                            <em className="icon ni ni-user-cross-fill"></em>
                          </a>
                        </li>
                        <li>
                          <div className="drodown">
                            <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown">
                              <em className="icon ni ni-more-h"></em>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <ul className="link-list-opt no-bdr">
                                <li>
                                  <a href="#">
                                    <em className="icon ni ni-mail"></em>
                                    <span>Accept</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <em className="icon ni ni-na"></em>
                                    <span>Reject</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="html/ecommerce/customer-details.html">
                                    <em className="icon ni ni-eye"></em>
                                    <span>View Details</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <em className="icon ni ni-repeat"></em>
                                    <span>Orders</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <em className="icon ni ni-activity-round"></em>
                                    <span>Activities</span>
                                  </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                  <a href="#">
                                    <em className="icon ni ni-shield-star"></em>
                                    <span>Reset Pass</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <em className="icon ni ni-na"></em>
                                    <span>Suspend</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </ul> */}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="card">
              <div className="card-inner">
                <div className="nk-block-between-md g-3">
                  <div className="g">
                    <ul className="pagination justify-content-center justify-content-md-start">
                      {links.map((value, i, array) => {
                        if (i === 0) {
                          return (
                            <li key={i} className="page-item">
                              <a
                                className="page-link"
                                href="#"
                                onClick={(e) => prevnextClick(e, value.url, value.active)}
                                style={value.url === null ? { zIndex: 2, color: "#7a3fff", backgroundColor: "#ebeef2", borderColor: "#e5e9f2" } : {}}
                              >
                                Prev
                              </a>
                            </li>
                          );
                        } else if (i === array.length - 1) {
                          return (
                            <li key={i} className="page-item">
                              <a
                                className="page-link"
                                href="#"
                                onClick={(e) => prevnextClick(e, value.url, value.active)}
                                style={value.url === null ? { zIndex: 2, color: "#7a3fff", backgroundColor: "#ebeef2", borderColor: "#e5e9f2" } : {}}
                              >
                                Next
                              </a>
                            </li>
                          );
                        } else {
                          return (
                            <li key={i} className="page-item">
                              <a className="page-link" onClick={(e) => paginateClick(e, value.url)} href="#" style={value.active ? { zIndex: 2, color: "#7a3fff", backgroundColor: "#ebeef2", borderColor: "#e5e9f2" } : {}}>
                                {value.label}
                              </a>
                            </li>
                          );
                        }
                      })}
                      {/* <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <span className="page-link">
                          <em className="icon ni ni-more-h"></em>
                        </span>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          6
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          7
                        </a>
                      </li> */}
                    </ul>
                  </div>
                  <div className="g">
                    <div className="pagination-goto d-flex justify-content-center justify-content-md-start gx-3">
                      <div>Page</div>
                      <div>
                        <select onChange={(e) => paginateChange(e)} className="form-select js-select2" data-search="on" data-dropdown="xs center">
                          {links.map((value, i, array) => {
                            if (i !== 0 && i !== array.length - 1) {
                              return (
                                <option key={i} value={value.url} defaultChecked={value.active}>
                                  {value.label}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                      <div>OF {totalPage}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
