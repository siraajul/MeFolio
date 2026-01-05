"use client";
import { MoveRight } from "lucide-react";
import { ParticleButton } from "@/components/ui/particle-button";
import Image from "next/image";
import Link from "next/link";

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

export const Blog = ({ posts }: BlogProps) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto flex flex-col gap-14 px-4 md:px-8">
      <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
        <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-bold uppercase">
          Latest <span className="text-brand italic">Articles</span>
        </h4>
        <ParticleButton className="gap-4 bg-brand text-brand-foreground hover:bg-brand/90 font-bold">
          View all articles <MoveRight className="w-4 h-4" />
        </ParticleButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {posts.map((post) => (
          <Link 
            href={post.link} 
            key={post.id}
            className="flex flex-col gap-2 hover:opacity-75 cursor-pointer group"
          >
            <div className="bg-muted rounded-2xl aspect-video mb-4 overflow-hidden relative">
               {post.image ? (
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
               ) : (
                 <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />
               )}
            </div>
            <h3 className="text-xl font-bold tracking-tight">{post.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {post.summary}
            </p>
          </Link>
        ))}
      </div>
    </div>
  </div>
);
