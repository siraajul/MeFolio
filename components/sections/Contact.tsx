"use client";

import React, { useEffect } from "react";
import OnboardingForm from "@/components/ui/multistep-form";
import posthog from "posthog-js";

interface ContactProps {
  title?: string;
  description?: string;
}

export const Contact = ({
  title = "Hire QA Expert",
  description = "Ready to elevate your product's quality? Tell me about your project, and let's design a robust testing strategy that prevents bugs and accelerates your releases.",
}: ContactProps) => {
  useEffect(() => {
    posthog.capture("view_contact_section");
  }, []);
  return (
    <section id="contact" className="py-24 md:py-32 px-4 md:px-6 flex flex-col justify-center bg-white dark:bg-neutral-950">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-5xl md:text-6xl font-black uppercase tracking-tighter text-foreground">
          {title.split(" ")[0]} <span className="text-brand italic">{title.split(" ").slice(1).join(" ")}</span>
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          {description}
        </p>

        <div className="mt-8 text-left">
          <OnboardingForm />
        </div>
      </div>
    </section>
  );
};
