"use client";

import React from "react";
import { Mail, Phone, Linkedin } from "lucide-react";

interface ContactProps {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

export const Contact = ({
  title = "Get in Touch",
  description = "I am available for questions, feedback, or collaboration opportunities. Let me know how I can help!",
  phone = "+1 (555) 000-0000",
  email = "hello@example.com",
  web = { label: "linkedin.com/in/sqa-engineer", url: "#" },
}: ContactProps) => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-6 flex flex-col justify-center bg-white dark:bg-neutral-950">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-5xl md:text-6xl font-black uppercase tracking-tighter text-foreground">
          Contact <span className="text-brand italic">Me</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-3xl mx-auto">
           {/* Email */}
           <a 
             href={`mailto:${email}`}
             className="flex flex-col items-center justify-center gap-3 p-4 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 w-full h-full group"
           >
             <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
               <Mail className="w-6 h-6" />
             </div>
             <div>
               <h3 className="font-bold text-foreground">Email</h3>
               <p className="text-sm text-muted-foreground/80 mt-1 break-all md:break-normal">{email}</p>
             </div>
           </a>

           {/* Phone */}
           <a 
             href={`tel:${(phone || "").replace(/[^0-9+]/g, '')}`}
             className="flex flex-col items-center justify-center gap-3 p-4 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 w-full h-full group"
           >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
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
             className="col-span-2 flex flex-col items-center justify-center gap-3 p-4 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 w-full h-full group"
           >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                <Linkedin className="w-6 h-6" />
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
