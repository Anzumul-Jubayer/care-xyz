import Image from "next/image";

const services = [
  {
    name: "Baby Care",
    description: "Professional caregivers for your children at home.",
    image: "/baby-care.jpg",
  },
  {
    name: "Elderly Service",
    description: "Trusted support for elderly family members.",
    image: "/old-care.avif",
  },
  {
    name: "Sick People Service",
    description: "Compassionate care for sick individuals at home.",
    image: "/sick-care.jpeg",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-primary">Our Services</h2>
        <p className="mt-4 text-gray-700">
          We provide reliable and trusted care services for your loved ones.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="bg-base-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-primary">
                  {service.name}
                </h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
