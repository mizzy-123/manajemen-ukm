"use client";

import { useContext } from "react";
import { AppContext } from "./actionPage";

export default function ActionContent() {
  const { token, roleid, profile } = useContext(AppContext);
  console.log("profile", profile);
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
                            <h4 className="nk-block-title">Personal Information</h4>
                            <div className="nk-block-des">
                              <p>Basic info, like your name and phone number</p>
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
                        <div className="nk-data data-list">
                          <div className="data-head">
                            <h6 className="overline-title">Basics</h6>
                          </div>
                          <div className="data-item" data-bs-toggle="modal" data-bs-target="#profile-edit">
                            <div className="data-col">
                              <span className="data-label">Full Name</span>
                              <span className="data-value">{profile.data.name}</span>
                            </div>
                            <div className="data-col data-col-end">
                              <span className="data-more">
                                <em className="icon ni ni-forward-ios"></em>
                              </span>
                            </div>
                          </div>
                          <div className="data-item" data-bs-toggle="modal" data-bs-target="#profile-edit">
                            <div className="data-col">
                              <span className="data-label">NIM</span>
                              <span className="data-value">{profile.data.nim}</span>
                            </div>
                            <div className="data-col data-col-end">
                              <span className="data-more">
                                <em className="icon ni ni-forward-ios"></em>
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Email</span>
                              <span className="data-value">{profile.data.email}</span>
                            </div>
                            <div className="data-col data-col-end">
                              <span className="data-more disable">
                                <em className="icon ni ni-lock-alt"></em>
                              </span>
                            </div>
                          </div>
                          <div className="data-item" data-bs-toggle="modal" data-bs-target="#profile-edit">
                            <div className="data-col">
                              <span className="data-label">Phone Number</span>
                              <span className="data-value text-soft">{profile.data.no_telepon !== null ? profile.data.no_telepon : "-----"}</span>
                            </div>
                            <div className="data-col data-col-end">
                              <span className="data-more">
                                <em className="icon ni ni-forward-ios"></em>
                              </span>
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
                              <a className="active" href="html/user-profile-regular.html">
                                <em className="icon ni ni-user-fill-c"></em>
                                <span>Personal Infomation</span>
                              </a>
                            </li>
                            <li>
                              <a href="html/user-profile-setting.html">
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
