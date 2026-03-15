"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useParams } from "next/navigation";

type Note = {
  code: string;
  text: string | null;
  pdf_url: string | null;
  expires_at: string;
};

export default function ReceivePage() {
  const params = useParams();
  const urlCode = params.code as string;

  const [code, setCode] = useState("");
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNote = async (noteCode: string) => {
    setLoading(true);
    setError("");
    setNote(null);

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("code", noteCode)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (error || !data) {
      setError("Note not found or expired");
      setLoading(false);
      return;
    }

    setNote(data);
    setLoading(false);
  };

  // Auto load note from URL
  useEffect(() => {
    if (urlCode && /^\d{6}$/.test(urlCode)) {
      setCode(urlCode);
      fetchNote(urlCode);
    }
  }, [urlCode]);

  const handleFetch = () => {
    if (!/^\d{6}$/.test(code)) {
      setError("Enter a valid 6 digit code");
      return;
    }

    fetchNote(code);
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
          disabled={loading}
          className="mt-8 w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Retrieving..." : "Get Note"}
        </button>

        {/* ERROR */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}

        {/* NOTE DISPLAY */}
        {note && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">

            <p className="text-green-700 font-semibold mb-4">
              Note retrieved successfully
            </p>

            {note.text && (
              <div className="bg-white rounded-lg p-4 border mb-4">
                <p className="text-gray-800 whitespace-pre-wrap">
                  {note.text}
                </p>
              </div>
            )}

            {note.pdf_url && (
              <a
                href={note.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Open PDF File
              </a>
            )}

            <p className="text-sm text-yellow-700 mt-4">
              This note will automatically expire.
            </p>

          </div>
        )}

      </div>

    </main>
  );
}