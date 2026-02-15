"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function BookingClient({ service, locations }) {
  const { data: session } = useSession();
  const router = useRouter();

  // Form state
  const [duration, setDuration] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // Derived data
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [totalCost, setTotalCost] = useState(service.price);

  // Extract unique regions on mount
  useEffect(() => {
    const uniqueRegions = [...new Set(locations.map((loc) => loc.region))];
    setRegions(uniqueRegions);
  }, []);

  // Update districts when region changes
  useEffect(() => {
    if (selectedRegion) {
      const filteredDistricts = locations
        .filter((loc) => loc.region === selectedRegion)
        .map((loc) => loc.district);
      setDistricts([...new Set(filteredDistricts)]);
      setSelectedDistrict("");
      setSelectedCity("");
      setSelectedArea("");
    }
  }, [selectedRegion]);

  // Update cities when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const filteredCities = locations
        .filter(
          (loc) =>
            loc.region === selectedRegion && loc.district === selectedDistrict
        )
        .map((loc) => loc.city);
      setCities([...new Set(filteredCities)]);
      setSelectedCity("");
      setSelectedArea("");
    }
  }, [selectedDistrict]);

  // Update areas when city changes
  useEffect(() => {
    if (selectedCity) {
      const location = locations.find(
        (loc) =>
          loc.region === selectedRegion &&
          loc.district === selectedDistrict &&
          loc.city === selectedCity
      );
      if (location) {
        setAreas(location.covered_area);
        setSelectedArea("");
      }
    }
  }, [selectedCity]);

  // Calculate total cost dynamically
  useEffect(() => {
    setTotalCost(service.price * duration);
  }, [duration, service.price]);

  const handleConfirmBooking = async () => {
    // Validation
    if (!selectedRegion || !selectedDistrict || !selectedCity || !selectedArea) {
      toast.error("Please select all location fields");
      return;
    }

    if (!address.trim()) {
      toast.error("Please provide your address");
      return;
    }

    if (duration < 1) {
      toast.error("Duration must be at least 1");
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        serviceId: service._id,
        serviceName: service.name,
        userId: session?.user?.email,
        userName: session?.user?.name,
        duration,
        location: {
          region: selectedRegion,
          district: selectedDistrict,
          city: selectedCity,
          area: selectedArea,
          address,
        },
        totalCost,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Booking failed");
        return;
      }

      toast.success("Booking confirmed successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-6">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href={`/services/${service._id}`}>{service.name}</Link></li>
            <li>Book Now</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-2xl shadow-xl p-8">
              <h1 className="text-3xl font-bold mb-6">Book Your Service</h1>

              {/* Step 1: Duration */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <h2 className="text-xl font-semibold">Select Duration</h2>
                </div>
                <div className="ml-13">
                  <label className="block text-sm font-medium mb-2">
                    Duration ({service.duration})
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Enter duration"
                  />
                </div>
              </div>

              {/* Step 2: Location */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <h2 className="text-xl font-semibold">Select Location</h2>
                </div>
                <div className="ml-13 space-y-4">
                  {/* Region/Division */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Division
                    </label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="select select-bordered w-full"
                    >
                      <option value="">Select Division</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      District
                    </label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="select select-bordered w-full"
                      disabled={!selectedRegion}
                    >
                      <option value="">Select District</option>
                      {districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="select select-bordered w-full"
                      disabled={!selectedDistrict}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Area */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Area
                    </label>
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="select select-bordered w-full"
                      disabled={!selectedCity}
                    >
                      <option value="">Select Area</option>
                      {areas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Detailed Address
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="textarea textarea-bordered w-full"
                      rows="3"
                      placeholder="Enter your detailed address (House/Flat no, Road, etc.)"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Step 3: Confirm */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <h2 className="text-xl font-semibold">Confirm Booking</h2>
                </div>
                <div className="ml-13">
                  <button
                    onClick={handleConfirmBooking}
                    disabled={loading}
                    className="btn btn-primary btn-lg w-full"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Confirm Booking
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Booking Summary</h3>

              {/* Service Info */}
              <div className="mb-6">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h4 className="font-semibold text-lg">{service.name}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className="badge badge-primary">{service.rating} ⭐</span>
                </div>
              </div>

              <div className="divider"></div>

              {/* Pricing Details */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-base-content/70">Price per {service.duration}</span>
                  <span className="font-semibold">${service.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-base-content/70">Duration</span>
                  <span className="font-semibold">{duration} {service.duration}</span>
                </div>
                {selectedRegion && (
                  <div className="flex justify-between text-sm">
                    <span className="text-base-content/70">Location</span>
                    <span className="font-semibold text-right">
                      {selectedArea || selectedCity || selectedDistrict || selectedRegion}
                    </span>
                  </div>
                )}
              </div>

              <div className="divider"></div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total Cost</span>
                <span className="text-3xl font-bold text-primary">
                  ${totalCost}
                </span>
              </div>

              <div className="mt-6 p-4 bg-info/10 rounded-lg">
                <p className="text-sm text-base-content/70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Your booking will be confirmed once you submit. Status: Pending
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
