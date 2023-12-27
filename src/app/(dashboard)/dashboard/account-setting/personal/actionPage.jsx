"use client";

import { createContext } from "react";
import ActionContent from "./actionContent";
import ActionModal from "./actionModal";

export const AppContext = createContext(null);
export default function ActionPage({ token, roleid }) {
  return (
    <AppContext.Provider
      value={{
        token,
        roleid,
      }}
    >
      <ActionContent />
      <ActionModal />
    </AppContext.Provider>
  );
}
