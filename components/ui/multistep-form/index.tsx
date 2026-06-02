"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { steps, contentVariants, type FormData } from "./types";
import { PersonalStep } from "./steps/PersonalStep";
import { ProjectTypeStep } from "./steps/ProjectTypeStep";
import { QANeedsStep } from "./steps/QANeedsStep";
import { ToolsStep } from "./steps/ToolsStep";
import { TimelineStep } from "./steps/TimelineStep";
import { DetailsStep } from "./steps/DetailsStep";

// Steps in display order; the shell renders STEP_COMPONENTS[currentStep].
const STEP_COMPONENTS = [PersonalStep, ProjectTypeStep, QANeedsStep, ToolsStep, TimelineStep, DetailsStep];

/**
 * Multi-step "Book a QA Consultation" form.
 *
 * Answers accumulate in a single `FormData` object (no per-step submit). On the final step the
 * whole payload is POSTed to `/api/contact`, which validates it with Zod, rate-limits per IP,
 * and writes a `contactRequest` document to Sanity. `currentStep` indexes {@link steps}; each
 * step's fields live in ./steps/* and receive `formData` + updater callbacks.
 */
const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    platform: "",
    testingTypes: [],
    automationFramework: "",
    ciCdTools: "",
    timeline: "",
    budget: "",
    additionalInfo: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTestingType = (type: string) => {
    setFormData((prev) => {
      const types = [...prev.testingTypes];
      if (types.includes(type)) {
        return { ...prev, testingTypes: types.filter((t) => t !== type) };
      } else {
        return { ...prev, testingTypes: [...types, type] };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== "" && formData.email.trim() !== "";
      case 1:
        return formData.projectType !== "" && formData.platform !== "";
      case 2:
        return formData.testingTypes.length > 0;
      case 3:
        return formData.automationFramework !== "";
      case 4:
        return formData.timeline !== "";
      default:
        return true;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-auto py-8"
      >
        <Card className="border shadow-md rounded-3xl overflow-hidden bg-card/50 backdrop-blur-xl">
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            >
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Request Received!
            </h3>
            <p className="text-muted-foreground">
              Thanks for reaching out! I will review your QA requirements and get back to you shortly.
            </p>
          </div>
        </Card>
      </motion.div>
    );
  }

  const ActiveStep = STEP_COMPONENTS[currentStep];

  return (
    <div className="w-full max-w-lg mx-auto py-8">
      {/* Progress indicator */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <motion.div key={index} className="flex flex-col items-center flex-1">
              <motion.div
                className={cn(
                  "w-3 h-3 rounded-full transition-colors duration-300",
                  index < currentStep
                    ? "bg-brand"
                    : index === currentStep
                      ? "bg-brand ring-4 ring-brand/20"
                      : "bg-muted",
                )}
              />
              <motion.span
                className={cn(
                  "text-[10px] sm:text-xs mt-2 text-center",
                  index === currentStep
                    ? "text-brand font-medium"
                    : "text-muted-foreground hidden sm:block",
                )}
              >
                {step.title}
              </motion.span>
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-muted h-1 rounded-full overflow-hidden mt-4">
          <motion.div
            className="h-full bg-brand"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border shadow-md rounded-3xl overflow-hidden bg-card/50 backdrop-blur-xl">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                <ActiveStep
                  formData={formData}
                  updateFormData={updateFormData}
                  toggleTestingType={toggleTestingType}
                />
              </motion.div>
            </AnimatePresence>

            <CardFooter className="flex justify-between pt-6 pb-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="rounded-xl transition-all"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
                  disabled={!isStepValid() || isSubmitting}
                  className="rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 transition-all font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" /> Submitting...
                    </>
                  ) : (
                    <>
                      {currentStep === steps.length - 1 ? "Submit Request" : "Next Step"}
                      {currentStep === steps.length - 1 ? (
                        <Check className="h-4 w-4 ml-2" />
                      ) : (
                        <ChevronRight className="h-4 w-4 ml-1" />
                      )}
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingForm;
