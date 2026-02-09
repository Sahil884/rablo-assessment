// context/AuthContext.tsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userID, setUserID] = useState<string | null>(null);
  const [accCreated, setAccCreated] = useState<number | null>(null);

  useEffect(() => {
    setUserID(localStorage.getItem("userID"));
    setAccCreated(Number(localStorage.getItem("accCreated")));
  }, []);

  return (
    <AuthContext.Provider
      value={{ userID, accCreated, setUserID, setAccCreated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
