"use client";

import { createContext } from "react";
import ActionContent from "./actionContent";
import ActionModal from "./actionModal";

export const AppContext = createContext(null);
export default function ActionPage({ token, roleid, profile }) {
  return (
    <AppContext.Provider
      value={{
        token,
        roleid,
        profile,
      }}
    >
      <ActionContent />
      <ActionModal />
    </AppContext.Provider>
  );
}
