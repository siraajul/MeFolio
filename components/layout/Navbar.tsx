"use client";

import { AnimeNavBar } from "@/components/layout/AnimeNavbar";
import { useNavigation } from "@/hooks/use-navigation";

export function Navbar() {
  const items = useNavigation();
  return <AnimeNavBar items={items} defaultActive="Home" />;
}
