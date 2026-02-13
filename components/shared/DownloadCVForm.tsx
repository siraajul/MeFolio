"use client";

import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DownloadCVFormProps {
  children: React.ReactNode;
}

export function DownloadCVForm({ children }: DownloadCVFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Trigger download immediately (to avoid browser blocking)
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Sirajul_SQA.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Submit data (Fire and forget, or handle silently)
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // We don't alert the user because they already got the file
    } finally {
      setLoading(false);
      setOpen(false);
      setFormData({ name: "", email: "", company: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Download CV</DialogTitle>
          <DialogDescription>
            Please provide your details to download the complete CV.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="name" className="text-left sm:text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Your Name"
              className="col-span-1 sm:col-span-3"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="email" className="text-left sm:text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="col-span-1 sm:col-span-3"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            <Label htmlFor="company" className="text-left sm:text-right">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              placeholder="Company Name (Optional)"
              className="col-span-1 sm:col-span-3"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download Now
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
