"use client";

import { motion } from "framer-motion";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { fadeInUp, type StepProps } from "../types";

const FRAMEWORKS = [
  { value: "cypress", label: "Cypress" },
  { value: "playwright", label: "Playwright" },
  { value: "selenium", label: "Selenium" },
  { value: "appium", label: "Appium (Mobile)" },
  { value: "robot", label: "Robot Framework" },
  { value: "open", label: "Open to suggestions" },
];

/** Step 4 — preferred automation framework and current CI/CD tooling. */
export function ToolsStep({ formData, updateFormData }: StepProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Tech Stack & Tools</CardTitle>
        <CardDescription>What tools does your team currently use?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label>Preferred Automation Framework</Label>
          <RadioGroup
            value={formData.automationFramework}
            onValueChange={(value) => updateFormData("automationFramework", value)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            {FRAMEWORKS.map((fw, index) => (
              <motion.div
                key={fw.value}
                className="flex items-center space-x-2 rounded-xl border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.05 * index } }}
              >
                <RadioGroupItem value={fw.value} id={`fw-${index}`} className="border-brand text-brand" />
                <Label htmlFor={`fw-${index}`} className="cursor-pointer w-full font-normal">
                  {fw.label}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-2 mt-4">
          <Label htmlFor="cicd">CI/CD & Test Management Tools</Label>
          <Textarea
            id="cicd"
            placeholder="e.g., GitHub Actions, Jenkins, Jira, TestRail, Jira Xray..."
            value={formData.ciCdTools}
            onChange={(e) => updateFormData("ciCdTools", e.target.value)}
            className="min-h-[80px] bg-background/50 transition-all duration-300 focus:ring-2 focus:ring-brand/20 focus:border-brand"
          />
        </motion.div>
      </CardContent>
    </>
  );
}
