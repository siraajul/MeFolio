"use client";

import { motion } from "framer-motion";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fadeInUp, type StepProps } from "../types";

const START_OPTIONS = [
  { value: "immediate", label: "Immediately (ASAP)" },
  { value: "2weeks", label: "Within 2 weeks" },
  { value: "1month", label: "Within 1 month" },
  { value: "flexible", label: "Flexible / Planning Phase" },
];

const PACKAGES = [
  { value: "starter_reality_check", title: "Starter Reality Check", price: "$299", desc: "One hour. Brutal clarity. See exactly what's broken." },
  { value: "growth_fix", title: "Growth Fix", price: "$999", desc: "Deep product + QA correction. Systems rebuilt. Results follow.", popular: true },
  { value: "serious_scale", title: "Serious Scale", price: "$2,499", desc: "Full strategy. Clean execution. No more chaos. Only progress." },
  { value: "custom", title: "Custom Need / Retainer", price: "Flexible", desc: "Looking for an ongoing QA partner or custom enterprise strategy." },
];

/** Step 5 — desired start window and QA strategy package. */
export function TimelineStep({ formData, updateFormData }: StepProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Timeline & Budget</CardTitle>
        <CardDescription>When do you need to start and what is the scope?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label>When are you looking to start?</Label>
          <RadioGroup
            value={formData.timeline}
            onValueChange={(value) => updateFormData("timeline", value)}
            className="space-y-2"
          >
            {START_OPTIONS.map((time, index) => (
              <motion.div
                key={time.value}
                className="flex items-center space-x-2 rounded-xl border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.1 * index } }}
              >
                <RadioGroupItem value={time.value} id={`time-${index}`} className="border-brand text-brand" />
                <Label htmlFor={`time-${index}`} className="cursor-pointer w-full font-normal">
                  {time.label}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-4 pt-4">
          <Label>Which QA Strategy Package Fits Your Needs?</Label>
          <RadioGroup
            value={formData.budget}
            onValueChange={(value) => updateFormData("budget", value)}
            className="flex flex-col gap-3"
          >
            {PACKAGES.map((pkg, idx) => (
              <motion.div
                key={pkg.value}
                className={`relative flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.budget === pkg.value
                    ? "border-brand bg-brand/5 shadow-[0_0_20px_rgba(255,107,0,0.1)]"
                    : "border-border/50 bg-background/50 hover:bg-muted/50 hover:border-border"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.1 * idx } }}
                onClick={() => updateFormData("budget", pkg.value)}
              >
                {pkg.popular && (
                  <div className="absolute -top-2.5 right-4 bg-brand text-brand-foreground text-[10px] uppercase font-bold px-2 py-0.5 rounded-full z-10">
                    Popular
                  </div>
                )}
                <div className="flex items-center gap-4 flex-1">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    formData.budget === pkg.value ? "border-brand bg-brand" : "border-muted-foreground"
                  }`}>
                    {formData.budget === pkg.value && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <RadioGroupItem value={pkg.value} id={`pkg-${pkg.value}`} className="hidden" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 sm:gap-4">
                    <div className="space-y-1">
                      <Label htmlFor={`pkg-${pkg.value}`} className="font-bold text-sm sm:text-base cursor-pointer">
                        {pkg.title}
                      </Label>
                      <p className="text-xs text-muted-foreground mr-2 leading-relaxed">
                        {pkg.desc}
                      </p>
                    </div>
                    <div className="text-base sm:text-lg font-black text-brand shrink-0">
                      {pkg.price}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </RadioGroup>
        </motion.div>
      </CardContent>
    </>
  );
}
