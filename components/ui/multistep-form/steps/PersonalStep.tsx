"use client";

import { motion } from "framer-motion";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fadeInUp, type StepProps } from "../types";

/** Step 1 — name, email, optional company. */
export function PersonalStep({ formData, updateFormData }: StepProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Contact Details</CardTitle>
        <CardDescription>Let&apos;s start with some basic information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            className="bg-background/50 transition-all duration-300 focus:ring-2 focus:ring-brand/20 focus:border-brand"
          />
        </motion.div>
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className="bg-background/50 transition-all duration-300 focus:ring-2 focus:ring-brand/20 focus:border-brand"
          />
        </motion.div>
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label htmlFor="company">Company (Optional)</Label>
          <Input
            id="company"
            placeholder="Your Company Name"
            value={formData.company}
            onChange={(e) => updateFormData("company", e.target.value)}
            className="bg-background/50 transition-all duration-300 focus:ring-2 focus:ring-brand/20 focus:border-brand"
          />
        </motion.div>
      </CardContent>
    </>
  );
}
