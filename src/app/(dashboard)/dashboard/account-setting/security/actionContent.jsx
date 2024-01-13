"use client";

import Link from "next/link";
import { AppContext } from "./actionPage";
import { useContext } from "react";
import useSWR from "swr";
import { format } from "date-fns";

export default function ActionContent() {
  const { token, roleid } = useContext(AppContext);

  const me = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());

  const { data: dataMe, isLoading: loadingMe } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, me, {
    refreshInterval: 1000,
  });

  console.log("me", dataMe);
  return (
    <>
      <div className="nk-content ">
        <div className="container-fluid">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">
                <div className="card">
                  <div className="card-aside-wrap">
                    <div className="card-inner card-inner-lg">
                      <div className="nk-block-head nk-block-head-lg">
                        <div className="nk-block-between">
                          <div className="nk-block-head-content">
                            <h4 className="nk-block-title">Security Settings</h4>
                            <div className="nk-block-des">
                              <p>These settings are helps you keep your account secure.</p>
                            </div>
                          </div>
                          <div className="nk-block-head-content align-self-start d-lg-none">
                            <a href="#" className="toggle btn btn-icon btn-trigger mt-n1" data-target="userAside">
                              <em className="icon ni ni-menu-alt-r"></em>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="nk-block">
                        <div className="card">
                          <div className="card-inner-group">
                            <div className="card-inner">
                              <div className="between-center flex-wrap g-3">
                                <div className="nk-block-text">
                                  <h6>Change Password</h6>
                                  <p>Set a unique password to protect your account.</p>
                                </div>
                                <div className="nk-block-actions flex-shrink-sm-0">
                                  <ul className="align-center flex-wrap flex-sm-nowrap gx-3 gy-2">
                                    <li className="order-md-last">
                                      <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalForm">
                                        Change Password
                                      </a>
                                    </li>
                                    <li>
                                      <em className="text-soft text-date fs-12px">
                                        Last changed:{" "}
                                        <span>
                                          {(() => {
                                            if (!loadingMe) {
                                              const parsedDate = new Date(dataMe.data.updated_at);

                                              // Format tanggal sesuai dengan keinginan Anda
                                              const formattedDate = format(parsedDate, "dd MMM yyyy, hh:mm a");
                                              return formattedDate;
                                            }
                                          })()}
                                        </span>
                                      </em>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg" data-toggle-body="true" data-content="userAside" data-toggle-screen="lg" data-toggle-overlay="true">
                      <div className="card-inner-group">
                        <div className="card-inner p-0">
                          <ul className="link-list-menu">
                            <li>
                              <Link href="/dashboard/account-setting/personal">
                                <em className="icon ni ni-user-fill-c"></em>
                                <span>Personal Infomation</span>
                              </Link>
                            </li>
                            <li>
                              <a className="active" href="html/user-profile-setting.html">
                                <em className="icon ni ni-lock-alt-fill"></em>
                                <span>Security Settings</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
