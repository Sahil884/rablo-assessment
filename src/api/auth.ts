export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const MANAGER_ID = process.env.NEXT_PUBLIC_MANAGER_ID;

import { getBasicProfile } from "../api/profile";

// Google login redirect (frontend just navigates to backend auth URL)
export async function googleLoginRedirect(managerId: string) {
  localStorage.setItem("userID", managerId);

  try {
    const profile = await getBasicProfile(managerId);
    console.log("Profile response:", profile);

    if (profile.data.accCreated === 1) {
      localStorage.setItem("accCreated", "1");
      window.location.href = "/dashboard";
    } else {
      localStorage.setItem("accCreated", "0");
      window.location.href = `/manager?userID=${managerId}`;
    }
  } catch (err) {
    console.error("Failed to fetch basic profile", err);
    window.location.href = `/manager?userID=${managerId}`;
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
