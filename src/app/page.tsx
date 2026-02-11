"use client";
import { useRouter } from "next/navigation";
import SplashPage from "./splash/page";

export default function HomePage() {
  const router = useRouter();

  return (
    // <main
    //   className="relative flex min-h-screen flex-col justify-end text-white"
    //   style={{
    //     backgroundImage: "url('/fitness-smile.png')",
    //     backgroundSize: "cover", // ensures full coverage
    //     backgroundPosition: "center", // keeps subject centered
    //     backgroundRepeat: "no-repeat", // prevents tiling
    //   }}
    // >
    //   {/* Dark gradient overlay */}
    //   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black via-black/80 to-transparent" />

    //   {/* Content block pinned bottom-left */}
    //   <div className="relative px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 text-left max-w-2xl">
    //     {/* Headline */}
    //     <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 leading-snug">
    //       Manage Your <br />
    //       <span className="text-[#B8FE22]">Fitness Centre</span> <br />
    //       with us!
    //     </h1>

    //     {/* Subtext */}
    //     <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-8 leading-relaxed max-w-lg">
    //       All your business operations in one <br /> place, ready for you to
    //       take charge.
    //     </p>

    //     {/* Divider line */}
    //     <div className="border-t border-white mb-6 w-full"></div>

    //     {/* CTA Button */}
    //     <button
    //       onClick={() => router.push("/login")}
    //       className="bg-[#B8FE22] hover:bg-green-500 text-black font-semibold py-3 px-6 rounded-lg transition w-full sm:w-auto"
    //     >
    //       Get Started
    //     </button>
    //   </div>
    // </main>

    <SplashPage />
  );
}
