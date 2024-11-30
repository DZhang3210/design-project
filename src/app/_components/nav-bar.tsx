"use client";
import { MapPin } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

const NavBar = () => {
  const [token, setToken] = React.useState<string | null>(null);

  useEffect(() => {
    // Initial token value
    setToken(localStorage.getItem("token"));

    // Listen for changes to localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        setToken(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-white z-[100] text-black">
      <Link className="flex items-center justify-center" href="/">
        <MapPin className="h-6 w-6 text-primary" />
        <span className="ml-2 text-2xl font-bold">MedConnect</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/results"
        >
          Search
        </Link>
        {token ? (
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/user"
          >
            My Account
          </Link>
        ) : (
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/login"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
