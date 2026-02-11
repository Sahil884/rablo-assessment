"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { createManagerProfile } from "../../api/profile";
import SpinnerWithText from "@/src/components/SpinnerWithText";

// ✅ Extract your form into a separate component
function ManagerForm() {
  const { userID, setUserID, setAccCreated } = useAuth();
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const id = searchParams.get("userID");
    if (id) {
      localStorage.setItem("userID", id);
      setUserID(id);

      const accCreated = localStorage.getItem(`accCreated`);
      if (accCreated === "1") {
        setAccCreated(1);
      } else if (accCreated === "0" || accCreated === null) {
        setAccCreated(0);
      }
    }
  }, [searchParams, router, setUserID, setAccCreated]);

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

// ✅ Wrap ManagerForm in Suspense
export default function CreateProfilePage() {
  const { accCreated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (accCreated === 1) {
      router.replace("/dashboard"); // skip manager form if already created
    }
  }, [accCreated, router]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ManagerForm />
    </Suspense>
  );
}
