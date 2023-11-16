"use client";

import { createContext, useState } from "react";
import ActionContent from "./actionContent";
import ActionModal from "./actionModal";

export const AppContext = createContext(null);

export default function ActionPage({ token, roleid }) {
  const [organization, setOrganization] = useState({
    id: 0,
    name_organization: "",
  });

  return (
    <AppContext.Provider value={{ token, roleid, organization, setOrganization }}>
      <ActionContent />
      <ActionModal />
    </AppContext.Provider>
  );
}
