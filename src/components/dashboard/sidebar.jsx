"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar({ role }) {
  const pathname = usePathname();
  return (
    <div className="nk-sidebar nk-sidebar-fixed is-light " data-content="sidebarMenu">
      <div className="nk-sidebar-element nk-sidebar-head">
        <div className="nk-sidebar-brand">
          <a href="/dashboard" className="logo-link nk-sidebar-logo">
            <img width={105} src={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`} alt="logo" />
            {/* <img className="logo-light logo-img" src={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`} srcSet={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo2x.png 2x`} alt="logo" />
            <img className="logo-dark logo-img" src={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo-dark.png`} srcSet={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo-dark2x.png 2x`} alt="logo-dark" />
            <img className="logo-small logo-img logo-img-small" src={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo-small.png`} srcSet={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo-small2x.png 2x`} alt="logo-small" /> */}
          </a>
        </div>
        <div className="nk-menu-trigger me-n2">
          <a href="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu">
            <em className="icon ni ni-arrow-left"></em>
          </a>
          <a href="#" className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu">
            <em className="icon ni ni-menu"></em>
          </a>
        </div>
      </div>
      {/* <!-- .nk-sidebar-element --> */}
      <div className="nk-sidebar-element">
        <div className="nk-sidebar-content">
          <div className="nk-sidebar-menu" data-simplebar>
            <ul className="nk-menu">
              {/* <!-- .nk-menu-item --> */}
              <li className="nk-menu-heading">
                <h6 className="overline-title text-primary-alt">Dashboards</h6>
              </li>
              {/* <!-- .nk-menu-item --> */}
              {role == 1 && (
                <>
                  <li className="nk-menu-item">
                    <Link href="/dashboard/user-manage" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-users-fill"></em>
                      </span>
                      <span className="nk-menu-text">User Manage</span>
                    </Link>
                  </li>
                  <li className="nk-menu-item">
                    <Link href="/dashboard/organization" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-property-add"></em>
                      </span>
                      <span className="nk-menu-text">Tambah ukm</span>
                    </Link>
                  </li>
                </>
              )}
              {/* <!-- .nk-menu-item --> */}
              {/* <li className="nk-menu-item">
                <a href="html/index-sales.html" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-activity-round-fill"></em>
                  </span>
                  <span className="nk-menu-text">Sales</span>
                </a>
              </li> */}

              {/* <!-- .nk-menu-heading --> */}
              {role == 2 && (
                <>
                  <li className={`nk-menu-item ${pathname === "/dashboard/jadwal-piket" ? "active current-page" : ""}`}>
                    <Link href="/dashboard/jadwal-piket" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-calendar-alt"></em>
                      </span>
                      <span className="nk-menu-text">Jadwal Piket</span>
                    </Link>
                  </li>
                  <li className={`nk-menu-item ${pathname === "/dashboard/formulir" ? "active" : ""}`}>
                    <a href="/dashboard/formulir" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-users-fill"></em>
                      </span>
                      <span className="nk-menu-text">Perekrutan ukm</span>
                    </a>
                    {/* <ul className="nk-menu-sub">
                      <li className="nk-menu-item">
                        <a href="html/project-card.html" className="nk-menu-link">
                          <span className="nk-menu-text">Rekrut anggota</span>
                        </a>
                      </li>
                      <li className="nk-menu-item">
                        <a href="/dashboard/formulir" className="nk-menu-link">
                          <span className="nk-menu-text">Formulir & Calon anggota</span>
                        </a>
                      </li>
                    </ul> */}
                    {/* <!-- .nk-menu-sub --> */}
                  </li>
                  <li className={`nk-menu-item ${pathname === "/dashboard/rapat" ? "active current-page" : ""}`}>
                    <a href="/dashboard/rapat" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-tile-thumb-fill"></em>
                      </span>
                      <span className="nk-menu-text">Proker</span>
                    </a>
                  </li>
                  <li className={`nk-menu-item ${pathname === "/dashboard/data-presensi" ? "active current-page" : ""}`}>
                    <Link href="/dashboard/data-presensi" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-table-view-fill"></em>
                      </span>
                      <span className="nk-menu-text">Data presensi</span>
                    </Link>
                  </li>
                  <li className={`nk-menu-item ${pathname === "/dashboard/anggota-ukm" ? "active current-page" : ""}`}>
                    <Link href="/dashboard/anggota-ukm" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-users-fill"></em>
                      </span>
                      <span className="nk-menu-text">Anggota ukm</span>
                    </Link>
                  </li>
                  <li className={`nk-menu-item ${pathname === "/dashboard/edit-ukm" ? "active current-page" : ""}`}>
                    <Link href="/dashboard/edit-ukm" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-property"></em>
                      </span>
                      <span className="nk-menu-text">Edit ukm</span>
                    </Link>
                  </li>
                </>
              )}
              {role == 3 && (
                <>
                  <li className={`nk-menu-item ${pathname === "/dashboard/piket" ? "active current-page" : ""}`}>
                    <Link href="/dashboard/piket" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-calendar-alt"></em>
                      </span>
                      <span className="nk-menu-text">Jadwal Piket</span>
                    </Link>
                  </li>
                  <li className={`nk-menu-item ${pathname === "/dashboard/jadwal-rapat" ? "active current-page" : ""}`}>
                    <Link href="/dashboard/jadwal-rapat" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-tile-thumb-fill"></em>
                      </span>
                      <span className="nk-menu-text">Proker</span>
                    </Link>
                  </li>
                  <li className={`nk-menu-item ${pathname === "/dashboard/absen" ? "active current-page" : ""}`}>
                    <Link href="/dashboard/absen" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-note-add-c"></em>
                      </span>
                      <span className="nk-menu-text">Absensi</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {/* <!-- .nk-menu --> */}
          </div>
          {/* <!-- .nk-sidebar-menu --> */}
        </div>
        {/* <!-- .nk-sidebar-content --> */}
      </div>
      {/* <!-- .nk-sidebar-element --> */}
    </div>
  );
}

export default Sidebar;
