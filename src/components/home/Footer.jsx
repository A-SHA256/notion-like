import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-200 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-8">
        {/* Logo / Brand */}
        <div className="text-2xl font-semibold font-serif select-none text-center sm:text-left">
          N0TE-E &copy; {new Date().getFullYear()}
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
          <Link
            href="https://www.freeprivacypolicy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            href="https://github.com/A-SHA256"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
