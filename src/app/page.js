// import Image from "next/image";
// import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../../public/Asset/bootstrap.min.css";
import "./style.css";
import About from "./about";
import Ukm from "./ukm";
import Script from "next/script";

export default async function Home() {
  const organization = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-all-organization`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-cache",
  });
  const dataOrganization = await organization.json();
  console.log("json", dataOrganization);
  return (
    // <main className={styles.main}>
    //   <div className={styles.description}>
    //     <p>
    //       Get started by editing&nbsp;
    //       <code className={styles.code}>src/app/page.js</code>
    //     </p>
    //     <div>
    //       <a href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
    //         By <Image src="/vercel.svg" alt="Vercel Logo" className={styles.vercelLogo} width={100} height={24} priority />
    //       </a>
    //     </div>
    //   </div>

    //   <div className={styles.center}>
    //     <Image className={styles.logo} src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
    //   </div>

    //   <div className={styles.grid}>
    //     <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
    //       <h2>
    //         Docs <span>-&gt;</span>
    //       </h2>
    //       <p>Find in-depth information about Next.js features and API.</p>
    //     </a>

    //     <a href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
    //       <h2>
    //         Learn <span>-&gt;</span>
    //       </h2>
    //       <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
    //     </a>

    //     <a href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
    //       <h2>
    //         Templates <span>-&gt;</span>
    //       </h2>
    //       <p>Explore the Next.js 13 playground.</p>
    //     </a>

    //     <a href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
    //       <h2>
    //         Deploy <span>-&gt;</span>
    //       </h2>
    //       <p>Instantly deploy your Next.js site to a shareable URL with Vercel.</p>
    //     </a>
    //   </div>
    // </main>
    <main>
      {/* <!--NAVBAR--> */}
      <nav className="p-nav bg-navbar navbar navbar-expand-lg bg-body-tertiary pe-4 sticky-top">
        <div className="container-fluid">
          <img className="navbar-brand" src="Asset/Unitease.png" alt="" width="200" />
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
      {/* <!--Section One--> */}
      <div className="section_one" id="home">
        <div className="container d-flex justify-content-between">
          <div className="welcome fs-1 d-flex flex-column justify-content-center">
            <h1 className="mb-4 welcome-text1">SELAMAT DATANG,</h1>
            <h3 className="welcome-text2">SELAMAT MENJADI BAGIAN DARI</h3>
            <h3 className="welcome-text2">KELUARGA BESAR MAHASISWA POLINES</h3>
            <div>
              <a className="button-polines btn btn-outline-light" href="https://polines.ac.id">
                KUNJUNGI WEB POLINES
              </a>
            </div>
          </div>
          <div className="logo-polines w-50 d-flex justify-content-center align-items-center">
            <img src="Asset/Logo-Polines-96dpi-200px (2).png" width="280" />
          </div>
        </div>
      </div>
      {/* <!--Section One END--> */}

      {/* <!--Section Two--> */}
      <About total={dataOrganization.data.total} />
      {/* <!--Section Two END--> */}

      {/* <!--Section Three--> */}
      <Ukm organization={dataOrganization.data.organization} />
      {/* <!--Section Three END--> */}
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
