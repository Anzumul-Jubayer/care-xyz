"use client";

import { useState } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(pwd);
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    if (!validatePassword(pwd)) {
      setError(
        "Password must be at least 6 characters long and contain at least one uppercase and one lowercase letter."
      );
    } else {
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full bg-base-100 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register for Care.IO
        </h2>

        <form className="mt-6 space-y-4">
          {/* NID */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">NID No</label>
            <input type="text" placeholder="Enter your NID" className="w-full input input-bordered" />
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input type="text" placeholder="Enter your name" className="w-full input input-bordered" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input type="email" placeholder="Enter your email" className="w-full input input-bordered" />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Contact</label>
            <input type="text" placeholder="Enter your contact number" className="w-full input input-bordered" />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full input input-bordered pr-12"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Register Button */}
          <button className="w-full btn btn-primary mt-4" type="submit">
            Register
          </button>
        </form>

        {/* Optional Links */}
        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
