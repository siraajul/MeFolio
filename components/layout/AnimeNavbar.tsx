"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLenis } from "@/components/ui/smooth-scroll"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  hiddenOnMobile?: boolean
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  defaultActive?: string
}

export function AnimeNavBar({ items, className, defaultActive = "Home" }: NavBarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>(defaultActive)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isManualScroll = React.useRef(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // Scroll Spy Logic
  useEffect(() => {
    if (!mounted) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            // Match / for home ID, or /#id for others
            const navItem = items.find((item) => {
                if (id === 'home') return item.url === '/';
                return item.url === `/#${id}`;
            })
            
            if (navItem) {
              setActiveTab(navItem.name)
              // Sync URL with active section
              const newHash = navItem.url === "/" ? "" : navItem.url.replace("/", "")
              if (typeof window !== "undefined" && window.history.replaceState) {
                  window.history.replaceState(null, "", window.location.pathname + newHash)
              }
            }
          }
        })
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    )

    items.forEach((item) => {
      // Observe targets if they exist (handling / for home)
      let id = "";
      if (item.url === "/") {
          id = "home";
      } else if (item.url.startsWith("/#")) {
          id = item.url.replace("/#", "");
      }

      if (id) {
        const element = document.getElementById(id)
        if (element) {
          observer.observe(element)
        }
      }
    })

    return () => {
       observer.disconnect()
       if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, JSON.stringify(items), pathname])

  const lenis = useLenis()

  const handleLinkClick = (name: string, url: string, e: React.MouseEvent) => {
    setActiveTab(name)
    setHoveredTab(null)

    // Handle smooth scrolling only if we are on the home page and link is an anchor or root
    const isHomePage = pathname === "/" || pathname === "";
    const isAnchor = url.startsWith("/#") || url === "/";

    if (isHomePage && isAnchor) {
      e.preventDefault()
      // Determine target ID
      let targetId = "";
      if (url === "/") {
          targetId = "home";
      } else {
          targetId = url.replace("/#", "");
      }

      const element = document.getElementById(targetId)
      
      if (element) {
        if (lenis) {
          lenis.scrollTo(element, { offset: 0 })
        } else {
          // Fallback if Lenis isn't ready or available
          element.scrollIntoView({ behavior: "smooth" })
        }
        
        // Update URL immediately on click for better responsiveness
        const newHash = url === "/" ? "" : url.replace("/", "");
        if (typeof window !== "undefined" && window.history.replaceState) {
            window.history.replaceState(null, "", window.location.pathname + newHash)
        }
      }
    }
    
    // Disable scroll spy temporarily
    isManualScroll.current = true
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      isManualScroll.current = false
    }, 1000)
  }

  if (!mounted) return null

  return (
    <div className="fixed top-5 left-0 right-0 z-[9999]">
      <div className="flex justify-center pt-6">
        <motion.div 
          className="flex items-center gap-3 bg-black/50 border border-white/10 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg relative"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const isHovered = hoveredTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={(e) => handleLinkClick(item.name, item.url, e)}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                  "text-white/70 hover:text-white",
                  isActive && "text-white",
                  item.hiddenOnMobile && "hidden md:flex"
                )}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                    <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                    <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                    <div className="absolute inset-[-12px] bg-primary/5 rounded-full blur-3xl" />
                    
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                      style={{
                        animation: "shine 3s ease-in-out infinite"
                      }}
                    />
                  </motion.div>
                )}

                <motion.span
                  className="hidden md:inline relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
                <motion.span 
                  className="md:hidden relative z-10"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </motion.span>
          
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    />
                  )}
                </AnimatePresence>


              </Link>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
