"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBasicProfile } from "@/src/api/profile";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const userID = params.get("userID");

    // If backend just redirected with token + userID
    if (token && userID) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userID", userID);

      (async () => {
        try {
          const res = await getBasicProfile(userID);
          console.log("Profile response:", res);

          if (res?.data?.accCreated === 1) {
            localStorage.setItem("accCreated", "1");
            router.replace("/dashboard");
          } else {
            localStorage.setItem("accCreated", "0");
            router.replace(`/manager?userID=${userID}`);
          }
        } catch (err: any) {
          console.error("Profile fetch failed:", err);

          // Only clear storage if explicitly unauthorized
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            localStorage.clear();
            router.replace("/login");
          } else {
            // Keep token + userID, let user continue to manager form
            router.replace(`/manager?userID=${userID}`);
          }
        }
      })();

      return; // stop here — don’t run fallback logic yet
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
          const res = await getBasicProfile(persistedUserID!);
          console.log("Profile response:", res);

          if (res?.data?.accCreated === 1) {
            localStorage.setItem("accCreated", "1");
            router.replace("/dashboard");
          } else {
            localStorage.setItem("accCreated", "0");
            router.replace(`/manager?userID=${persistedUserID}`);
          }
        } catch (err: any) {
          console.error("Profile fetch failed:", err);

          if (err?.response?.status === 401 || err?.response?.status === 403) {
            localStorage.clear();
            router.replace("/login");
          } else {
            router.replace(`/manager?userID=${persistedUserID}`);
          }
        }
      })();
    }
  }, [router]);

  return (
    // <main className="flex h-screen items-center justify-center bg-gray-900 text-white">
    //   <h1 className="text-3xl font-bold">Loading...</h1>
    // </main>
    <></>
  );
}
