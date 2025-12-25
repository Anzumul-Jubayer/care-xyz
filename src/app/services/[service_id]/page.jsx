import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function ServiceDetail({ params: paramsPromise }) {
  const params = await paramsPromise; 
  const { service_id } = params;

  const servicesCollection = dbConnect("services");
  const service = await servicesCollection.findOne({ _id: new ObjectId(service_id) });

  if (!service) return <p className="text-center mt-10">Service not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <img
          src={service.image}
          alt={service.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg"
        />

        {/* Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
          <p className="text-gray-700 mb-4">{service.description}</p>
          <p className="font-semibold mb-2">
            Price: ${service.price} / {service.duration}
          </p>
          <p className="mb-4">
            Rating:{" "}
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
              {service.rating} ⭐
            </span>
          </p>

          <Link
            href="/login"
            className="btn btn-primary"
          >
            Book Service
          </Link>
        </div>
      </div>
    </div>
  );
}
