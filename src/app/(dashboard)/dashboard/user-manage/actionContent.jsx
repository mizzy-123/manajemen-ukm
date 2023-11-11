"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./actionPage";
import GetMyOrganization from "@/api/getMyOrganization";
import GetAllOrganization from "@/api/getAllOrganization";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function ActionContent() {
  const { token, roleid, idUkm, setIdUkm, setNamaUkm, setNamaMahasiswa, setIdMahahasiswa, setDataMahasiswa } = useContext(AppContext);
  const [isClient, setClient] = useState(false);
  const refSearch = useRef(null);

  const [organizaton, setOrganization] = useState([]);
  const [organizationId, setOrganizationId] = useState(null);
  const [namaOrganisasi, setNamaOrganisasi] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const search = searchParams.get("search");
  const page = searchParams.get("page");

  useEffect(() => {
    async function fetchData() {
      const responseOrganization = await GetAllOrganization({ token: token.value });
      const dataOrganization = await responseOrganization.json();
      if (!responseOrganization.ok) {
        throw new Error("Something wrong");
      }
      setOrganization(dataOrganization.data);
      setLoading(false);
      console.log("dataOrganization", dataOrganization);
    }
    fetchData();
    setClient(true);
  }, [token]);

  const SelectUkm = (e, id, name) => {
    e.preventDefault();
    setOrganizationId(id);
    setNamaOrganisasi(name);
    setNamaUkm(name);
    setIdUkm(id);
    console.log("id", id);
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
    }
  };

  const paginateClick = (e, url) => {
    e.preventDefault();
    const urlApi = new URL(url);
    const paramsUrl = urlApi.searchParams;
    const page = paramsUrl.get("page");
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(pathname + "?" + params.toString());
  };

  const userOrganization = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());

  const { data: dataAllUser, isLoading: loadingAllUser } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-organization?organization_id=${idUkm}&search=${search !== null ? search : ""}&page=${page !== null ? page : ""}`,
    userOrganization,
    {
      refreshInterval: 1000,
    }
  );

  return (
    <>
      {isClient && (
        <div className="nk-content ">
          <div className="container-fluid">
            <div className="nk-content-inner">
              <div className="nk-content-body">
                <div className="nk-block-head nk-block-head-sm">
                  <div className="nk-block-between">
                    <div className="nk-block-head-content">
                      <h3 className="nk-block-title page-title">Users Lists</h3>
                      <div className="nk-block-des text-soft">
                        <p>You have total 2,595 users.</p>
                      </div>
                    </div>
                    <div className="nk-block-head-content"></div>
                  </div>
                </div>
                <div className="form-control-wrap col-md-6 col-sm-6 mb-3">
                  <div className="input-group">
                    <input ref={refSearch} type="text" className="form-control" placeholder="Search..." />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-primary btn-dim"
                        onClick={(e) => {
                          const params = new URLSearchParams(searchParams);
                          params.delete("page");
                          params.set("search", refSearch.current.value);
                          router.push(pathname + "?" + params.toString());
                        }}
                      >
                        Search
                      </button>
                    </div>
                    <div className="input-group-append ms-3"></div>
                  </div>
                </div>
                <div className="nk-block">
                  <div className="card card-stretch">
                    <div className="card-inner-group">
                      <div className="card-inner position-relative card-tools-toggle">
                        <div className="card-title-group">
                          <div className="card-tools">
                            <div className="form-inline flex-nowrap gx-3">
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
                        <div className="card-search search-wrap" data-search="search">
                          <div className="card-body">
                            <div className="search-content">
                              <a href="#" className="search-back btn btn-icon toggle-search" data-target="search">
                                <em className="icon ni ni-arrow-left"></em>
                              </a>
                              <input type="text" className="form-control border-transparent form-focus-none" placeholder="Search by user or email" />
                              <button className="search-submit btn btn-icon">
                                <em className="icon ni ni-search"></em>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-inner p-0">
                        <div className="nk-tb-list nk-tb-ulist is-compact">
                          <div className="nk-tb-item nk-tb-head">
                            <div className="nk-tb-col nk-tb-col-check">#</div>
                            <div className="nk-tb-col">
                              <span className="sub-text">User</span>
                            </div>
                            <div className="nk-tb-col tb-col-md">
                              <span className="sub-text">Role</span>
                            </div>
                            <div className="nk-tb-col tb-col-sm">
                              <span className="sub-text">Email</span>
                            </div>
                            <div className="nk-tb-col tb-col-md">
                              <span className="sub-text">Phone</span>
                            </div>
                            {/* <div className="nk-tb-col tb-col-xxl">
                              <span className="sub-text">Company</span>
                            </div> */}
                            <div className="nk-tb-col tb-col-lg">
                              <span className="sub-text">NIM</span>
                            </div>
                            {/* <div className="nk-tb-col tb-col-xxl">
                              <span className="sub-text">Last Login</span>
                            </div> */}
                            {/* <div className="nk-tb-col">
                              <span className="sub-text">Status</span>
                            </div> */}
                            <div className="nk-tb-col nk-tb-col-tools text-end"></div>
                          </div>
                          {loadingAllUser ? (
                            <div className="nk-tb-item">
                              <div className="nk-tb-col nk-tb-col-check">
                                <ul className="preview-list g-1">
                                  <li className="preview-item">
                                    <div className="spinner-grow spinner-grow-sm" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className="nk-tb-col">
                                <div className="user-card">
                                  {/* <div className="user-avatar xs bg-primary">
                                  <span>AB</span>
                                </div> */}
                                  <div className="user-name">
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
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="nk-tb-col tb-col-md">
                                <span className="d-flex flex-column">
                                  <div>
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
                                  </div>
                                </span>
                              </div>
                              <div className="nk-tb-col tb-col-sm">
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
                              <div className="nk-tb-col tb-col-xxl">
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
                                <ul className="list-status">
                                  <li>
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
                                  </li>
                                </ul>
                              </div>
                              {/* <div className="nk-tb-col tb-col-xxl">
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
                              </div> */}
                              {/* <div className="nk-tb-col">
                                <span className="tb-status text-success">
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
                              </div> */}
                              <div className="nk-tb-col nk-tb-col-tools"></div>
                            </div>
                          ) : (
                            dataAllUser.data.data.map((value, i) => (
                              <div className="nk-tb-item" key={i}>
                                <div className="nk-tb-col nk-tb-col-check">{i + 1}</div>
                                <div className="nk-tb-col">
                                  <div className="user-card">
                                    {/* <div className="user-avatar xs bg-primary">
                                  <span>AB</span>
                                </div> */}
                                    <div className="user-name">
                                      <span className="tb-lead">{value.name}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="nk-tb-col tb-col-md">
                                  <span className="d-flex flex-column">
                                    {value.role.map((value, i) => (
                                      <div key={i}>{value.name}</div>
                                    ))}
                                  </span>
                                </div>
                                <div className="nk-tb-col tb-col-sm">
                                  <span>{value.email}</span>
                                </div>
                                <div className="nk-tb-col tb-col-md">
                                  <span>{value.no_telepon}</span>
                                </div>
                                {/* <div className="nk-tb-col tb-col-xxl">
                                <span>Bangladesh</span>
                              </div> */}
                                <div className="nk-tb-col tb-col-lg">
                                  <span>{value.nim}</span>
                                </div>
                                {/* <div className="nk-tb-col tb-col-xxl">
                                <span>10 Feb 2020</span>
                              </div> */}
                                {/* <div className="nk-tb-col">
                                  <span className="tb-status text-success">Active</span>
                                </div> */}
                                <div className="nk-tb-col nk-tb-col-tools">
                                  <ul className="nk-tb-actions gx-2">
                                    {/* <li className="nk-tb-action-hidden">
                                      <a href="#" className="btn btn-sm btn-icon btn-trigger" data-bs-toggle="tooltip" data-bs-placement="top" title="Wallet">
                                        <em className="icon ni ni-wallet-fill"></em>
                                      </a>
                                    </li>
                                    <li className="nk-tb-action-hidden">
                                      <a href="#" className="btn btn-sm btn-icon btn-trigger" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
                                        <em className="icon ni ni-mail-fill"></em>
                                      </a>
                                    </li>
                                    <li className="nk-tb-action-hidden">
                                      <a href="#" className="btn btn-sm btn-icon btn-trigger" data-bs-toggle="tooltip" data-bs-placement="top" title="Suspend">
                                        <em className="icon ni ni-user-cross-fill"></em>
                                      </a>
                                    </li> */}
                                    <li>
                                      <div className="drodown">
                                        <a href="#" className="btn btn-sm btn-icon btn-trigger dropdown-toggle" data-bs-toggle="dropdown">
                                          <em className="icon ni ni-more-h"></em>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end">
                                          <ul className="link-list-opt no-bdr">
                                            <li>
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
                                                    role: value.role[0].name,
                                                  });
                                                }}
                                              >
                                                <em className="icon ni ni-eye"></em>
                                                <span>View Details</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                href="#"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalRole"
                                                onClick={(e) => {
                                                  setNamaMahasiswa(value.name);
                                                  setIdMahahasiswa(value.id);
                                                }}
                                              >
                                                <em className="icon ni ni-repeat"></em>
                                                <span>Edit role</span>
                                              </a>
                                            </li>
                                            <li className="divider"></li>
                                            <li>
                                              <a href="#">
                                                <em className="icon ni ni-shield-star"></em>
                                                <span>Reset Pass</span>
                                              </a>
                                            </li>
                                            {/* <li>
                                              <a href="#">
                                                <em className="icon ni ni-shield-off"></em>
                                                <span>Reset 2FA</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#">
                                                <em className="icon ni ni-na"></em>
                                                <span>Suspend User</span>
                                              </a>
                                            </li> */}
                                          </ul>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                      <div className="card-inner">
                        <ul className="pagination justify-content-center justify-content-md-start">
                          {loadingAllUser ? (
                            <li className="preview-item">
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </li>
                          ) : (
                            dataAllUser.data.links.map((value, i, array) => {
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
                            })
                          )}
                        </ul>
                      </div>
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
