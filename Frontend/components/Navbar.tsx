"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartDropdown } from "./CartDropdown";
import { motion } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Rings", path: "/rings" },
    { name: "Necklaces", path: "/necklaces" },
    { name: "Earrings", path: "/earrings" },
  ];

  return (
    <>
   <Link href="/">
        <h1 className="text-2xl md:text-3xl font-bold text-white max-width-[200px]">
          <span className="text-[#d4af37]">Kin</span>Ultrapower
        </h1>
      </Link>
      <nav className="flex w-full items-end justify-end gap-4">

      <CartDropdown />
      </nav>
    </>
  );
};

export default Navbar;
