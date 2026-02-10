"use client";

import { useState } from "react";

import LoginButtons from "@/src/components/LoginButtons";
import GetStartedButton from "@/src/components/GetStartedButton";
import { googleLoginRedirect } from "../../api/auth";

export default function LoginPage() {
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
