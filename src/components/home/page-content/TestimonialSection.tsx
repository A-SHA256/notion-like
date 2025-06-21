export default function TestimonialSection() {
  return (
    <section className="bg-green-50 py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <p className="text-gray-800 italic mb-4">
              “N0TE-E changed the way I organize my thoughts. It is fast, distraction-free,
              and actually enjoyable to use every day.”
            </p>
            <div className="font-semibold text-green-800">– Sarah M., Writer</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <p className="text-gray-800 italic mb-4">
              “I use it to capture ideas on the go. The sync is smooth and the interface
              is beautifully minimal.”
            </p>
            <div className="font-semibold text-green-800">– Jamal B., Developer</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <p className="text-gray-800 italic mb-4">
              “As a student, I rely on N0TE-E for everything — lectures, reminders,
              and even journaling. It is become essential.”
            </p>
            <div className="font-semibold text-green-800">– Priya S., Student</div>
          </div>
        </div>
      </div>
    </section>
  );
}
