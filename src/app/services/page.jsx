"use client";

import Loading from "@/Components/Loading";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link
            key={service._id}
            href={`/services/${service._id}`} 
            className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-4">{service.name}</h2>
            <p className="mt-2 text-gray-600">
              {service.description.length > 80
                ? service.description.slice(0, 80) + "..."
                : service.description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold">
                ${service.price}/{service.duration}
              </span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                {service.rating} ⭐
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
