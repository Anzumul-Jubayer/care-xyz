import { dbConnect } from "@/lib/dbConnect";

export async function POST(req) {
  const body = await req.json();
  const bookingsCollection = dbConnect("bookings");
  const result = await bookingsCollection.insertOne(body);
  return new Response(JSON.stringify(result), { status: 201 });
}
