"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    // Read persisted values
    const userID = localStorage.getItem("userID");
    const accCreated = localStorage.getItem("accCreated");
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      // No token → must login
      router.replace("/login");
    } else if (!userID) {
      // Token exists but no userID → fallback to login
      router.replace("/login");
    } else if (accCreated === "0" || accCreated === null) {
      // Profile incomplete
      router.replace(`/manager?userID=${userID}`);
    } else if (accCreated === "1") {
      // Profile complete
      router.replace("/dashboard");
    } else {
      // Fallback
      router.replace("/login");
    }
  }, [router]);

  return (
    // <main className="flex h-screen items-center justify-center bg-gray-900 text-white">
    //   <h1 className="text-3xl font-bold">Loading...</h1>
    // </main>
    <></>
  );
}
