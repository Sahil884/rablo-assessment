"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBasicProfile } from "@/src/api/profile";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    const accCreated = localStorage.getItem("accCreated");
    const authToken = localStorage.getItem("authToken");

    // If no token or userID → force login
    if (!authToken || !userID) {
      router.replace("/login");
      return;
    }

    // If accCreated already persisted → route immediately
    if (accCreated === "1") {
      router.replace("/dashboard");
      return;
    }
    if (accCreated === "0") {
      router.replace(`/manager?userID=${userID}`);
      return;
    }

    // Otherwise → fetch profile from backend
    (async () => {
      try {
        const res = await getBasicProfile(userID);
        if (res?.data?.accCreated === 1) {
          localStorage.setItem("accCreated", "1");
          router.replace("/dashboard");
        } else {
          localStorage.setItem("accCreated", "0");
          router.replace(`/manager?userID=${userID}`);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        localStorage.clear();
        router.replace("/login");
      }
    })();
  }, [router]);

  return (
    // <main className="flex h-screen items-center justify-center bg-gray-900 text-white">
    //   <h1 className="text-3xl font-bold">Loading...</h1>
    // </main>
    <></>
  );
}
