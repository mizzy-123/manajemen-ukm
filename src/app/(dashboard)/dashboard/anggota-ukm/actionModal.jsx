"use client";

import { useContext, useRef, useState } from "react";
import { AppContext } from "./actionPage";
import useSWR from "swr";
import UpdateRole from "@/api/updateRole";

export default function ActionModal() {
  const { token, roleid, idUkm, namaUkm, idMahasiswa, namaMahasiswa, dataMahasiswa } = useContext(AppContext);

  const refSubmit = useRef(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  const allRole = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());

  const { data: dataAllRole, isLoading: loadingRole } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/all-role-except-sa`, allRole, {
    revalidateIfStale: true,
  });

  return (
    <>
      <div className="modal fade" id="modalDetail">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">View details</h5>
              <a href="#" className="close" data-bs-dismiss="modal" aria-label="Close" ref={refSubmit}>
                <em className="icon ni ni-cross"></em>
              </a>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  Mahasiswa
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={dataMahasiswa.name} id="full-name" readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  UKM
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={namaUkm} id="full-name" readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  Email
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={dataMahasiswa.email} id="full-name" readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  Phone
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={dataMahasiswa.no_telepon} id="full-name" readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  NIM
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={dataMahasiswa.nim} id="full-name" readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  Role
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={dataMahasiswa.role} id="full-name" readOnly />
                </div>
              </div>
            </div>
            <div className="modal-footer bg-light">
              <span className="sub-text">Modal Footer Text</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
