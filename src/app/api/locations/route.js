


import locations from "@/data/locations.json";

export async function GET() {
  return new Response(JSON.stringify([locations]), { status: 200 });
}





