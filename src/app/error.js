"use client";

import { useRouter } from "next/navigation";

export default function GlobalError({ error, reset }) {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.back();
  };
  return (
    <html>
      <body className="nk-body bg-white npc-default pg-error">
        <div className="nk-app-root">
          <div className="nk-main ">
            <div className="nk-wrap nk-wrap-nosidebar">
              <div className="nk-content ">
                <div className="nk-block nk-block-middle wide-xs mx-auto">
                  <div className="nk-block-content nk-error-ld text-center">
                    <h1 className="nk-error-head">Error</h1>
                    <h3 className="nk-error-title">Oops! Something Wrong</h3>
                    <p className="nk-error-text">We are very sorry for inconvenience. Something wrong about it</p>
                    <a href="html/index.html" className="btn btn-lg btn-primary mt-2" onClick={(e) => handleClick(e)}>
                      Back
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
