import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-green-900/90 backdrop-blur-md shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-4xl font-bold tracking-tight select-none"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <Link href={'/'}>N0TE-E</Link>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-4 sm:gap-6 font-sans" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
          <Link
            href="/auth/sign-in"
            className="text-sm sm:text-base font-medium px-4 py-2 rounded-lg hover:bg-white hover:text-green-900 transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/auth/sign-up"
            className="text-sm sm:text-base font-semibold px-4 py-2 rounded-lg bg-white text-green-900 hover:bg-green-100 transition-colors duration-200 shadow-sm"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
