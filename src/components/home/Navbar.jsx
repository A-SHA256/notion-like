import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full bg-gradient-to-r from-green-700 via-green-600 to-green-800 text-white shadow-lg z-50 flex items-center justify-between px-8 py-5 font-serif">
      {/* Left side logo */}
      <div
        className="text-2xl font-bold select-none cursor-default"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        N0TEE
      </div>

      {/* Right side buttons */}
      <div className="flex space-x-8">
        <Link
          href="/auth/sign-in"
          className="text-base font-semibold hover:underline hover:text-green-300 transition"
        >
          Sign In
        </Link>
        <Link
          href="/auth/sign-up"
          className="text-base font-semibold hover:underline hover:text-green-300 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
