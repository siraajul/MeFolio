"use client";
import React from "react";
import Link from "next/link";
import {
  NotepadTextDashed,
  Twitter,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const Footer = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <footer className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <div className="border-t bg-background mt-0 relative">
        <div className="max-w-7xl flex flex-col justify-end mx-auto min-h-[15rem] sm:min-h-[20rem] md:min-h-[25rem] relative p-4 pb-10 pt-20">
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1">
                {/* Branding and description removed as per user request */}
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-3 gap-4">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-6 h-6 hover:scale-110 duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground max-w-full px-4">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="hover:text-foreground duration-300 hover:font-semibold"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 md:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0">
            <p className="text-base text-muted-foreground text-center md:text-left">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <Link
                  href={creatorUrl}
                  target="_blank"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors duration-300 hover:font-medium"
                >
                  Crafted by {creatorName}
                </Link>
              </nav>
            )}
          </div>
        </div>

        {/* Large background text - FIXED */}
        <div 
          className="bg-gradient-to-b from-foreground/20 via-foreground/10 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 top-10 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4 whitespace-nowrap"
          style={{
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            maxWidth: '95vw'
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Bottom logo */}
        {brandIcon && (
          <div className="absolute hover:border-foreground duration-400 drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_0px_20px_rgba(255,255,255,0.3)] bottom-24 md:bottom-20 backdrop-blur-sm rounded-3xl bg-background/60 left-1/2 border-2 border-border flex items-center justify-center p-3 -translate-x-1/2 z-10">
            <div className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-br from-foreground to-foreground/80 rounded-2xl flex items-center justify-center shadow-lg">
              {brandIcon}
            </div>
          </div>
        )}

        {/* Bottom line */}
        <div className="absolute bottom-16 sm:bottom-20 backdrop-blur-sm h-1 bg-gradient-to-r from-transparent via-border to-transparent w-full left-1/2 -translate-x-1/2"></div>

        {/* Bottom shadow */}
        <div className="bg-gradient-to-t from-background via-background/80 blur-[1em] to-background/40 absolute bottom-12 w-full h-24"></div>
      </div>
    </footer>
  );
};
