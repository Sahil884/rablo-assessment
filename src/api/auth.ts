export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const MANAGER_ID = process.env.NEXT_PUBLIC_MANAGER_ID;

import { getBasicProfile } from "../api/profile";

// Google login redirect (frontend just navigates to backend auth URL)
// export async function googleLoginRedirect(managerId: string) {
//   // Always persist userID first
//   localStorage.setItem("userID", managerId);

//   try {
//     // 1. Try hitting the original Google Auth endpoint
//     const res = await fetch(`${BASE_URL}/auth/google/manager`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!res.ok) {
//       throw new Error("Google Auth failed");
//     }

//     // If backend redirects with profile data, continue
//     const profile = await getBasicProfile(managerId);
//     console.log("Profile response:", profile);

//     if (profile?.data?.accCreated === 1) {
//       localStorage.setItem("accCreated", "1");
//       window.location.href = "/dashboard";
//     } else {
//       localStorage.setItem("accCreated", "0");
//       // window.location.href = `/manager?userID=${managerId}`;

//     }
//   } catch (err) {
//     console.error("Google login failed, falling back:", err);

//     // 2. Fallback: use manual userID flow
//     try {
//       const profile = await getBasicProfile(managerId);
//       if (profile?.data?.accCreated === 1) {
//         localStorage.setItem("accCreated", "1");
//         window.location.href = "/dashboard";
//       } else {
//         localStorage.setItem("accCreated", "0");
//         window.location.href = `/manager?userID=${managerId}`;
//       }
//     } catch (fallbackErr) {
//       console.error("Fallback also failed:", fallbackErr);
//       // As a last resort, send user to manager profile creation
//       window.location.href = `/manager?userID=${managerId}`;
//     }
//   }
// }

export async function googleLoginRedirect() {
  // If we already have a userID in the URL, we are in step 2
  const params = new URLSearchParams(window.location.search);
  const userID = params.get("userID");

  if (!userID) {
    // step 1: send user to backend Google Auth
    window.location.href = `${BASE_URL}/auth/google/manager`;
    console.log("Google auth hit");
    return;
  }

  try {
    // step 2: handle redirect back with userID
    localStorage.setItem("userID", userID);

    const profile = await getBasicProfile(userID);
    console.log("Profile response:", profile);

    if (profile?.data?.accCreated === 1) {
      localStorage.setItem("accCreated", "1");
      window.location.href = "/dashboard";
    } else {
      localStorage.setItem("accCreated", "0");
      window.location.href = `/manager?userID=${userID}`;
    }
  } catch (err) {
    console.error("Google login failed:", err);
    alert("Google login failed. Please try again later.");
    localStorage.removeItem("userID");
    localStorage.removeItem("accCreated");
    window.location.href = "/login";
  }
}

// Logout helper — clears localStorage and returns to login
// src/api/auth.ts
export function logout(
  setUserID: (id: string | null) => void,
  setAccCreated: (val: number) => void,
) {
  // ✅ Clear everything from localStorage
  localStorage.clear();

  // Reset React state
  setUserID(null);
  setAccCreated(0);

  // Redirect to login
  window.location.href = "/login";
}
