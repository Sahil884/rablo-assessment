import React from "react";
import { MANAGER_ID } from "../api/auth";

interface LoginButtonsProps {
  // onGoogleLogin: (managerId: string) => void;
  onGoogleLogin: () => void;
  onLinkedInLogin?: () => void;
  onFacebookLogin?: () => void;
}

const LoginButtons: React.FC<LoginButtonsProps> = ({
  onGoogleLogin,
  onLinkedInLogin,
  onFacebookLogin,
}) => {
  return (
    <div>
      {/* Translucent blurred bottom panel */}
      <div className="absolute inset-x-0 bottom-2  rounded-2xl m-3 bg-[#55A6C4]/30 backdrop-blur-xl flex flex-col justify-between">
        {/* Content block pinned bottom-left */}
        <div className="relative px-4  text-left  flex flex-col">
          {/* Greeting */}
          <div className="mt-8">
            <h1 className="text-5xl sm:text-4xl font-bold mb-2 text-center">
              Hi there!
            </h1>
            <p className="text-white text-base sm:text-lg mb-2 text-center">
              Sign in to keep things running smoothly.
            </p>
          </div>

          {/* Divider line */}
          <div className="border-t border-gray-600 mb-6"></div>

          {/* Social login buttons */}
          <div className="flex flex-col gap-2 pb-4">
            {/* Google */}
            <button
              onClick={onGoogleLogin}
              className="flex items-center justify-center gap-2 bg-[#2F5B6C] border-2 border-[#2F5B6C] text-white font-semibold py-3 px-6 rounded-lg transition hover:bg-gray-200"
            >
              <img src="/icons/google.svg" alt="Google" className="h-5 w-5" />
              Continue with Google
            </button>

            {/* LinkedIn */}
            <button
              onClick={onLinkedInLogin}
              className="flex items-center justify-center gap-2 bg-[#2F5B6C] border-2 border-[#2F5B6C] text-white font-semibold py-3 px-6 rounded-lg transition hover:bg-[#004182]"
            >
              <img
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                className="h-5 w-5"
              />
              Continue with LinkedIn
            </button>

            {/* Facebook */}
            <button
              onClick={onFacebookLogin}
              className="flex items-center justify-center gap-2 bg-[#2F5B6C] border-2 border-[#2F5B6C] text-white font-semibold py-3 px-6 rounded-lg transition hover:bg-[#0d5bcf]"
            >
              <img
                src="/icons/facebook.svg"
                alt="Facebook"
                className="h-5 w-5"
              />
              Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginButtons;
