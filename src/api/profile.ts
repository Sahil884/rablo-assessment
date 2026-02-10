export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// GET basic profile
export async function getBasicProfile(managerID: string) {
  const res = await fetch(`${BASE_URL}/manager/getBasicProfile/${managerID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch basic profile");
  }

  return res.json(); // should contain accCreated etc.
}

// PATCH create/update manager profile
export async function createManagerProfile(managerID: string, payload: any) {
  const res = await fetch(
    `${BASE_URL}/manager/createManagerProfile/${managerID}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    throw new Error("Profile creation failed");
  }

  return res.json();
}
