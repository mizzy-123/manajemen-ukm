"use client";

import { createContext, useState } from "react";
import ActionContent from "./actionContent";
import ActionModal from "./actionModal";

export const AppContext = createContext(null);

export default function ActionPage({ token, roleid }) {
  const [dataOrganisasi, setDataOrganisasi] = useState({
    id: 0,
    name: "",
  });
  const [dataProker, setDataProker] = useState({
    id: 0,
    name: "",
    lokasi: "",
    date: "",
    time: "",
  });
  return (
    <AppContext.Provider value={{ token, roleid, dataOrganisasi, setDataOrganisasi, dataProker, setDataProker }}>
      <ActionContent />
      <ActionModal />
    </AppContext.Provider>
  );
}
