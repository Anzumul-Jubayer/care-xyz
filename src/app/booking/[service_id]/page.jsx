import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import BookingClient from "./BookingClient";
import PrivateRoute from "@/Components/PrivateRoute";
import locations from "@/data/locations.json";

export default async function BookingPage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const { service_id } = params;

  const servicesCollection = await dbConnect("services");
  const service = await servicesCollection.findOne({ _id: new ObjectId(service_id) });

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service not found</h2>
          <a href="/services" className="btn btn-primary">
            Back to Services
          </a>
        </div>
      </div>
    );
  }

  // Convert ObjectId to string for client component
  const serviceData = {
    ...service,
    _id: service._id.toString(),
  };

  return (
    <PrivateRoute>
      <BookingClient service={serviceData} locations={locations} />
    </PrivateRoute>
  );
}
