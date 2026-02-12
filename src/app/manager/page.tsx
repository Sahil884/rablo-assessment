"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { createManagerProfile } from "../../api/profile";
import SpinnerWithText from "@/src/components/SpinnerWithText";

// ✅ Extract your form into a separate component
function ManagerForm() {
  const { userID, setAccCreated } = useAuth();
  const [Loading, setLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   const id = searchParams.get("userID");
  //   const token = searchParams.get("token");

  //   if (id && token) {
  //     localStorage.setItem("userID", id);
  //     localStorage.setItem("authToken", token);
  //     setUserID(id);

  //     (async () => {
  //       try {
  //         const res = await getBasicProfile(id); // GET /manager/getBasicProfile/{id}
  //         if (res?.data?.accCreated === 1) {
  //           localStorage.setItem("accCreated", "1");
  //           setAccCreated(1);
  //           router.replace("/dashboard");
  //         } else {
  //           localStorage.setItem("accCreated", "0");
  //           setAccCreated(0);
  //           // stay on manager form
  //         }
  //       } catch (err) {
  //         console.error("Failed to fetch profile:", err);
  //         localStorage.clear();
  //         router.replace("/login");
  //       }
  //     })();
  //   }
  // }, [searchParams, router, setUserID, setAccCreated]);

  const [form, setForm] = useState({
    fullName: "",
    contactNumber: "",
    gender: "",
    dob: "",
    role: "Manager",
    coordinates: [77.5946, 12.9716],
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userID) return;

    setLoading(true);
    try {
      await createManagerProfile(userID, {
        contactNumber: form.contactNumber,
        dob: form.dob,
        role: form.role,
        gender: form.gender,
        coordinates: form.coordinates,
        city: form.city,
        state: form.state,
        country: form.country,
        pincode: form.pincode,
      });

      localStorage.setItem("accCreated", "1");
      setAccCreated(1);
      router.push("/dashboard");
    } catch (err) {
      alert("Profile creation failed. Please check required fields.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">Let's Begin</h1>
        <p className="text-gray-400 text-center mb-6">
          Create your account to start your journey.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={form.contactNumber}
          onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="date"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        >
          <option value="Manager">Manager – You Manage the Business</option>
        </select>

        <input
          type="text"
          placeholder="Address Line 1"
          value={form.addressLine1}
          onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="text"
          placeholder="Address Line 2 (Optional)"
          value={form.addressLine2}
          onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="text"
          placeholder="State"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="text"
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="text"
          placeholder="Pincode"
          value={form.pincode}
          onChange={(e) => setForm({ ...form, pincode: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#B8FE22] text-black font-semibold py-2 rounded hover:bg-green-500"
        >
          {Loading ? <SpinnerWithText text="Creating..." /> : "Create Profile"}
        </button>
      </form>
    </main>
  );
}

export default function CreateProfilePage() {
  const { accCreated } = useAuth();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (accCreated === 1) {
      // ✅ Already created → go to dashboard
      router.replace("/dashboard");
    } else {
      // ✅ Either accCreated === 0 or not set yet → show form
      setReady(true);
    }
  }, [accCreated, router]);

  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <ManagerForm />;
}
