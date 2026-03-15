import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">

      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition"
        >
          NotesDrop
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-gray-700 font-medium">

          <Link
            href="/"
            className="relative group pb-1 hover:text-indigo-600 transition"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            href="/create"
            className="relative group pb-1 hover:text-indigo-600 transition"
          >
            Create
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            href="/receive"
            className="relative group pb-1 hover:text-indigo-600 transition"
          >
            Receive
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

        </div>

      </div>

    </nav>
  );
}