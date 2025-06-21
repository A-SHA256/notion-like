export default function FeaturesSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-12">
          Why Choose <span className="text-green-700">N0TE-E</span>?
        </h1>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <li className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <h3 className="text-lg font-semibold text-green-800 mb-2">📝 Simple & Fast</h3>
            <p className="text-gray-700">
              Instantly create and manage notes with a clean, distraction-free interface.
            </p>
          </li>
          <li className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <h3 className="text-lg font-semibold text-green-800 mb-2">📱 Access Anywhere</h3>
            <p className="text-gray-700">
              Sync your notes across devices and never miss a moment of inspiration.
            </p>
          </li>
          <li className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <h3 className="text-lg font-semibold text-green-800 mb-2">🔐 Privacy First</h3>
            <p className="text-gray-700">
              Your thoughts are safe with end-to-end encryption and zero tracking.
            </p>
          </li>
          <li className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <h3 className="text-lg font-semibold text-green-800 mb-2">🏷️ Organized Easily</h3>
            <p className="text-gray-700">
              Use tags and folders to categorize your notes however you think best.
            </p>
          </li>
          <li className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <h3 className="text-lg font-semibold text-green-800 mb-2">🌙 Built-in Dark Mode</h3>
            <p className="text-gray-700">
              Write day or night with a smooth dark theme that’s easy on the eyes.
            </p>
          </li>
          <li className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <h3 className="text-lg font-semibold text-green-800 mb-2">📅 Smart Reminders</h3>
            <p className="text-gray-700">
              Set gentle nudges to revisit or follow up on important notes.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
