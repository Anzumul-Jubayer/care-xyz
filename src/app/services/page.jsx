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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Our Services</h1>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Professional care services tailored to your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Link
            key={service._id}
            href={`/services/${service._id}`}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden"
          >
            <figure className="relative h-56 overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 badge badge-primary badge-lg font-semibold shadow-lg">
                {service.rating} ⭐
              </div>
            </figure>

            <div className="card-body">
              <h2 className="card-title text-2xl group-hover:text-primary transition-colors">
                {service.name}
              </h2>
              
              <p className="text-base-content/70 line-clamp-3 min-h-[4.5rem]">
                {service.description}
              </p>

              <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-300">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-primary">
                    ${service.price}
                  </span>
                  <span className="text-sm text-base-content/60">
                    per {service.duration}
                  </span>
                </div>
                
                <button className="btn btn-primary btn-sm group-hover:btn-accent transition-colors">
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
