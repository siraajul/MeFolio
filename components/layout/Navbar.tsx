"use client";

import { AnimeNavBar } from "@/components/layout/AnimeNavbar";
import { NAV_ITEMS } from "@/hooks/use-navigation";

export function Navbar() {
  return <AnimeNavBar items={NAV_ITEMS} defaultActive="Home" />;
}
