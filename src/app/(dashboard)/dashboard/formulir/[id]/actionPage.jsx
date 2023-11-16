"use client";

import { createContext, useState } from "react";
import ActionCalonAnggota from "./actionCalonAnggota";
import ActionModal from "./actionModal";

export const AppContext = createContext(null);

export default function ActionPage({ token, params }) {
  const [dataMahasiswa, setDataMahasiswa] = useState({});
  return (
    <AppContext.Provider value={{ dataMahasiswa, setDataMahasiswa }}>
      <div className="nk-content ">
        <div className="container-fluid">
          <div className="nk-content-inner">
            <ActionCalonAnggota token={token.value} formid={params.id} />
          </div>
        </div>
      </div>
      <ActionModal />
    </AppContext.Provider>
  );
}
