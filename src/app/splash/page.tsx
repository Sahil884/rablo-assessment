"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getBasicProfile } from "@/src/api/profile";

export default function SplashPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userID = searchParams.get("userID");

    // If backend just redirected with token + userID
    if (token && userID) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userID", userID);

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
          console.error("Profile fetch failed:", err);
          localStorage.clear();
          router.replace("/login");
        }
      })();
      return;
    }

    // Otherwise, fall back to persisted values
    const persistedToken = localStorage.getItem("authToken");
    const persistedUserID = localStorage.getItem("userID");
    const accCreated = localStorage.getItem("accCreated");

    if (!persistedToken || !persistedUserID) {
      router.replace("/login");
    } else if (accCreated === "1") {
      router.replace("/dashboard");
    } else if (accCreated === "0") {
      router.replace(`/manager?userID=${persistedUserID}`);
    } else {
      // If accCreated missing, fetch profile once
      (async () => {
        try {
          const res = await getBasicProfile(persistedUserID);
          if (res?.data?.accCreated === 1) {
            localStorage.setItem("accCreated", "1");
            router.replace("/dashboard");
          } else {
            localStorage.setItem("accCreated", "0");
            router.replace(`/manager?userID=${persistedUserID}`);
          }
        } catch {
          localStorage.clear();
          router.replace("/login");
        }
      })();
    }
  }, [router, searchParams]);

  return (
    // <main className="flex h-screen items-center justify-center bg-gray-900 text-white">
    //   <h1 className="text-3xl font-bold">Loading...</h1>
    // </main>
    <></>
  );
}
