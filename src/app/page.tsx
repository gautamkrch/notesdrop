"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="gradient-bg grid-bg min-h-screen">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-36 text-center">

        {/* Badge */}
        <div className="inline-block px-4 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
          Fast • Secure • Simple
        </div>

        {/* Big Heading */}
        <h1 className="mt-6 text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Share Notes Instantly
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto">
          Securely share notes or PDFs using a simple code.
          Notes automatically expire for privacy.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex justify-center gap-6">

          <Link
            href="/create"
            className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Create Note
          </Link>

          <Link
            href="/receive"
            className="px-8 py-4 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Receive Note
          </Link>

        </div>

      </section>


      {/* PRODUCT PREVIEW */}
      <section className="max-w-5xl mx-auto px-6 mt-28 flex justify-center">

        <div className="bg-white border rounded-xl shadow-lg w-[420px] overflow-hidden">

          <div className="flex items-center gap-2 px-4 py-3 border-b bg-gray-50">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>

          <div className="p-6">

            <h3 className="font-semibold text-gray-800">
              Shared Note
            </h3>

            <p className="text-indigo-600 font-bold mt-1 tracking-widest text-lg">
              483921
            </p>

            <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
              Here are the lecture notes for tomorrow’s class.
              Review chapter 3 before the test.
            </div>

            <button className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
              Copy Share Link
            </button>

          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section className="max-w-5xl mx-auto px-6 mt-28 pb-24">

        <h2 className="text-3xl font-bold text-center text-gray-800">
          Why NotesDrop?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <div className="text-indigo-600 text-3xl">⚡</div>
            <h3 className="font-semibold mt-3">Instant Sharing</h3>
            <p className="text-gray-600 text-sm mt-2">
              Share notes instantly using a simple code.
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <div className="text-indigo-600 text-3xl">📄</div>
            <h3 className="font-semibold mt-3">PDF Upload</h3>
            <p className="text-gray-600 text-sm mt-2">
              Upload and share PDF documents easily.
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <div className="text-indigo-600 text-3xl">⏳</div>
            <h3 className="font-semibold mt-3">Auto Expiry</h3>
            <p className="text-gray-600 text-sm mt-2">
              Notes automatically expire for privacy.
            </p>
          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} NotesDrop
      </footer>

    </main>
  );
}