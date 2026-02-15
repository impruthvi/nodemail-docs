"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

interface PackageManagerContextValue {
  manager: PackageManager;
  setManager: (pm: PackageManager) => void;
}

const PackageManagerContext = createContext<PackageManagerContextValue | null>(
  null
);

const STORAGE_KEY = "preferred-pm";

export function PackageManagerProvider({ children }: { children: ReactNode }) {
  const [manager, setManagerState] = useState<PackageManager>("npm");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (
      stored === "npm" ||
      stored === "yarn" ||
      stored === "pnpm" ||
      stored === "bun"
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Hydration: sync localStorage preference on mount
      setManagerState(stored);
    }
  }, []);

  const setManager = (pm: PackageManager) => {
    setManagerState(pm);
    localStorage.setItem(STORAGE_KEY, pm);
  };

  return (
    <PackageManagerContext value={{ manager, setManager }}>
      {children}
    </PackageManagerContext>
  );
}

export function usePackageManager() {
  const ctx = useContext(PackageManagerContext);
  if (!ctx) {
    throw new Error(
      "usePackageManager must be used within a PackageManagerProvider"
    );
  }
  return ctx;
}
