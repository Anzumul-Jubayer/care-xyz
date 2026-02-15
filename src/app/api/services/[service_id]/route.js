// src/app/api/services/[service_id]/route.js
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { service_id } = params;
  const servicesCollection = await dbConnect("services");
  const service = await servicesCollection.findOne({ _id: new ObjectId(service_id) });

  if (!service) {
    return new Response(JSON.stringify({ error: "Service not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(service), { status: 200 });
}

