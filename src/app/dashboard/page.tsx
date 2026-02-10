"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { logout } from "../../api/auth";

export default function DashboardPage() {
  const { userID, accCreated, setUserID, setAccCreated } = useAuth();
  const router = useRouter();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>UserID: {userID}</p>
      <p>accCreated: {accCreated}</p>
      <button
        onClick={() => logout(setUserID, setAccCreated)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </main>
  );
}
