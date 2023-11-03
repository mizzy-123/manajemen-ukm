import Link from "next/link";
import useSWR from "swr";

export default function TableResult({ token, id_ukm }) {
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formulir?organization_id=${id_ukm}`, fetcher, {
    refreshInterval: 1000,
  });

  if (!isLoading) {
    console.log("data", data);
  }

  if (isLoading) {
    return (
      <tr className="tb-tnx-item">
        <td className="tb-tnx-id">
          <a href="#">
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
          </a>
        </td>
        <td className="tb-tnx-info">
          <div className="tb-tnx-desc">
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
          </div>
          <div className="tb-tnx-date">
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
          </div>
        </td>
        <td className="tb-tnx-amount is-alt">
          <div className="tb-tnx-total">
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
          </div>
          <div className="tb-tnx-status">
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
          </div>
        </td>
        <td className="tb-tnx-action">
          <div className="dropdown">
            <a className="text-soft dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown">
              <em className="icon ni ni-more-h"></em>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-xs">
              <ul className="link-list-plain">
                <li>
                  <a href="#">View</a>
                </li>
                <li>
                  <a href="#">Edit</a>
                </li>
                <li>
                  <a href="#">Remove</a>
                </li>
              </ul>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  if (data) {
    return (
      <>
        {data.data.map((value, i) => (
          <tr key={i} className="tb-tnx-item">
            <td className="tb-tnx-id">
              <a href="#">
                <span>{i + 1}</span>
              </a>
            </td>
            <td className="tb-tnx-info">
              <div className="tb-tnx-desc">
                <span className="title">Formulir pendaftaran</span>
              </div>
              <div className="tb-tnx-date">
                <span className="date">
                  {(() => {
                    const date = new Date(value.created_at);
                    const tahun = date.getFullYear();
                    const bulan = String(date.getMonth() + 1).padStart(2, "0");
                    const tanggal = String(date.getDate()).padStart(2, "0");
                    return `${tahun}-${bulan}-${tanggal}`;
                  })()}
                </span>
                <span className="date">{value.expired}</span>
              </div>
            </td>
            <td className="tb-tnx-amount is-alt">
              <div className="tb-tnx-total">
                <span className="amount">{value.dataform_count}</span>
              </div>
              <div className="tb-tnx-status">
                <span
                  className={`badge badge-dot ${(() => {
                    if (value.status == 1) {
                      return "bg-success";
                    } else {
                      return "bg-danger";
                    }
                  })()}`}
                >
                  {(() => {
                    if (value.status == 1) {
                      return "Active";
                    } else {
                      return "Inactive";
                    }
                  })()}
                </span>
              </div>
            </td>
            <td className="tb-tnx-action">
              <div className="dropdown">
                <a className="text-soft dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown">
                  <em className="icon ni ni-more-h"></em>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-xs">
                  <ul className="link-list-plain">
                    <li>
                      <Link href={`/dashboard/formulir/${value.id}`}>View</Link>
                    </li>
                    <li>
                      <a href="#">Edit</a>
                    </li>
                    <li>
                      <a href="#">Remove</a>
                    </li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  }
}
