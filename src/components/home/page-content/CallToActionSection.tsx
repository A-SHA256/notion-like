import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section className="bg-green-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to organize your thoughts with N0TE-E?
        </h2>
        <p className="text-lg text-green-200 mb-10 max-w-2xl mx-auto">
          Join thousands of users who are simplifying their note-taking and boosting productivity. Get started for free today!
        </p>
        <Link
          href="/auth/sign-up"
          className="inline-block bg-white text-green-900 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-green-100 transition-colors duration-300"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
