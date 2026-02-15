import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function ServiceDetail({ params: paramsPromise }) {
  const params = await paramsPromise; 
  const { service_id } = params;

  const servicesCollection = dbConnect("services");
  const service = await servicesCollection.findOne({ _id: new ObjectId(service_id) });

  if (!service) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Service not found</h2>
        <Link href="/services" className="btn btn-primary">
          Back to Services
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-6">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li>{service.name}</li>
          </ul>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-96 lg:h-auto">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6">
                <div className="badge badge-primary badge-lg font-bold text-lg px-4 py-4 shadow-xl">
                  {service.rating} ⭐
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-6 leading-tight">
                  {service.name}
                </h1>

                <div className="prose max-w-none mb-8">
                  <p className="text-base-content/80 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Service Details Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-primary/10 rounded-xl p-5 border border-primary/20">
                    <div className="text-sm text-base-content/60 mb-1">Price</div>
                    <div className="text-3xl font-bold text-primary">
                      ${service.price}
                    </div>
                    <div className="text-sm text-base-content/60 mt-1">
                      per {service.duration}
                    </div>
                  </div>

                  <div className="bg-accent/10 rounded-xl p-5 border border-accent/20">
                    <div className="text-sm text-base-content/60 mb-1">Duration</div>
                    <div className="text-3xl font-bold text-accent">
                      {service.duration}
                    </div>
                    <div className="text-sm text-base-content/60 mt-1">
                      per session
                    </div>
                  </div>
                </div>

                {/* Features/Benefits */}
                <div className="bg-base-200 rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    What's Included
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Professional and certified caregivers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Flexible scheduling options</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Quality care guaranteed</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={`/booking/${service._id}`} 
                  className="btn btn-primary btn-lg flex-1 text-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Now
                </Link>
                <Link 
                  href="/services" 
                  className="btn btn-outline btn-lg"
                >
                  Browse Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
