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
      <div className="modal fade" role="dialog" id="profile-edit">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <a href="#" className="close" data-bs-dismiss="modal">
              <em className="icon ni ni-cross-sm"></em>
            </a>
            <div className="modal-body modal-body-lg">
              <h5 className="title">Update Profile</h5>
              <ul className="nk-nav nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" data-bs-toggle="tab" href="#personal">
                    Personal
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#address">
                    Address
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="personal">
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" for="full-name">
                          Full Name
                        </label>
                        <input type="text" className="form-control form-control-lg" id="full-name" value="Abu Bin Ishtiyak" placeholder="Enter Full name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" for="display-name">
                          Display Name
                        </label>
                        <input type="text" className="form-control form-control-lg" id="display-name" value="Ishtiyak" placeholder="Enter display name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" for="phone-no">
                          Phone Number
                        </label>
                        <input type="text" className="form-control form-control-lg" id="phone-no" value="+880" placeholder="Phone Number" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" for="birth-day">
                          Date of Birth
                        </label>
                        <input type="text" className="form-control form-control-lg date-picker" id="birth-day" placeholder="Enter your birth date" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="latest-sale" />
                        <label className="custom-control-label" for="latest-sale">
                          Use full name to display{" "}
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li>
                          <a href="#" data-bs-dismiss="modal" className="btn btn-lg btn-primary">
                            Update Profile
                          </a>
                        </li>
                        <li>
                          <a href="#" data-bs-dismiss="modal" className="link link-light">
                            Cancel
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="address">
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" for="address-l1">
                          Address Line 1
                        </label>
                        <input type="text" className="form-control form-control-lg" id="address-l1" value="2337 Kildeer Drive" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" for="address-l2">
                          Address Line 2
                        </label>
                        <input type="text" className="form-control form-control-lg" id="address-l2" value="" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" for="address-st">
                          State
                        </label>
                        <input type="text" className="form-control form-control-lg" id="address-st" value="Kentucky" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" for="address-county">
                          Country
                        </label>
                        <select className="form-select js-select2" id="address-county" data-ui="lg">
                          <option>Canada</option>
                          <option>United State</option>
                          <option>United Kindom</option>
                          <option>Australia</option>
                          <option>India</option>
                          <option>Bangladesh</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li>
                          <a href="#" className="btn btn-lg btn-primary">
                            Update Address
                          </a>
                        </li>
                        <li>
                          <a href="#" data-bs-dismiss="modal" className="link link-light">
                            Cancel
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
