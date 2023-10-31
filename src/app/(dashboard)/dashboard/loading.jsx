export default function LoadingHomeDashboard() {
  return (
    <>
      <div className="nk-content ">
        <div className="container-fluid">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
