"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { QRCodeSVG } from "qrcode.react";
import confetti from "canvas-confetti";

export default function CreatePage() {

  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "uploaded"
  >("idle");

  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [showCard, setShowCard] = useState(false);

  const generateUniqueCode = async () => {

    let code = "";
    let exists = true;

    while (exists) {

      code = Math.floor(100000 + Math.random() * 900000).toString();

      const { data } = await supabase
        .from("notes")
        .select("code")
        .eq("code", code)
        .maybeSingle();

      if (!data) exists = false;
    }

    return code;
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
      });
    }, 200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      return;
    }

    setFile(selectedFile);
    setUploadStatus("idle");
    setUploadedUrl(null);
  };

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {

      setUploadStatus("uploading");

      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("notes-files")
        .upload(fileName, file);

      if (error) {
        alert("Upload failed");
        setUploadStatus("idle");
        return;
      }

      const { data } = supabase.storage
        .from("notes-files")
        .getPublicUrl(fileName);

      setUploadedUrl(data.publicUrl);
      setUploadStatus("uploaded");

    } catch {
      setUploadStatus("idle");
    }
  };

  const handleGenerate = async () => {

    if (file && uploadStatus !== "uploaded") {
      alert("Please upload the file before generating the code.");
      return;
    }

    if (!text.trim() && !uploadedUrl) {
      alert("Please add text or upload a file");
      return;
    }

    setLoading(true);

    const code = await generateUniqueCode();

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const { error } = await supabase.from("notes").insert([
      {
        code,
        text,
        pdf_url: uploadedUrl,
        expires_at: expiresAt.toISOString(),
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Failed to save note");
      console.error(error);
      return;
    }

    setGeneratedCode(code);
    fireConfetti();
    setShowCard(true);

    setText("");
    setFile(null);
    setUploadedUrl(null);
    setUploadStatus("idle");
  };

  const shareLink =
    generatedCode && `${window.location.origin}/receive/${generatedCode}`;

  return (
    <main className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

      <div className="bg-white/60 backdrop-blur-xl border border-white/70 shadow-xl rounded-3xl p-10 w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-indigo-600 mb-2">
          Create a Note
        </h1>

        <p className="text-gray-600 mb-6">
          Share your message securely with a code or QR
        </p>

        <textarea
          placeholder="Write your note here..."
          maxLength={5000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-48 border border-gray-200 rounded-2xl p-5 bg-white text-gray-800 resize-none"
        />

        <p className="text-sm text-gray-500 mt-2">
          {text.length} / 5000 characters
        </p>

        {/* Upload Area */}
        <div className="mt-6">
          <label className="flex items-center justify-center w-full cursor-pointer border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-2xl p-6 bg-indigo-50 transition">

            <span className="text-center">
              {file ? (
                <div>
                  <p className="text-green-600 font-semibold">✓ {file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Click to change file
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-gray-700">
                    Upload File
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Max 5MB (images, docs, pdf, zip, etc.)
                  </p>
                </div>
              )}
            </span>

            <input
              type="file"
              accept="*"
              onChange={handleFileChange}
              className="hidden"
            />

          </label>
        </div>

        {/* Upload Button */}
        {file && uploadStatus !== "uploaded" && (
          <button
            onClick={handleUpload}
            disabled={uploadStatus === "uploading"}
            className="mt-4 w-full border border-indigo-500 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadStatus === "uploading"
              ? "Uploading..."
              : "Upload File"}
          </button>
        )}

        {/* Remove File */}
        {file && (
          <button
            onClick={() => {
              setFile(null);
              setUploadedUrl(null);
              setUploadStatus("idle");
            }}
            className="mt-3 w-full border border-red-400 text-red-500 py-2 rounded-xl hover:bg-red-50 transition cursor-pointer"
          >
            Remove Selected File
          </button>
        )}

        {uploadStatus === "uploaded" && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl">
            ✅ File uploaded successfully
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || uploadStatus === "uploading"}
          className="mt-8 w-full bg-indigo-600 text-white py-4 rounded-2xl font-semibold hover:bg-indigo-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate Code"}
        </button>

      </div>

      {/* Popup */}
      {showCard && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full relative">

            <button
              onClick={() => setShowCard(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
              Your Note is Ready 🎉
            </h2>

            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-center mb-6">
              <p className="text-4xl font-bold tracking-widest text-indigo-600">
                {generatedCode}
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-xl shadow">
                <QRCodeSVG value={shareLink} size={140} />
              </div>
            </div>

            <button
              onClick={() => navigator.clipboard.writeText(shareLink)}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition cursor-pointer"
            >
              Copy Share Link
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Note expires in 10 minutes
            </p>

          </div>

        </div>
      )}

    </main>
  );
}