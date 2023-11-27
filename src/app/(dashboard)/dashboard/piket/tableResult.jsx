import useSWR from "swr";
export default function TableResult({ token, organizationId }) {
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jadwal-piket?organization_id=${organizationId}`, fetcher, {
    refreshInterval: 1000,
  });
  return (
    <div className="card-inner">
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <ul className="preview-list g-1">
            <li className="preview-item">
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </li>
            <li className="preview-item">
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </li>
            <li className="preview-item">
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </li>
            <li className="preview-item">
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </li>
            <li className="preview-item">
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </li>
            <li className="preview-item">
              <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </li>
            <li className="preview-item">
              <div className="spinner-grow text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </li>
            <li className="preview-item">
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </li>
          </ul>
        </div>
      ) : (
        data.data.map((value, i) => (
          <table key={i} className="table table-striped">
            <thead className="bg-dark text-white">
              <tr>
                <th scope="col" colSpan={5} className="">
                  {value.nama_hari}
                </th>
              </tr>
            </thead>
            <tbody>
              {value.user_piket.map((data, x) => (
                <tr key={x}>
                  <th scope="row">{x + 1}</th>
                  <td>{data.user.name} </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))
      )}
    </div>
  );
}
