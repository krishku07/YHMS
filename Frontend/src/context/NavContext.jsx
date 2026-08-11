import { createContext, useContext, useState } from "react";

const NavContext = createContext(null);

export const DRAWER_WIDTH = 280;
export const DRAWER_COLLAPSED_WIDTH = 80;

export function NavProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapsed = () => setCollapsed((c) => !c);
  const openMobile = () => setMobileOpen(true);
  const closeMobile = () => setMobileOpen(false);

  return (
    <NavContext.Provider
      value={{
        collapsed,
        toggleCollapsed,
        mobileOpen,
        openMobile,
        closeMobile,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return ctx;
}
