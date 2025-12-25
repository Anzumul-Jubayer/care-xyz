"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    toast.success("Logout Successful");
    signOut({ callbackUrl: "/login" });
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
  ];

  if (session) navItems.push({ label: "My Bookings", href: "/my-bookings" });

  const getLinkClasses = (href) =>
    pathname === href
      ? "bg-primary text-white rounded-md"
      : "hover:bg-primary hover:text-white rounded-md";

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Care.IO"
            width={40}
            height={40}
            priority
          />
          <span className="text-xl font-bold text-primary">Care.IO</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-3 py-2 ${getLinkClasses(item.href)}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {status === "loading" ? null : session ? (
          <>
            <span className="mr-2 text-xs md:text-2xl">
              Hi, {session.user.name}
            </span>
            <button
              className="btn btn-outline btn-primary btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="btn btn-outline btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>

      <div className="lg:hidden relative">
        <button
          className="btn btn-ghost"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          ☰
        </button>

        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-base-100 shadow-md rounded-md p-2 flex flex-col gap-1 z-50">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 ${getLinkClasses(item.href)}`}
                  onClick={() => setDropdownOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {session ? (
              <li>
                <button
                  className="w-full text-left px-3 py-2 hover:bg-red-500 hover:text-white rounded-md"
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="block px-3 py-2 hover:bg-primary hover:text-white rounded-md"
                  onClick={() => setDropdownOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
