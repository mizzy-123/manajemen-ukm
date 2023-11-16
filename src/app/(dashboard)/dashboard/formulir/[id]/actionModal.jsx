"use client";

import { useContext, useRef, useState } from "react";
import { AppContext } from "./actionPage";

export default function ActionModal() {
  const { token, dataMahasiswa } = useContext(AppContext);
  const refSubmit = useRef(null);
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
                  Nama
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={dataMahasiswa.name} id="full-name" readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  Nim
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={dataMahasiswa.nim} id="full-name" readOnly />
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
                  Kelamin
                </label>
                <div className="form-control-wrap">
                  <input type="text" className="form-control" value={dataMahasiswa.kelamin} id="full-name" readOnly />
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
