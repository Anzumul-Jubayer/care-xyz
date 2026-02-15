"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PrivateRoute from "@/Components/PrivateRoute";
import Loading from "@/Components/Loading";
import toast from "react-hot-toast";
import Link from "next/link";
import Swal from "sweetalert2";

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}

function MyBookingsContent() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, [session]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      
      // Filter bookings for current user
      const userBookings = data.filter(
        (booking) => booking.userId === session?.user?.email
      );
      
      // Sort by creation date (newest first)
      userBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setBookings(userBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    setCancellingId(bookingId);

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      await Swal.fire({
        title: "Cancelled!",
        text: "Your booking has been cancelled successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error("Error cancelling booking:", error);
      await Swal.fire({
        title: "Error!",
        text: "Failed to cancel booking. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: "badge-warning",
      Confirmed: "badge-info",
      Completed: "badge-success",
      Cancelled: "badge-error",
    };

    return (
      <span className={`badge ${statusStyles[status] || "badge-ghost"} badge-lg`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-10 w-64 bg-base-300 rounded-lg animate-pulse mb-2"></div>
            <div className="h-6 w-96 bg-base-300 rounded-lg animate-pulse"></div>
          </div>

          {/* Booking Cards Skeleton */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-base-100 rounded-2xl shadow-xl p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="h-8 w-64 bg-base-300 rounded-lg animate-pulse mb-2"></div>
                        <div className="h-4 w-48 bg-base-300 rounded-lg animate-pulse"></div>
                      </div>
                      <div className="h-8 w-24 bg-base-300 rounded-full animate-pulse"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div className="h-5 w-5 bg-base-300 rounded-full animate-pulse mt-0.5"></div>
                          <div className="flex-1">
                            <div className="h-4 w-20 bg-base-300 rounded animate-pulse mb-2"></div>
                            <div className="h-5 w-32 bg-base-300 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:w-48">
                    <div className="h-10 w-full bg-base-300 rounded-lg animate-pulse"></div>
                    <div className="h-10 w-full bg-base-300 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
          <p className="text-base-content/70">
            View and manage all your service bookings
          </p>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-base-100 rounded-2xl shadow-xl p-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto text-base-content/30 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h2 className="text-2xl font-bold mb-2">No bookings yet</h2>
            <p className="text-base-content/70 mb-6">
              Start by booking a service from our catalog
            </p>
            <Link href="/services" className="btn btn-primary btn-lg">
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-base-100 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Booking Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">
                            {booking.serviceName}
                          </h3>
                          <p className="text-sm text-base-content/60">
                            Booked on{" "}
                            {new Date(booking.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Duration */}
                        <div className="flex items-start gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <div>
                            <p className="text-sm text-base-content/60">Duration</p>
                            <p className="font-semibold">{booking.duration} days</p>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <div>
                            <p className="text-sm text-base-content/60">Location</p>
                            <p className="font-semibold">
                              {booking.location.area}, {booking.location.city}
                            </p>
                            <p className="text-sm text-base-content/60">
                              {booking.location.district}, {booking.location.region}
                            </p>
                          </div>
                        </div>

                        {/* Total Cost */}
                        <div className="flex items-start gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <div>
                            <p className="text-sm text-base-content/60">Total Cost</p>
                            <p className="font-bold text-2xl text-primary">
                              ${booking.totalCost}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 lg:w-48">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="btn btn-outline btn-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View Details
                      </button>

                      {booking.status !== "Cancelled" && booking.status !== "Completed" && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={cancellingId === booking._id}
                          className="btn btn-outline btn-error"
                        >
                          {cancellingId === booking._id ? (
                            <>
                              <span className="loading loading-spinner loading-sm"></span>
                              Cancelling...
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              Cancel Booking
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-2xl mb-6">Booking Details</h3>

            <div className="space-y-6">
              {/* Service Info */}
              <div>
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Service Information
                </h4>
                <div className="bg-base-200 rounded-lg p-4">
                  <p className="mb-2">
                    <span className="font-semibold">Service:</span>{" "}
                    {selectedBooking.serviceName}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Duration:</span>{" "}
                    {selectedBooking.duration} days
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Total Cost:</span>{" "}
                    <span className="text-primary font-bold text-xl">
                      ${selectedBooking.totalCost}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {getStatusBadge(selectedBooking.status)}
                  </p>
                </div>
              </div>

              {/* Location Info */}
              <div>
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Location Details
                </h4>
                <div className="bg-base-200 rounded-lg p-4">
                  <p className="mb-2">
                    <span className="font-semibold">Division:</span>{" "}
                    {selectedBooking.location.region}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">District:</span>{" "}
                    {selectedBooking.location.district}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">City:</span>{" "}
                    {selectedBooking.location.city}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Area:</span>{" "}
                    {selectedBooking.location.area}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {selectedBooking.location.address}
                  </p>
                </div>
              </div>

              {/* Booking Info */}
              <div>
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
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
                  Additional Information
                </h4>
                <div className="bg-base-200 rounded-lg p-4">
                  <p className="mb-2">
                    <span className="font-semibold">Booking ID:</span>{" "}
                    {selectedBooking._id}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Customer:</span>{" "}
                    {selectedBooking.userName}
                  </p>
                  <p>
                    <span className="font-semibold">Booked on:</span>{" "}
                    {new Date(selectedBooking.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setSelectedBooking(null)}
                className="btn btn-primary"
              >
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setSelectedBooking(null)}></div>
        </div>
      )}
    </div>
  );
}
