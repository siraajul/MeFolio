"use client";

import { useState, useEffect } from "react";
import { MoveRight, ArrowLeft, ArrowRight } from "lucide-react"; 
import { ParticleButton } from "@/components/ui/particle-button";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SupportKori } from "@/components/ui/support-kori";

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  image?: string;
  link: string;
}

interface BlogProps {
  posts: BlogPost[];
}

export const Blog = ({ posts }: BlogProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < posts.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Calculate visible posts based on simple slicing might break animation continuity if we want smooth slide
  // But for a simple effective carousel, we can just slide the "view"
  // Let's us translateX logic.

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + itemsPerPage >= posts.length;

  return (
    <div className="w-full py-16 lg:py-24">
      <div className="container mx-auto flex flex-col gap-10 px-4 md:px-8">
        
        {/* Header */}
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
          <div className="flex flex-col gap-2">
             <h4 className="text-3xl md:text-5xl tracking-tighter font-bold uppercase">
              Latest <span className="text-brand italic">Articles</span>
            </h4>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg">
              Insights, thoughts, and tutorials on web development and design.
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-4">
             <button
              onClick={prevSlide}
              disabled={isPrevDisabled}
              className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous posts"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
             <button
              onClick={nextSlide}
              disabled={isNextDisabled}
              className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next posts"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
             <Link href="/blog">
               <ParticleButton className="hidden md:flex gap-2 bg-brand text-brand-foreground hover:bg-brand/90 font-bold ml-4">
                  View all <MoveRight className="w-4 h-4" />
                </ParticleButton>
             </Link>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden w-full relative">
            <motion.div 
               className="flex gap-6 will-change-transform"
               initial={false}
               animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }} // Move by percentage of container width? No, simpler to just assume equal width + gap consideration
               // The gap handling in percent-based transform is tricky.
               // Let's try explicit width calculation logic or simpler grid animation.
               // Actually, flexible implementation:
               // 100/itemsPerPage % width for each item.
               // But we have gap-6 (24px).
               // Let's use standard calc approach.
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {posts.map((post) => {
                 // Calculate width percentage based on itemsPerPage
                 // subtract gap space from width? 
                 // Easier approach: flex-shrink-0 style={{ width: `calc((100% - ${(itemsPerPage - 1) * 24}px) / ${itemsPerPage})` }}
                 return (
                  <motion.div 
                    key={post.id}
                    className="flex-shrink-0"
                    style={{ 
                      width: `calc((100% - ${(itemsPerPage - 1) * 24}px) / ${itemsPerPage})` 
                    }}
                  >
                    <Link 
                      href={post.link} 
                      className="flex flex-col gap-4 group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-4 transition-all duration-300 hover:shadow-xl hover:border-brand/50 h-full"
                    >
                      <div className="bg-muted rounded-2xl aspect-video overflow-hidden relative w-full">
                        {post.image ? (
                            <Image 
                              src={post.image} 
                              alt={post.title} 
                              fill 
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />
                        )}
                      </div>
                      <div className="flex flex-col gap-2 px-1 pb-2">
                        <h3 className="text-xl font-bold tracking-tight group-hover:text-brand transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                 );
              })}
            </motion.div>
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden w-full flex justify-center mt-4">
           <Link href="/blog">
             <ParticleButton className="gap-2 bg-brand text-brand-foreground hover:bg-brand/90 font-bold">
                View all articles <MoveRight className="w-4 h-4" />
              </ParticleButton>
           </Link>
        </div>

        {/* Support Kori Section */}
        <SupportKori className="mt-20" />

      </div>
    </div>
  );
};
