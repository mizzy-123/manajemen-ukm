"use client";

import { useContext } from "react";
import { AppContext } from "./actionPage";
import useSWR from "swr";

export default function ActionContent() {
  const { token, organization, setOrganization } = useContext(AppContext);

  const allOrganization = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());

  const { data: dataOrganization, isLoading: loadingAllOrganization } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/all-organization`, allOrganization, {
    refreshInterval: 1000,
  });
  return (
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
            {/* <div className="form-control-wrap col-md-6 col-sm-6 mb-3">
                  <div className="input-group">
                    <input ref={refSearch} type="text" className="form-control" placeholder="Search..." />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-primary btn-dim"
                        
                      >
                        Search
                      </button>
                    </div>
                    <div className="input-group-append ms-3"></div>
                  </div>
                </div> */}
            <div className="nk-block">
              <div className="card card-stretch">
                <div className="card-inner-group">
                  <div className="card-inner position-relative card-tools-toggle">
                    <div className="card-title-group">
                      <div className="card-tools">
                        <div className="form-inline flex-nowrap gx-3">
                          <div className="nk-block-head-content" data-bs-toggle="modal" data-bs-target="#modalTambahUkm">
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
                          <span className="sub-text">Nama ukm</span>
                        </div>
                        <div className="nk-tb-col tb-col-md">
                          <span className="sub-text">Jumlah anggota</span>
                        </div>
                        {/* <div className="nk-tb-col tb-col-sm">
                          <span className="sub-text">Email</span>
                        </div> */}
                        {/* <div className="nk-tb-col tb-col-md">
                          <span className="sub-text">Phone</span>
                        </div> */}
                        {/* <div className="nk-tb-col tb-col-xxl">
                              <span className="sub-text">Company</span>
                            </div> */}
                        {/* <div className="nk-tb-col tb-col-lg">
                          <span className="sub-text">NIM</span>
                        </div> */}
                        {/* <div className="nk-tb-col tb-col-xxl">
                              <span className="sub-text">Last Login</span>
                            </div> */}
                        {/* <div className="nk-tb-col">
                              <span className="sub-text">Status</span>
                            </div> */}
                        <div className="nk-tb-col nk-tb-col-tools text-end"></div>
                      </div>
                      {loadingAllOrganization ? (
                        <div className="nk-tb-item">
                          <div className="nk-tb-col nk-tb-col-check">
                            <ul className="preview-list g-1">
                              <li className="preview-item">
                                <div className="spinner-border spinner-border-sm" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="nk-tb-col">
                            <div className="user-card">
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

                          <div className="nk-tb-col nk-tb-col-tools">
                            <ul className="nk-tb-actions gx-2"></ul>
                          </div>
                        </div>
                      ) : (
                        dataOrganization.data.map((value, i) => (
                          <div className="nk-tb-item" key={i}>
                            <div className="nk-tb-col nk-tb-col-check">{i + 1}</div>
                            <div className="nk-tb-col">
                              <div className="user-card">
                                {/* <div className="user-avatar xs bg-primary">
                                  <span>AB</span>
                                </div> */}
                                <div className="user-name">
                                  <span className="tb-lead">{value.name_organization}</span>
                                </div>
                              </div>
                            </div>
                            <div className="nk-tb-col tb-col-md">
                              <span className="d-flex flex-column">{value.users_count}</span>
                            </div>
                            {/* <div className="nk-tb-col tb-col-sm">
                          <span>sdfsdf</span>
                        </div> */}
                            {/* <div className="nk-tb-col tb-col-md">
                          <span>sadfsdafsdf</span>
                        </div> */}
                            {/* <div className="nk-tb-col tb-col-xxl">
                                <span>Bangladesh</span>
                              </div> */}
                            {/* <div className="nk-tb-col tb-col-lg">
                          <span>sadfsadfsdf</span>
                        </div> */}
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
                                        {/* <li>
                                          <a>
                                            <em className="icon ni ni-eye"></em>
                                            <span>View Details</span>
                                          </a>
                                        </li> */}
                                        <li data-bs-toggle="modal" data-bs-target="#modalEditUkm">
                                          <a
                                            href="#"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setOrganization({
                                                id: value.id,
                                                name_organization: value.name_organization,
                                              });
                                            }}
                                          >
                                            <em className="icon ni ni-pen"></em>
                                            <span>Edit</span>
                                          </a>
                                        </li>
                                        {/* <li className="divider"></li> */}
                                        {/* <li>
                                          <a
                                            href="#"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setOrganization({
                                                id: value.id,
                                                name_organization: value.name_organization,
                                              });
                                            }}
                                          >
                                            <em className="icon ni ni-shield-star"></em>
                                            <span>Hapus</span>
                                          </a>
                                        </li> */}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
