"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveUserID, saveAccCreated } from "../../utils/storage";
import { getBasicProfile } from "../../api/profile";

export default function LoginPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle redirect from backend with ?userID=...
  useEffect(() => {
    const userID = searchParams.get("userID");
    if (userID) {
      saveUserID(userID);

      // Fetch profile to determine accCreated
      getBasicProfile(userID)
        .then((profile) => {
          if (profile.accCreated === 1) {
            saveAccCreated(1);
            router.push("/dashboard");
          } else {
            saveAccCreated(0);
            router.push("/create-profile");
          }
        })
        .catch(() => {
          // fallback → force login again
          router.push("/login");
        });
    }
  }, [searchParams, router]);

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google/manager`;
  };

  return (
    <main
      className="relative flex h-screen flex-col justify-end bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/fitness-smile.png')" }}
    >
      {/* Translucent blurred bottom panel */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] rounded-b-2xl m-3 bg-[#55A6C4]/30 backdrop-blur-xl" />

      {/* Content block pinned bottom-left */}
      <div className="relative px-6 pb-12 text-left max-w-md">
        {/* Greeting */}
        <h1 className="text-5xl sm:text-4xl font-bold mb-2 text-center">
          Hi there!
        </h1>
        <p className="text-white text-base sm:text-lg mb-8 text-center">
          Sign in to keep things running smoothly.
        </p>

        {/* Divider line */}
        <div className="border-t border-gray-600 mb-6"></div>

        {/* Social login buttons */}
        <div className="flex flex-col gap-4">
          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-[#2F5B6C] border-2 border-solid border-[#2F5B6C] text-white font-semibold py-3 px-6 rounded-lg transition hover:bg-gray-200"
          >
            <img src="/icons/google.svg" alt="Google" className="h-5 w-5" />
            Continue with Google
          </button>

          {/* LinkedIn */}
          <button className="flex items-center justify-center gap-2 bg-[#2F5B6C] border-2 border-solid border-[#2F5B6C] text-white font-semibold py-3 px-6 rounded-lg transition hover:bg-[#004182]">
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
            Continue with LinkedIn
          </button>

          {/* Facebook */}
          <button className="flex items-center justify-center gap-2 bg-[#2F5B6C] border-2 border-solid border-[#2F5B6C] text-white font-semibold py-3 px-6 rounded-lg transition hover:bg-[#0d5bcf]">
            <img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5" />
            Continue with Facebook
          </button>
        </div>
      </div>
    </main>
  );
}
