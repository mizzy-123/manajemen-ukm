"use client";

import { createContext } from "react";
import ActionContent from "./actionContent";

export const AppContext = createContext(null);

export default function ActionPage({ token, roleid }) {
  return (
    <AppContext.Provider value={{ token, roleid }}>
      <ActionContent />
    </AppContext.Provider>
  );
}
