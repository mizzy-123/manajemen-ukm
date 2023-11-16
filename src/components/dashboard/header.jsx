"use client";

import GetRole from "@/api/getRole";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GetUser from "@/api/getUser";
import deleteToken from "@/cookie/deleteToken";
import SaveRole from "@/cookie/saveRole";

export default function Header({ token, roleid }) {
  // const [currentRole, setCurrentRole] = useState(0);
  const [allrole, setAllRole] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleClick = (e, role) => {
    e.preventDefault();
    // setCurrentRole(role);
    // onSelect(role);
    SaveRole({ role: role });
    router.refresh();
    setTimeout(() => {
      // location.reload(true);
      window.location.reload();
    }, 2000);
  };

  const LogoutClick = (e) => {
    e.preventDefault();
    deleteToken();
    router.refresh();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    async function fetchdata() {
      const user = await GetUser({ token: token });
      const roleData = await GetRole({ token: token });
      setAllRole(roleData.data.data);
      setUser(user.data.data);
      setLoading(false);
    }
    fetchdata();
  }, []);

  return (
    <div className="nk-header nk-header-fixed is-light">
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ms-n1">
            <a href="#" className="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu">
              <em className="icon ni ni-menu"></em>
            </a>
          </div>
          <div className="nk-header-brand d-xl-none">
            <a href="html/index.html" className="logo-link">
              <img className="logo-light logo-img" src={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`} srcSet={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo2x.png 2x`} alt="logo" />
              <img className="logo-dark logo-img" src={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo-dark.png`} srcSet={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo-dark2x.png 2x`} alt="logo-dark" />
            </a>
          </div>
          {/* <!-- .nk-header-brand --> */}
          <div className="nk-header-search ms-3 ms-xl-0">
            {/* <em className="icon ni ni-search"></em> */}
            {/* <input type="text" className="form-control border-transparent form-focus-none" placeholder="Search anything" /> */}
          </div>
          {/* <!-- .nk-header-news --> */}
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li>
                {loading ? (
                  <>
                    <div className="spinner-grow spinner-grow-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </>
                ) : (
                  <div className="drodown">
                    <a href="#" className="dropdown-toggle btn btn-white btn-dim btn-outline-light" data-bs-toggle="dropdown">
                      <span>
                        <span className="d-none d-md-inline">{"-->"}</span> <ChangeTextRoleHeader roleid={roleid} />
                      </span>
                      <em className="dd-indc icon ni ni-chevron-right"></em>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <ul className="link-list-opt no-bdr">
                        <li>
                          {allrole.map((datarole) => (
                            <a key={datarole.id} href="#" onClick={(e) => handleClick(e, datarole.id)}>
                              <span>{datarole.name}</span>
                            </a>
                          ))}

                          {/* <a href="#" onClick={(e) => handleClick(e, 2)}>
                            <span>Admin</span>
                          </a> */}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>

              <li className="dropdown user-dropdown">
                <a href="#" className="dropdown-toggle me-n1" data-bs-toggle="dropdown">
                  <div className="user-toggle">
                    <div className="user-avatar sm">
                      <em className="icon ni ni-user-alt"></em>
                    </div>
                    <div className="user-info d-none d-xl-block">
                      {/* <div className="user-status user-status-unverified">Unverified</div> */}
                      <div className="user-name dropdown-indicator">
                        {loading ? (
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
                        ) : (
                          user.name
                        )}
                      </div>
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-md dropdown-menu-end">
                  <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card">
                      {/* <div className="user-avatar">
                        <span>AB</span>
                      </div> */}
                      <div className="user-info">
                        <span className="lead-text">
                          {loading ? (
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
                          ) : (
                            user.name
                          )}
                        </span>
                        <span className="sub-text">
                          {loading ? (
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
                          ) : (
                            user.email
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      {/* <li>
                        <a href="html/user-profile-regular.html">
                          <em className="icon ni ni-user-alt"></em>
                          <span>View Profile</span>
                        </a>
                      </li> */}
                      <li>
                        <a href="html/user-profile-setting.html">
                          <em className="icon ni ni-setting-alt"></em>
                          <span>Account Setting</span>
                        </a>
                      </li>
                      {/* <li>
                        <a href="html/user-profile-activity.html">
                          <em className="icon ni ni-activity-alt"></em>
                          <span>Login Activity</span>
                        </a>
                      </li>
                      <li>
                        <a className="dark-switch" href="#">
                          <em className="icon ni ni-moon"></em>
                          <span>Dark Mode</span>
                        </a>
                      </li> */}
                    </ul>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li>
                        <a href="#" onClick={(e) => LogoutClick(e)}>
                          <em className="icon ni ni-signout"></em>
                          <span>Sign out</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- .nk-header-wrap --> */}
      </div>
      {/* <!-- .container-fliud --> */}
    </div>
  );
}

function ChangeTextRoleHeader({ roleid }) {
  if (roleid == 0) {
    return <>Role</>;
  } else if (roleid == 1) {
    return <>Super Admin</>;
  } else if (roleid == 2) {
    return <>Admin</>;
  } else if (roleid == 3) {
    return <>Anggota</>;
  }
}
