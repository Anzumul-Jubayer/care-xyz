// app/booking/[service_id]/page.jsx
import React from "react";

const BookingPage = async ({ params: paramsPromise }) => {
  // params unwrap
  const params = await paramsPromise;
  const serviceId = params.service_id;

  console.log("Service ID:", serviceId);

  const res = await fetch(`http://localhost:3000/api/services/${serviceId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log("Fetch error:", res.status, await res.text());
    return <div>Error fetching service</div>;
  }

  const service = await res.json();
  console.log("Service data:", service);

  return (
    <div>
      <h1>Booking Service: {service.name}</h1>
      <p>Service ID: {serviceId}</p>
    </div>
  );
};

export default BookingPage;
