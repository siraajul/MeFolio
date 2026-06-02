"use client";

import { motion } from "framer-motion";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fadeInUp, type StepProps } from "../types";

/** Step 6 — free-text project overview. */
export function DetailsStep({ formData, updateFormData }: StepProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>
          Give me a brief overview of the project and your main challenges.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label htmlFor="additionalInfo" className="sr-only">Project Details</Label>
          <Textarea
            id="additionalInfo"
            placeholder="What is the app about? Are you facing frequent bugs? Need better test coverage? Tell me a bit about the current team..."
            value={formData.additionalInfo}
            onChange={(e) => updateFormData("additionalInfo", e.target.value)}
            className="min-h-[160px] resize-none bg-background/50 transition-all duration-300 focus:ring-2 focus:ring-brand/20 focus:border-brand"
          />
        </motion.div>
      </CardContent>
    </>
  );
}
