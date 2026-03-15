"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Receive() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleFetch = () => {
    if (!/^\d{6}$/.test(code)) return;
    router.push(`/receive/${code}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

      <div className="bg-white border shadow-lg rounded-2xl p-10 w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-indigo-600 mb-2">
          Receive Note
        </h1>

        <p className="text-gray-600 mb-6">
          Enter a 6-digit code to retrieve a shared note
        </p>

        {/* CODE INPUT */}
        <input
          type="text"
          placeholder="Enter 6 digit code"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleFetch();
          }}
          maxLength={6}
          className="w-full border border-gray-300 p-4 rounded-xl text-3xl font-bold text-center tracking-widest text-indigo-600 placeholder-gray-400"
        />

        {/* BUTTON */}
        <button
          onClick={handleFetch}
          className="mt-8 w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          Get Note
        </button>

      </div>

    </main>
  );
}