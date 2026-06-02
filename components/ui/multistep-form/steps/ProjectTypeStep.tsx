"use client";

import { motion } from "framer-motion";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fadeInUp, type StepProps } from "../types";

const PROJECT_STAGES = [
  { value: "new", label: "New Project (Pre-launch)" },
  { value: "existing", label: "Existing Product (Maintenance)" },
  { value: "migration", label: "Major Migration / Rewrite" },
  { value: "audit", label: "One-time QA Audit" },
];

/** Step 2 — project stage (radio) and target platform (select). */
export function ProjectTypeStep({ formData, updateFormData }: StepProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Project Type</CardTitle>
        <CardDescription>What kind of product needs testing?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label>What is the current stage of the project?</Label>
          <RadioGroup
            value={formData.projectType}
            onValueChange={(value) => updateFormData("projectType", value)}
            className="space-y-2"
          >
            {PROJECT_STAGES.map((type, index) => (
              <motion.div
                key={type.value}
                className="flex items-center space-x-2 rounded-xl border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.1 * index } }}
              >
                <RadioGroupItem value={type.value} id={`type-${index}`} className="border-brand text-brand" />
                <Label htmlFor={`type-${index}`} className="cursor-pointer w-full font-normal">
                  {type.label}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-2 mt-6">
          <Label>Primary Target Platform</Label>
          <Select
            value={formData.platform}
            onValueChange={(value) => updateFormData("platform", value)}
          >
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web">Web Application</SelectItem>
              <SelectItem value="mobile-ios">Mobile App (iOS)</SelectItem>
              <SelectItem value="mobile-android">Mobile App (Android)</SelectItem>
              <SelectItem value="cross-platform">Cross-Platform (Web + Mobile)</SelectItem>
              <SelectItem value="api">Backend API Services</SelectItem>
              <SelectItem value="desktop">Desktop Application</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </CardContent>
    </>
  );
}
