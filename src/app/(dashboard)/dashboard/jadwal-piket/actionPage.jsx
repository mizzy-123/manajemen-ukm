"use client";

import GetMyOrganization from "@/api/getMyOrganization";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function ActionPage({ children, token, roleid }) {
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  const allUser = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());
  const { data: dataAllUser, isLoading: loadingAllUser } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/allUser`, allUser, {
    revalidateIfStale: true,
  });
  const organization = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());
  const { data: myOrganization, isLoading: loadingOrg } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/myorganization?role_id=${roleid}`, organization, {
    revalidateIfStale: true,
  });

  return (
    <>
      {isClient && (
        <>
          {children}
          <div className="modal fade" id="modalForm">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Tambah petugas piket</h5>
                  <a href="#" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <em className="icon ni ni-cross"></em>
                  </a>
                </div>
                <div className="modal-body">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const organization_id = formData.get("organization_id");
                      const mahasiswa_id = formData.get("mahasiswa_id");
                      console.log("org", organization_id);
                      console.log("mh", mahasiswa_id);
                    }}
                  >
                    <div className="form-group">
                      <label className="form-label" htmlFor="full-name">
                        UKM
                      </label>
                      <div className="form-control-wrap">
                        <select className="form-select" aria-label="Default select example" name="organization_id">
                          {loadingOrg ? (
                            <>
                              <option>Loading...</option>
                            </>
                          ) : (
                            myOrganization.data.map((value, i) => (
                              <option key={i} value={value.id}>
                                {value.name_organization}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="full-name">
                        Mahasiswa
                      </label>
                      <div className="form-control-wrap">
                        <select className="form-select" aria-label="Default select example" name="mahasiswa_id">
                          {loadingAllUser ? (
                            <>
                              <option>Loading...</option>
                            </>
                          ) : (
                            dataAllUser.data.map((value, i) => (
                              <option key={i} value={value.id}>
                                {value.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-lg btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <div className="modal-footer bg-light">
                  <span className="sub-text">Modal Footer Text</span>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="editPiket">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Tambah rekruitment</h5>
                  <a href="#" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <em className="icon ni ni-cross"></em>
                  </a>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label className="form-label" htmlFor="full-name">
                        UKM
                      </label>
                      <div className="form-control-wrap">
                        <select className="form-select" aria-label="Default select example">
                          <option defaultValue={0}>Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Datepicker with Icon</label>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-left">
                          <em className="icon ni ni-calendar"></em>
                        </div>
                        <input name="expired" type="text" className="form-control date-picker" data-date-format="yyyy-mm-dd" required />
                      </div>
                      <div className="form-note">
                        Date format <code>yyyy-mm-dd</code>
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-lg btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <div className="modal-footer bg-light">
                  <span className="sub-text">Modal Footer Text</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
