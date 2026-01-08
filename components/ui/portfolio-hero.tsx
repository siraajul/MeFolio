"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown, Github, Linkedin, Mail, FileText, Play } from "lucide-react";
import { ParticleButton } from "@/components/ui/particle-button";
import VideoPlayer from "@/components/ui/video-player";
import { AnimatePresence, motion } from "framer-motion";

// Inline Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
        </span>
      ))}
    </p>
  );
};

interface SocialLink {
  platform: string;
  url: string;
}

interface PortfolioHeroProps {
  firstName: string;
  lastName: string;
  tagline: string;
  profileImageUrl: string;
  socialLinks: SocialLink[];
  cvVideo?: string;
}

export default function PortfolioHero({
  firstName = "SIRAJUL",
  lastName = "ISLAM",
  tagline = "Ensuring software reliability and quality through automation.",
  profileImageUrl,
  socialLinks = [],
  cvVideo,
}: PortfolioHeroProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("github")) return <Github className="w-6 h-6 md:w-7 md:h-7" />;
    if (p.includes("linkedin")) return <Linkedin className="w-6 h-6 md:w-7 md:h-7" />;
    if (p.includes("mail") || p.includes("email")) return <Mail className="w-6 h-6 md:w-7 md:h-7" />;
    return <FileText className="w-6 h-6 md:w-7 md:h-7" />;
  };

  return (
    <div 
      className="min-h-screen text-foreground transition-colors bg-[#FAFAFA] dark:bg-black text-[#1a1a1a] dark:text-white"
    >
      <main className="relative min-h-screen flex flex-col justify-center items-center pt-40 pb-20">
        {/* Centered Main Name */}
        <div className="relative w-full px-4 mb-12 sm:mb-16">
          <div className="relative text-center">
            <div>
              <BlurText
                text={firstName}
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[17vw] sm:text-[100px] md:text-[130px] lg:text-[180px] xl:text-[200px] 2xl:text-[260px] leading-[0.85] tracking-tighter 2xl:tracking-wide uppercase justify-center"
                style={{ color: "var(--brand)", fontFamily: "'Fira Code', monospace" }}
              />
            </div>
            <div>
              <BlurText
                text={lastName}
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[17vw] sm:text-[100px] md:text-[130px] lg:text-[180px] xl:text-[200px] 2xl:text-[260px] leading-[0.85] tracking-tighter 2xl:tracking-wide uppercase justify-center"
                style={{ color: "var(--brand)", fontFamily: "'Fira Code', monospace" }}
              />
            </div>

            {/* Profile Picture */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-[85px] h-[135px] sm:w-[120px] sm:h-[190px] md:w-[140px] md:h-[220px] lg:w-[160px] lg:h-[250px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer">
                <img
                  src={profileImageUrl || "https://i.postimg.cc/y8DnKLyK/albert-dera-ILip77-Sbm-OE-unsplash.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="relative w-full px-6 flex flex-col items-center gap-8">
          <div className="flex justify-center">
            <BlurText
              text={tagline}
              delay={150}
              animateBy="words"
              direction="top"
              className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white flex flex-wrap justify-center gap-[0.3em]"
              style={{ fontFamily: "'Antic', sans-serif" }}
            />
          </div>

          {/* Video CV Button */}
          <div className="flex justify-center">
             <button
                onClick={() => setIsVideoOpen(true)}
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-secondary/50 dark:bg-white/5 backdrop-blur-sm border border-border/50 dark:border-white/10 rounded-full hover:bg-secondary/80 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105"
             >
                <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center group-hover:bg-brand/30 transition-colors">
                   <Play className="w-4 h-4 text-brand fill-brand" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                   Watch Video CV
                </span>
             </button>
          </div>

            {/* Social Icons */}
            <div className="flex justify-center items-center gap-6">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors duration-300 transform hover:scale-110"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--brand)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                  }}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-300" />
        </button>

        <AnimatePresence>
           {isVideoOpen && (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
               onClick={() => setIsVideoOpen(false)}
             >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl"
                >
                   <button
                     onClick={() => setIsVideoOpen(false)}
                     className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
                   >
                      <X className="w-8 h-8" />
                   </button>
                   <VideoPlayer src={cvVideo || "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4"} />
                </motion.div>
             </motion.div>
           )}
        </AnimatePresence>
      </main>
    </div>
  );
}
