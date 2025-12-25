import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const servicesCollection = dbConnect("services");
    const services = await servicesCollection.find({}).toArray();

    return new Response(JSON.stringify(services), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to fetch services" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
