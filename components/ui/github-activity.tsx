"use client";

import React, { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { ExternalLink } from "lucide-react";

interface GitHubActivityProps {
  username?: string;
}

export function GitHubActivity({ username = "siraajul" }: GitHubActivityProps) {
  const { theme } = useTheme();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        const json = await response.json();
        // The API returns distinct years, we want the 'last' year or specifically 2024/2025?
        // Actually, 'last' gives the last 365 days usually in 'contributions' array if structure matches.
        // Let's check typical usage. The API returns { total: {}, contributions: [] } usually if query is right.
        // Or specific year. Let's try to just map the response structure if it's different.
        // Actually, react-activity-calendar expects Array<{ date: string, count: number, level: number }>.
        // The jogruber API returns { contributions: [ { date, count, level } ... ] } for 'last' year endpoints usually.
        
        if (json.contributions) {
           setData(json.contributions);
        } else {
           // Fallback or empty
           setData([]);
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
       <div className="w-full h-40 flex items-center justify-center bg-card/20 rounded-2xl animate-pulse">
         <p className="text-muted-foreground text-sm">Loading GitHub Activity...</p>
       </div>
    );
  }

  return (
    <section className="w-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-5xl p-8 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm shadow-xl relative overflow-hidden group">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-brand/10 rounded-lg">
               <svg 
                height="24" 
                aria-hidden="true" 
                viewBox="0 0 16 16" 
                version="1.1" 
                width="24" 
                fill="currentColor"
                className="text-brand"
               >
                 <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0 4.42 3.58 8 8 8Z"></path>
               </svg>
             </div>
             <h2 className="text-2xl font-bold uppercase tracking-tight">
               Code <span className="text-brand italic">Consistency</span>
             </h2>
          </div>
          
          <a 
            href={`https://github.com/${username}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand transition-colors"
          >
            @{username}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Calendar */}
        <div className="w-full flex justify-center overflow-x-auto pb-2 min-h-[140px]">
          {data && data.length > 0 ? (
            <ActivityCalendar 
              data={data}
              blockMargin={4}
              blockSize={14}
              fontSize={12}
              colorScheme={theme === "dark" ? "dark" : "light"}
              theme={{
                light: ["#ebedf0", "#fdcb9e", "#fcb07e", "#fa9053", "#FF6B00"],
                dark: ["#161b22", "#3d2211", "#703511", "#a64911", "#FF6B00"],
              }}
              labels={{
                  totalCount: '{{count}} contributions in the last year',
              }}
            />
          ) : (
             <p className="text-muted-foreground text-sm self-center">
               Unable to load GitHub activity.
             </p>
          )}
        </div>
        
        {/* Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand/10 blur-[100px] rounded-full pointer-events-none" />
      </div>
    </section>
  );
}
