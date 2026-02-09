export async function getBasicProfile(userID: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${BASE_URL}/manager/getBasicProfile/${userID}`);
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}
