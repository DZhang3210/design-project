"use client";
import { MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-white z-[100]">
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
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/user"
        >
          My Account
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
