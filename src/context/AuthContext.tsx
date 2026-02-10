"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  userID: string | null;
  accCreated: number;
  setUserID: (id: string | null) => void;
  setAccCreated: (val: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userID, setUserID] = useState<string | null>(null);
  const [accCreated, setAccCreated] = useState<number>(0);

  // ✅ Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUserID = localStorage.getItem("userID");
    const storedAccCreated = localStorage.getItem("accCreated");

    if (storedUserID) setUserID(storedUserID);
    if (storedAccCreated === "1") setAccCreated(1);
    else setAccCreated(0);
  }, []);

  return (
    <AuthContext.Provider
      value={{ userID, accCreated, setUserID, setAccCreated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
