"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    // Read persisted values
    const userID = localStorage.getItem("userID");
    const accCreated = localStorage.getItem("accCreated");
    console.log("Splash values:", { userID, accCreated });

    if (!userID) {
      router.replace("/login");
    } else if (accCreated === "0" || accCreated === null) {
      router.replace(`/manager?userID=${userID}`); // profile creation
    } else if (accCreated === "1") {
      router.replace("/dashboard");
    } else {
      // fallback → login
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
