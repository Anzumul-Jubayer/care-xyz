export default function Testimonials() {
  const metrics = [
    { label: "Happy Clients", value: "1.2K+" },
    { label: "Services Provided", value: "3.5K+" },
    { label: "Caregivers", value: "150+" },
  ];

  const testimonials = [
    {
      name: "Sara Khan",
      role: "Parent",
      text: "Care.IO helped me find a trustworthy babysitter for my son. Very satisfied!",
    },
    {
      name: "Rahim Ahmed",
      role: "Family Member",
      text: "The elderly care service was professional and compassionate. Highly recommend!",
    },
    {
      name: "Nadia Hossain",
      role: "Patient Family",
      text: "The sick care service made home care easy and reliable. Great experience!",
    },
  ];

  return (
    <section className="py-16 bg-base-300">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Our Impact</h2>
        <p className="mt-2 text-gray-600">
          We are trusted by thousands of families for quality care.
        </p>

        {/* Metrics */}
        <div className="mt-10 flex flex-col md:flex-row justify-center gap-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{metric.value}</p>
              <p className="mt-1 text-gray-700">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-base-100 rounded-xl shadow-md p-6 text-left"
            >
              <p className="text-gray-700 italic">{t.text}</p>
              <p className="mt-4 font-semibold text-primary">{t.name}</p>
              <p className="text-gray-500 text-sm">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
