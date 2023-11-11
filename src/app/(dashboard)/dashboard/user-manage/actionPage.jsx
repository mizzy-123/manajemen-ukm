"use client";

import { createContext, useState } from "react";
import ActionContent from "./actionContent";
import ActionModal from "./actionModal";

export const AppContext = createContext(null);

export default function ActionPage({ token, roleid }) {
  const [idUkm, setIdUkm] = useState(0);
  const [namaUkm, setNamaUkm] = useState("");
  const [namaMahasiswa, setNamaMahasiswa] = useState("");
  const [idMahasiswa, setIdMahahasiswa] = useState(0);
  const [dataMahasiswa, setDataMahasiswa] = useState({});

  return (
    <AppContext.Provider
      value={{
        token,
        roleid,
        idUkm,
        setIdUkm,
        namaUkm,
        setNamaUkm,
        namaMahasiswa,
        setNamaMahasiswa,
        idMahasiswa,
        setIdMahahasiswa,
        dataMahasiswa,
        setDataMahasiswa,
      }}
    >
      <ActionContent />
      <ActionModal />
    </AppContext.Provider>
  );
}
