import Link from "next/link";
import ActionReset from "./actionReset";

export default function ResetPassword() {
  return (
    <main className="nk-body bg-white npc-default pg-auth">
      <div className="nk-app-root">
        {/* <!-- main @s --> */}
        <div className="nk-main">
          {/* <!-- wrap @s --> */}
          <div className="nk-wrap nk-wrap-nosidebar">
            {/* <!-- content @s --> */}
            <div className="nk-content">
              <div className="nk-split nk-split-page nk-split-md">
                <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white w-lg-45">
                  <div className="absolute-top-right d-lg-none p-3 p-sm-5">
                    <a href="#" className="toggle btn btn-white btn-icon btn-light" data-target="athPromo">
                      <em className="icon ni ni-info"></em>
                    </a>
                  </div>
                  <div className="nk-block nk-block-middle nk-auth-body">
                    <div className="brand-logo pb-5">
                      <a href="/reset-password" className="logo-link">
                        <img src="./images/logo.png" alt="logo" />
                        {/* <img className="logo-light logo-img logo-img-lg" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                        <img className="logo-dark logo-img logo-img-lg" src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" /> */}
                      </a>
                    </div>
                    <div className="nk-block-head">
                      <div className="nk-block-head-content">
                        <h5 className="nk-block-title">Reset password</h5>
                        <div className="nk-block-des">
                          <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
                        </div>
                      </div>
                    </div>
                    <ActionReset />
                    <div className="form-note-s2 pt-5">
                      <Link href="/login">
                        <strong>Return to login</strong>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <!-- .nk-split-content --> */}
                <div className="nk-split-content nk-split-stretch bg-lighter d-flex toggle-break-lg toggle-slide toggle-slide-right" data-toggle-body="true" data-content="athPromo" data-toggle-screen="lg" data-toggle-overlay="true">
                  <div className="slider-wrap w-100 w-max-550px p-3 p-sm-5 m-auto">
                    <div className="slider-init" data-slick='{"dots":true, "arrows":false}'>
                      <div className="slider-item">
                        <div className="nk-feature nk-feature-center">
                          <div className="nk-feature-img">
                            <img className="round" src="./images/logo.png" srcSet="./images/logo.png" alt="" />
                          </div>
                          <div className="nk-feature-content py-4 p-sm-5">
                            <h4>Unit Ease</h4>
                            <p>You can start to create, read, update, delete and manage your organizations easily with its user-friendly design & most completed responsive layout.</p>
                          </div>
                        </div>
                      </div>

                      {/* <div className="slider-item">
                        <div className="nk-feature nk-feature-center">
                          <div className="nk-feature-img">
                            <img className="round" src="./images/slides/promo-b.png" srcSet="./images/slides/promo-b2x.png 2x" alt="" />
                          </div>
                          <div className="nk-feature-content py-4 p-sm-5">
                            <h4>Dashlite</h4>
                            <p>You can start to create your products easily with its user-friendly design & most completed responsive layout.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="slider-item">
                        <div className="nk-feature nk-feature-center">
                          <div className="nk-feature-img">
                            <img className="round" src="./images/slides/promo-c.png" srcSet="./images/slides/promo-c2x.png 2x" alt="" />
                          </div>
                          <div className="nk-feature-content py-4 p-sm-5">
                            <h4>Dashlite</h4>
                            <p>You can start to create your products easily with its user-friendly design & most completed responsive layout.</p>
                          </div>
                        </div>
                      </div> */}
                    </div>
                    {/* <!-- .slider-init --> */}
                    <div className="slider-dots"></div>
                    <div className="slider-arrows"></div>
                  </div>
                  {/* <!-- .slider-wrap --> */}
                </div>
                {/* <!-- .nk-split-content --> */}
              </div>
              {/* <!-- .nk-split --> */}
            </div>
            {/* <!-- wrap @e --> */}
          </div>
          {/* <!-- content @e --> */}
        </div>
        {/* <!-- main @e --> */}
      </div>
    </main>
  );
}
