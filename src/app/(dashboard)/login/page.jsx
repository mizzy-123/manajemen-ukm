// import LoginForm from "@/components/client/login";
import ActionLogin from "./actionLogin";

export default function Login() {
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
                <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
                  <div className="absolute-top-right d-lg-none p-3 p-sm-5">
                    <a href="#" className="toggle btn-white btn btn-icon btn-light" data-target="athPromo">
                      <em className="icon ni ni-info"></em>
                    </a>
                  </div>
                  <div className="nk-block nk-block-middle nk-auth-body">
                    <div className="brand-logo pb-5">
                      <a href="html/index.html" className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                        <img className="logo-dark logo-img logo-img-lg" src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                      </a>
                    </div>
                    <div className="nk-block-head">
                      <div className="nk-block-head-content">
                        <h5 className="nk-block-title">Sign-In</h5>
                        <div className="nk-block-des">
                          <p>ganti ini</p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- .nk-block-head --> */}
                    <ActionLogin />
                    {/* <!-- form --> */}
                    <div className="form-note-s2 pt-4">
                      New on our platform? <a href="html/pages/auths/auth-register.html">Create an account</a>
                    </div>
                    <div className="text-center pt-4 pb-3">
                      <h6 className="overline-title overline-title-sap">
                        <span>OR</span>
                      </h6>
                    </div>
                    <ul className="nav justify-center gx-4">
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Facebook
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Google
                        </a>
                      </li>
                    </ul>
                    <div className="text-center mt-5">
                      <span className="fw-500">
                        I dont have an account? <a href="#">Try 15 days free</a>
                      </span>
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
                            <img className="round" src="./images/slides/promo-a.png" srcSet="./images/slides/promo-a2x.png 2x" alt="" />
                          </div>
                          <div className="nk-feature-content py-4 p-sm-5">
                            <h4>Dashlite</h4>
                            <p>You can start to create your products easily with its user-friendly design & most completed responsive layout.</p>
                          </div>
                        </div>
                      </div>
                      {/* <!-- .slider-item --> */}
                      <div className="slider-item">
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
                      {/* <!-- .slider-item --> */}
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
                      </div>
                      {/* <!-- .slider-item --> */}
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
