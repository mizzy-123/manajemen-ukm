import { format } from "date-fns";
import useSWR from "swr";

export default function TableResult({ token, organizationId }) {
  const allRapatProker = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());

  const { data: dataProker, isLoading: loadingProker } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/all-rapat-proker?organization_id=${organizationId}`, allRapatProker, {
    refreshInterval: 1000,
  });
  return (
    <>
      {loadingProker ? (
        <tr className="tb-odr-item">
          <td className="tb-odr-info">
            <span className="tb-odr-id">
              <a href="#">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </a>
            </span>
            <span className="tb-odr-date">
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </span>
          </td>
          <td className="tb-odr-info">
            <span className="tb-odr-id">
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
            </span>
          </td>

          <td className="tb-odr-amount">
            <span className="tb-odr-total">
              <span className="amount">
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
              </span>
            </span>
          </td>
          <td className="tb-odr-action">
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
          </td>
        </tr>
      ) : (
        dataProker.data.map((value, i) => (
          <tr className="tb-odr-item" key={i}>
            <td className="tb-odr-info">
              <span className="tb-odr-id">
                <a href="#">{i + 1}</a>
              </span>
              <span className="tb-odr-date">{value.name}</span>
            </td>
            <td className="tb-odr-info">
              <span className="tb-odr-id">{value.lokasi}</span>
            </td>

            <td className="tb-odr-amount">
              <span className="tb-odr-total">
                <span className="amount">
                  {(() => {
                    const parsedDate = new Date(value.waktu);

                    // Format tanggal sesuai dengan keinginan Anda
                    const formattedDate = format(parsedDate, "dd MMM yyyy, hh:mm a");
                    return formattedDate;
                  })()}
                </span>
              </span>
            </td>
            <td className="tb-odr-action"></td>
          </tr>
        ))
      )}
    </>
  );
}
