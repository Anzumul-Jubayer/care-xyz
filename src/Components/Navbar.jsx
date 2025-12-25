"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Logo */}
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Care.IO" width={40} height={40} priority />
          <span className="text-xl font-bold text-primary">Care.IO</span>
        </Link>
      </div>

      {/* Menu (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          {session && (
            <li>
              <Link href="/my-bookings">My Bookings</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Buttons */}
      <div className="navbar-end gap-2">
        {status === "loading" ? null : session ? (
          <>
            <span className="mr-2 hidden md:inline">Hi, {session.user.name}</span>
            <button className="btn btn-outline btn-primary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="btn btn-outline btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="dropdown dropdown-end lg:hidden">
        <label
          tabIndex={0}
          className="btn btn-ghost"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          ☰
        </label>
        {dropdownOpen && (
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            {session && (
              <li>
                <Link href="/my-bookings">My Bookings</Link>
              </li>
            )}
            {session ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
