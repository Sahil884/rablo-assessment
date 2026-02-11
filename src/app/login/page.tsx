"use client";

import { useState } from "react";

import LoginButtons from "@/src/components/LoginButtons";
import GetStartedButton from "@/src/components/GetStartedButton";
import { googleLoginRedirect } from "../../api/auth";

export default function LoginPage() {
  const [toLogin, setToLogin] = useState(false);

  const handleHomeButton = () => {
    setToLogin(true);
  };

  return (
    <main
      className="relative flex h-screen flex-col justify-end bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/fitness-smile.png')" }}
    >
      {toLogin ? (
        <LoginButtons onGoogleLogin={googleLoginRedirect} />
      ) : (
        <GetStartedButton onClick={handleHomeButton} />
      )}
    </main>
  );
}
