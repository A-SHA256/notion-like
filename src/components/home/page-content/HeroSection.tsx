export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-green-800 text-white">
      {/* Optional overlay if you add a background image later */}
      <div className="absolute inset-0 bg-green-900/70 backdrop-blur-sm" />

      <div className="relative z-10 max-w-4xl text-center px-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
          Organize Your Mind. <br /> Capture Every Thought.
        </h1>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-green-100 max-w-2xl mx-auto">
          N0TE-E is the fast, minimalist notes app that helps you think better,
          stay organized, and never lose an idea again.
        </h2>
      </div>
    </section>
  );
}
