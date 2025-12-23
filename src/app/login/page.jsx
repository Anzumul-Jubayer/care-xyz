"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full bg-base-100 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to Care.IO
        </h2>
        <form className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full input input-bordered"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full input input-bordered pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button className="w-full btn btn-primary mt-4">Login</button>
        </form>
        {/* Optional Links */}
        
        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
