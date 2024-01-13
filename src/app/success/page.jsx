// import Image from "next/image";
// import styles from "./page.module.css";
"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import Script from "next/script";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();
  return (
    <main>
      {/* <!--CONTAINER--> */}
      <div className="container py-2 d-flex justify-content-center align-items-center m-success">
        {/* <!--Section Two--> */}
        <div className="con-s">
          <div className="s-title">
            <p className="text-dark fw-bold">Jawaban Anda Berhasil Dikirim</p>
          </div>
          <div className="s-content">
            <p className="text-content">Terima kasih atas jawaban Anda. Silahkan tunggu informasi lebih lanjut.</p>
          </div>
          <div className="s-button d-flex justify-content-end">
            <button onClick={() => router.push("/")} className="button-form">
              Home
            </button>
          </div>
        </div>
        {/* <!--Section Two END--> */}
      </div>
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
