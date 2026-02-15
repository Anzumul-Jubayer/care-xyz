// src/app/booking/[service_id]/BookingClient.jsx
"use client";

import { useState, useEffect } from "react";

export default function BookingClient({ service, locations }) {
  const [duration, setDuration] = useState(1);
  const [area, setArea] = useState(locations.covered_area[0]);
  const [total, setTotal] = useState(service.price);

  useEffect(() => {
    setTotal(service.price * duration); // calculate total dynamically
  }, [duration, service.price]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
      <p className="mb-4">{service.description}</p>
      <p className="mb-2 font-semibold">
        Price: ${service.price} / {service.duration}
      </p>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Duration ({service.duration})</label>
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="border p-2 rounded w-32"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Location / Area</label>
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="border p-2 rounded w-64"
        >
          {locations.covered_area.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <p className="font-bold mb-4">Total Cost: ${total}</p>

      <button
        className="btn btn-primary"
        onClick={() => alert("Booking confirmed! (Save to DB logic pending)")}
      >
        Confirm Booking
      </button>
    </div>
  );
}
