import { useContext, useRef, useState } from "react";
import { AppContext } from "./actionPage";
import PostChangePassword from "@/api/postChangePassword";

export default function ActionModal() {
  const { token, roleid } = useContext(AppContext);
  const refSubmit = useRef(null);
  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [messageInvalid, setMessageInvalid] = useState({});
  return (
    <>
      <div className="modal fade" id="modalForm">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {alert ? (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            ) : (
              ""
            )}

            {alertSuccess ? (
              <div className="alert alert-success" role="alert">
                {message}
              </div>
            ) : (
              ""
            )}
            <div className="modal-header">
              <h5 className="modal-title">Ganti password</h5>
              <a href="#" className="close" data-bs-dismiss="modal" aria-label="Close" ref={refSubmit}>
                <em className="icon ni ni-cross"></em>
              </a>
            </div>
            <div className="modal-body">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  setInvalid(false);
                  const formData = new FormData(e.currentTarget);
                  const password = formData.get("password");
                  const password_confirm = formData.get("password_confirmation");

                  try {
                    const response = await PostChangePassword({ token: token, password: password, password_confirmation: password_confirm });
                    if (response.status == 200) {
                      setMessage(response.data.message);
                      setAlertSuccess(true);
                      setAlert(false);
                      setLoading(false);
                      setTimeout(() => {
                        setAlertSuccess(false);
                        setAlert(false);
                        refSubmit.current.click();
                      }, 2000);
                    }
                  } catch (error) {
                    if (error.response.status == 500) {
                      setMessage(error.response.data.message);
                      setAlert(true);
                      setAlertSuccess(false);
                      setLoading(false);
                    } else if (error.response.status == 400) {
                      setMessageInvalid(error.response.data.message);
                      setInvalid(true);
                      setLoading(false);
                    } else {
                      setMessage(error.response.data.message);
                      setAlert(true);
                      setAlertSuccess(false);
                      setLoading(false);
                    }
                    console.log(error.response.data.message);
                  }
                }}
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Masukkan password baru
                  </label>
                  <div className="form-control-wrap">
                    <input type="password" name="password" className={`form-control ${invalid && messageInvalid?.password?.[0] ? "is-invalid" : ""}`} id="password" required />
                    {invalid && <div className="invalid-feedback">{messageInvalid?.password?.[0] !== undefined ? messageInvalid.password[0] : ""}</div>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="confirm_password">
                    Konfirmasi password baru
                  </label>
                  <div className="form-control-wrap">
                    <input type="password" name="password_confirmation" className="form-control" id="confirm_password" required />
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-lg btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status">Loading...</span>
                      </>
                    ) : (
                      "Submit"
                    )}
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
  );
}
