import {
    Home,
    User,
    Code2,
    Briefcase,
    FolderOpen,
    GraduationCap,
    PenTool,
    Mail
} from "lucide-react";

export const NAV_ITEMS = [
    { name: "Home", url: "/", icon: Home },
    { name: "About", url: "/#about", icon: User },
    { name: "Skills", url: "/#skills", icon: Code2, hiddenOnMobile: true },
    { name: "Experience", url: "/#experience", icon: Briefcase, hiddenOnMobile: true },
    { name: "Projects", url: "/#projects", icon: FolderOpen },
    { name: "Education", url: "/#education", icon: GraduationCap, hiddenOnMobile: true },
    { name: "Writing", url: "/#writing", icon: PenTool, hiddenOnMobile: true },
    { name: "Contact", url: "/#contact", icon: Mail },
];

