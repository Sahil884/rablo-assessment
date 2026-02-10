"use client";

import { useAuth } from "../../context/AuthContext";
import { logout } from "../../api/auth";

export default function DashboardPage() {
  const { userID, accCreated, setUserID, setAccCreated } = useAuth();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-[#B8FE22]">
          Dashboard
        </h1>

        {/* User Info */}
        <div className="space-y-2 text-center">
          <p className="text-lg">
            <span className="font-semibold">User ID:</span> {userID}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Role:</span> Manager
          </p>
          <p className="text-lg">
            <span className="font-semibold">Profile Created:</span>{" "}
            {accCreated === 1 ? "Yes" : "No"}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600"></div>

        {/* Logout Button */}
        <button
          onClick={() => logout(setUserID, setAccCreated)}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
