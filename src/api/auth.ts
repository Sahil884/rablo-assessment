export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const MANAGER_ID = process.env.NEXT_PUBLIC_MANAGER_ID;

// Google login redirect (frontend just navigates to backend auth URL)
export function googleLoginRedirect() {
  //   window.location.href = `${BASE_URL}/auth/google/manager`;
  window.location.href = `/manager?userID=${MANAGER_ID}`;
}

// Logout helper — clears localStorage and returns to login
// src/api/auth.ts
export function logout(
  setUserID: (id: string | null) => void,
  setAccCreated: (val: number) => void,
) {
  localStorage.clear();
  setUserID(null);
  setAccCreated(0);
  window.location.href = "/login"; // ensures full reload
}
