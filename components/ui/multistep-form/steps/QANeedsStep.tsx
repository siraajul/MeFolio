"use client";

import { motion } from "framer-motion";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { fadeInUp, type StepProps } from "../types";

const TESTING_TYPES = [
  "Manual Testing",
  "Test Automation",
  "API / Backend Testing",
  "Performance / Load Testing",
  "Security / Pen Testing",
  "Accessibility (a11y)",
  "Mobile Device Farm",
  "CI/CD Integration",
];

/** Step 3 — multi-select of required testing services. */
export function QANeedsStep({ formData, toggleTestingType }: StepProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>QA Requirements</CardTitle>
        <CardDescription>Select all testing services you require</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div variants={fadeInUp} className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TESTING_TYPES.map((type, index) => (
              <motion.div
                key={type}
                className={cn(
                  "flex items-center space-x-3 rounded-xl border p-3 cursor-pointer transition-colors",
                  formData.testingTypes.includes(type) ? "bg-brand/5 border-brand/30" : "hover:bg-muted/50"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.05 * index } }}
                onClick={() => toggleTestingType(type)}
              >
                <Checkbox
                  id={`tt-${index}`}
                  checked={formData.testingTypes.includes(type)}
                  onCheckedChange={() => toggleTestingType(type)}
                  className="border-brand data-[state=checked]:bg-brand data-[state=checked]:text-black"
                />
                <Label htmlFor={`tt-${index}`} className="cursor-pointer w-full font-normal">
                  {type}
                </Label>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </CardContent>
    </>
  );
}
