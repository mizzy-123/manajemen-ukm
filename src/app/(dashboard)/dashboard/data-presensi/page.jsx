export default function DataPresensi() {
  return (
    <div className="nk-content">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block nk-block-lg">
              <div className="nk-block-head">
                <div className="nk-block-head-content">
                  <h4 className="nk-block-title">Data presensi</h4>
                  {/* <p>
                    Add the <code>.is-compact</code> class with <code>.table-tranx</code> class to make compact version of table.
                  </p> */}
                </div>
              </div>
              <div className="card card-preview">
                <table className="table table-tranx is-compact">
                  <thead>
                    <tr className="tb-tnx-head">
                      <th className="tb-tnx-id">
                        <span className="">#</span>
                      </th>
                      <th className="tb-tnx-info">
                        <span className="tb-tnx-desc d-none d-sm-inline-block">
                          <span>Name</span>
                        </span>
                        {/* <span className="tb-tnx-date d-md-inline-block d-none">
                          <span className="d-md-none">Date</span>
                          <span className="d-none d-md-block">
                            <span>Issue Date</span>
                            <span>Due Date</span>
                          </span>
                        </span> */}
                      </th>
                      <th className="tb-tnx-amount">
                        <span className="tb-tnx-total">Date time</span>
                        {/* <span className="tb-tnx-status d-none d-md-inline-block">Status</span> */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="tb-tnx-item">
                      <td className="tb-tnx-id">
                        <a href="#">
                          <span>1</span>
                        </a>
                      </td>
                      <td className="tb-tnx-info">
                        <div className="tb-tnx-desc">
                          <span className="title">Sena jagat</span>
                        </div>
                        {/* <div className="tb-tnx-date">
                          <span className="date">10-05-2019</span>
                          <span className="date">10-13-2019</span>
                        </div> */}
                      </td>
                      <td className="tb-tnx-amount">
                        <div className="tb-tnx-total">
                          <span className="amount">10-05-2019</span>
                        </div>
                        {/* <div className="tb-tnx-status">
                          <span className="badge badge-dot bg-warning">Due</span>
                        </div> */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
