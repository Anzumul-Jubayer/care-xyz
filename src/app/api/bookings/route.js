import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const bookingData = await req.json();

    // Validation
    if (!bookingData.serviceId || !bookingData.userId || !bookingData.duration) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!bookingData.location?.region || !bookingData.location?.district || 
        !bookingData.location?.city || !bookingData.location?.area || 
        !bookingData.location?.address) {
      return NextResponse.json(
        { message: "Complete location information is required" },
        { status: 400 }
      );
    }

    const bookingsCollection = await dbConnect("bookings");

    // Insert booking with status = Pending
    const result = await bookingsCollection.insertOne({
      ...bookingData,
      status: "Pending",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { 
        message: "Booking created successfully",
        bookingId: result.insertedId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { message: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const bookingsCollection = await dbConnect("bookings");
    const bookings = await bookingsCollection.find({}).toArray();
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
