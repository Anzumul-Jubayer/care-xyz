"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nid: "",
    name: "",
    email: "",
    contact: "",
  });

  // password 
  const validatePassword = (pwd) =>
    /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(pwd);

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    if (!validatePassword(pwd)) {
      setError(
        "Password must be at least 6 characters with 1 uppercase & 1 lowercase"
      );
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      toast.success("Registration successful! Please login.");
      router.push("/");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full bg-base-100 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center">Register for Care.IO</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* NID */}
          <div>
            <label className="block font-semibold mb-1">NID</label>
            <input
              name="nid"
              required
              onChange={handleChange}
              className="w-full input input-bordered"
              placeholder="Enter your NID"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              name="name"
              required
              onChange={handleChange}
              className="w-full input input-bordered"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              className="w-full input input-bordered"
              placeholder="Enter your email"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block font-semibold mb-1">Contact</label>
            <input
              name="contact"
              required
              onChange={handleChange}
              className="w-full input input-bordered"
              placeholder="Enter your contact number"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={handlePasswordChange}
                className="w-full input input-bordered pr-14"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            className="w-full btn btn-primary"
            type="submit"
            disabled={loading || !!error}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
