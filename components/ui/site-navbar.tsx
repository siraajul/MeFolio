"use client";

import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { useNavigation } from "@/hooks/use-navigation";

export function SiteNavBar() {
  const items = useNavigation();
  return <AnimeNavBar items={items} defaultActive="Home" />;
}
