"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useParams } from "next/navigation";
import { Copy } from "lucide-react";

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
  const [toast, setToast] = useState(false);

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

  const copyText = () => {

    if (!note?.text) return;

    navigator.clipboard.writeText(note.text);

    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 2000);
  };

  const handleDownload = () => {

    if (!note?.pdf_url) return;

    const link = document.createElement("a");
    link.href = note.pdf_url;
    link.download = "file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-lg animate-slide-up">
          Copied to clipboard
        </div>
      )}

      <div className="bg-white border shadow-lg rounded-2xl p-10 w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-indigo-600 mb-2">
          Receive Note
        </h1>

        <p className="text-gray-600 mb-6">
          Enter a 6-digit code to retrieve a shared note
        </p>

        {/* Code Input */}
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

        {/* Fetch Button */}
        <button
          onClick={handleFetch}
          disabled={loading}
          className="mt-8 w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Retrieving..." : "Get Note"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}

        {/* Note Display */}
        {note && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">

            <p className="text-green-700 font-semibold mb-4">
              Note retrieved successfully
            </p>

            {note.text && (
              <div className="bg-white rounded-lg p-4 border mb-4 relative">

                <button
                  onClick={copyText}
                  className="absolute top-3 right-3 text-gray-500 hover:text-indigo-600 transition cursor-pointer"
                >
                  <Copy size={18} />
                </button>

                <p className="text-gray-800 whitespace-pre-wrap pr-8">
                  {note.text}
                </p>

              </div>
            )}

            {/* File Download */}
            {note.pdf_url && (
              <button
                onClick={handleDownload}
                className="block w-full text-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
              >
                Download File
              </button>
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