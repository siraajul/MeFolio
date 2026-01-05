"use client";

import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { 
  Home, 
  User, 
  Code2, 
  Briefcase, 
  FolderOpen, 
  GraduationCap, 
  PenTool, 
  Mail, 
  FileText 
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", url: "#home", icon: Home },
  { name: "About", url: "#about", icon: User },
  { name: "Skills", url: "#skills", icon: Code2 },
  { name: "Experience", url: "#experience", icon: Briefcase },
  { name: "Projects", url: "#projects", icon: FolderOpen },
  { name: "Education", url: "#education", icon: GraduationCap },
  { name: "Writing", url: "#writing", icon: PenTool },
  { name: "Contact", url: "#contact", icon: Mail },
  { name: "Resume", url: "/resume.pdf", icon: FileText },
];

export function SiteNavBar() {
  return <AnimeNavBar items={NAV_ITEMS} defaultActive="Home" />;
}
