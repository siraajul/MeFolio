import React from "react";

import { ParticleButton } from "@/components/ui/particle-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

export const Contact2 = ({
  title = "Get in Touch",
  description = "I am available for questions, feedback, or collaboration opportunities. Let me know how I can help!",
  phone = "+1 (555) 000-0000",
  email = "hello@example.com",
  web = { label: "linkedin.com/in/sqa-engineer", url: "#" },
}: Contact2Props) => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-6 flex flex-col justify-center bg-white dark:bg-neutral-950">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-5xl md:text-6xl font-black uppercase tracking-tighter text-foreground">
          Contact <span className="text-brand italic">Me</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
           {/* Email */}
           <a 
             href={`mailto:${email}`}
             className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border/50 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 w-full md:w-64 group"
           >
             <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
             </div>
             <div>
               <h3 className="font-bold text-foreground">Email</h3>
               <p className="text-sm text-muted-foreground/80 mt-1">{email}</p>
             </div>
           </a>

           {/* Phone */}
           <a 
             href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
             className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border/50 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 w-full md:w-64 group"
           >
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Phone</h3>
                <p className="text-sm text-muted-foreground/80 mt-1">{phone}</p>
              </div>
           </a>

           {/* Social */}
           <a 
             href={web.url}
             target="_blank"
             rel="noreferrer"
             className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border/50 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 w-full md:w-64 group"
           >
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Social</h3>
                <p className="text-sm text-muted-foreground/80 mt-1">Connect</p>
              </div>
           </a>
        </div>
      </div>
    </section>
  );
};
