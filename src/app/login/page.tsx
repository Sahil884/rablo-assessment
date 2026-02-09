"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveUserID, saveAccCreated } from "../../utils/storage";
import { getBasicProfile } from "../../api/profile";
import { useAuth } from "../../context/AuthContext";
import LoginButtons from "@/src/components/LoginButtons";
import GetStartedButton from "@/src/components/GetStartedButton";

export default function LoginPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const MANAGER_ID = process.env.NEXT_PUBLIC_MANAGER_ID;

  const [toLogin, setToLogin] = useState(false);

  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const { setUserID, setAccCreated } = useAuth();

  // Handle redirect from backend with ?userID=...

  // useEffect(() => {
  //   const userID = searchParams.get("userID");
  //   if (userID) {
  //     // Save to localStorage
  //     localStorage.setItem("userID", userID);
  //     // Save to context
  //     setUserID(userID);

  //     getBasicProfile(userID)
  //       .then((profile) => {
  //         if (profile.accCreated === 1) {
  //           localStorage.setItem("accCreated", "1");
  //           setAccCreated(1);
  //           router.push("/dashboard");
  //         } else {
  //           localStorage.setItem("accCreated", "0");
  //           setAccCreated(0);
  //           router.push("/manager");
  //         }
  //       })
  //       .catch(() => {
  //         router.push("/login");
  //       });
  //   }
  // }, [searchParams, router, setUserID, setAccCreated]);

  const handleHomeButton = () => {
    setToLogin(true);
  };

  const handleGoogleLogin = () => {
    // window.location.href = `${BASE_URL}/auth/google/manager`
    window.location.href = `/manager?userID=${MANAGER_ID}`;
  };

  return (
    <main
      className="relative flex h-screen flex-col justify-end bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/fitness-smile.png')" }}
    >
      {toLogin ? (
        <LoginButtons onGoogleLogin={handleGoogleLogin} />
      ) : (
        <GetStartedButton onClick={handleHomeButton} />
      )}
    </main>
  );
}
