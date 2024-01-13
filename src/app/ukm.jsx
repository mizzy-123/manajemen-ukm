"use client";

import { useState } from "react";

export default function Ukm({ organization }) {
  const chunkOrganization = chunkArray(organization, 4);
  const [dataOrganization, setDataOrganization] = useState({});

  console.log("chunk", chunkOrganization);
  return (
    <>
      <div className="section_three" id="ukm">
        {chunkOrganization.map((value, i) => (
          <div key={i} className="row text-center justify-content-center gap-5 mb-5">
            {value.map((data, index) => (
              <div key={index} className="card" style={{ width: "15rem" }}>
                {data.foto !== null ? <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${data.foto}`} className="card-img" alt="..." /> : <img src="Asset/Unitease_logo_big.png" className="card-img" alt="..." />}
                <div className="card-body">
                  <h5 className="card-title">{data.name_organization}</h5>
                  <div className="d-flex justify-content-center gap-4">
                    <a href={`/formulir/${data.id}`} className="btn button-daftar-ukm btn-primary">
                      Daftar
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setDataOrganization(data);
                      }}
                      className="btn button-detail-ukm btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Details →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="staticBackdropLabel">
                Detail {dataOrganization.name_organization}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-dark">
              <div className="d-flex justify-content-center mb-3">
                {dataOrganization.foto !== null ? <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${dataOrganization.foto}`} width={200} /> : <img src="Asset/Unitease_logo_big.png" width={200} alt="..." />}
              </div>
              <div className="d-flex align-items-center flex-column">
                <h4 className="text-dark">Visi</h4>
                <p className="text-dark">{dataOrganization.visi !== null ? dataOrganization.visi : "Tidak ada visi"}</p>
              </div>
              <div className="d-flex align-items-center flex-column">
                <h4 className="text-dark">Misi</h4>
                <p className="text-dark">{dataOrganization.misi !== null ? dataOrganization.misi : "Tidak ada misi"}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              {/* <button type="button" className="btn btn-primary">
                Understood
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}
