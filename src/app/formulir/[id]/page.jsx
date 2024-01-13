import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style.css";
import ActionForm from "./actionForm";

export default async function Formulir({ params }) {
  const getFormulir = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-formulir/${params.id}`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-cache",
  });
  const dataFormulir = await getFormulir.json();
  return (
    <main>
      {/* <!--NAVBAR--> */}
      <nav className="p-nav bg-navbar navbar navbar-expand-lg bg-body-tertiary pe-4 sticky-top">
        <div className="container-fluid">
          <img className="navbar-brand" src="/Asset/Unitease.png" alt="" width="200" />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 gap-4 pe-4">
              <li className="nav-item">
                <a className="nav-link fw-bold" href="#home">
                  HOME
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold" href="#about">
                  ABOUT
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold" href="#ukm">
                  UKM
                </a>
              </li>
              <li className="nav-item d-flex align-items-center">
                <a className="fw-bold btn btn-primary btn-login" href="/login">
                  LOGIN
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <!--NAVBAR END--> */}

      {/* <!--CONTAINER--> */}

      <ActionForm formulir={dataFormulir} />

      {/* <!--CONTAINER END--> */}

      {/* <!-- FOOTER --> */}
      <footer>
        <p>Copyright &copy; 2023 Unitease</p>
      </footer>

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></Script>
      {/* <!--FOOTER END--> */}
    </main>
  );
}
