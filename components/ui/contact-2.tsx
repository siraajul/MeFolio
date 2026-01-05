import React from "react";

import { Button } from "@/components/ui/button";
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
    <section className="py-24 px-6 min-h-screen flex flex-col justify-center bg-white dark:bg-neutral-950">
      <div className="container mx-auto">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-bold uppercase tracking-tight text-foreground lg:mb-1 lg:text-6xl">
                Contact <span className="text-brand italic">Me</span>
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left text-foreground">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc text-muted-foreground">
                <li>
                  <span className="font-bold text-foreground">Phone: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold text-foreground">Email: </span>
                  <a href={`mailto:${email}`} className="underline hover:text-brand">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold text-foreground">Social: </span>
                  <a href={web.url} target="_blank" className="underline hover:text-brand">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-screen-md flex-col gap-6 rounded-3xl border border-border/50 p-10 shadow-xl bg-card/30 backdrop-blur-sm">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">First Name</Label>
                <Input type="text" id="firstname" placeholder="First Name" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">Last Name</Label>
                <Input type="text" id="lastname" placeholder="Last Name" />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input type="text" id="subject" placeholder="Subject" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea placeholder="Type your message here." id="message" className="min-h-[120px]" />
            </div>
            <Button className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-bold">Send Message</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
