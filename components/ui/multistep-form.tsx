"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const steps = [
  { id: "personal", title: "Personal" },
  { id: "project", title: "Project Type" },
  { id: "testing", title: "QA Needs" },
  { id: "tools", title: "Tools" },
  { id: "timeline", title: "Timeline" },
  { id: "details", title: "Details" },
];

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  platform: string;
  testingTypes: string[];
  automationFramework: string;
  ciCdTools: string;
  timeline: string;
  budget: string;
  additionalInfo: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

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
            <motion.div
              key={index}
              className="flex flex-col items-center flex-1"
            >
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
                {/* Step 1: Personal Info */}
                {currentStep === 0 && (
                  <>
                    <CardHeader>
                      <CardTitle>Contact Details</CardTitle>
                      <CardDescription>
                        Let&apos;s start with some basic information
                      </CardDescription>
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
                )}

                {/* Step 2: Project Type */}
                {currentStep === 1 && (
                  <>
                    <CardHeader>
                      <CardTitle>Project Type</CardTitle>
                      <CardDescription>
                        What kind of product needs testing?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>What is the current stage of the project?</Label>
                        <RadioGroup
                          value={formData.projectType}
                          onValueChange={(value) => updateFormData("projectType", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "new", label: "New Project (Pre-launch)" },
                            { value: "existing", label: "Existing Product (Maintenance)" },
                            { value: "migration", label: "Major Migration / Rewrite" },
                            { value: "audit", label: "One-time QA Audit" },
                          ].map((type, index) => (
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
                )}

                {/* Step 3: QA Needs */}
                {currentStep === 2 && (
                  <>
                    <CardHeader>
                      <CardTitle>QA Requirements</CardTitle>
                      <CardDescription>
                        Select all testing services you require
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            "Manual Testing",
                            "Test Automation",
                            "API / Backend Testing",
                            "Performance / Load Testing",
                            "Security / Pen Testing",
                            "Accessibility (a11y)",
                            "Mobile Device Farm",
                            "CI/CD Integration",
                          ].map((type, index) => (
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
                )}

                {/* Step 4: Tools & Stack */}
                {currentStep === 3 && (
                  <>
                    <CardHeader>
                      <CardTitle>Tech Stack & Tools</CardTitle>
                      <CardDescription>
                        What tools does your team currently use?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Preferred Automation Framework</Label>
                        <RadioGroup
                          value={formData.automationFramework}
                          onValueChange={(value) => updateFormData("automationFramework", value)}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                        >
                          {[
                            { value: "cypress", label: "Cypress" },
                            { value: "playwright", label: "Playwright" },
                            { value: "selenium", label: "Selenium" },
                            { value: "appium", label: "Appium (Mobile)" },
                            { value: "robot", label: "Robot Framework" },
                            { value: "open", label: "Open to suggestions" },
                          ].map((fw, index) => (
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
                )}

                {/* Step 5: Timeline & Budget */}
                {currentStep === 4 && (
                  <>
                    <CardHeader>
                      <CardTitle>Timeline & Budget</CardTitle>
                      <CardDescription>
                        When do you need to start and what is the scope?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>When are you looking to start?</Label>
                        <RadioGroup
                          value={formData.timeline}
                          onValueChange={(value) => updateFormData("timeline", value)}
                          className="space-y-2"
                        >
                          {[
                            { value: "immediate", label: "Immediately (ASAP)" },
                            { value: "2weeks", label: "Within 2 weeks" },
                            { value: "1month", label: "Within 1 month" },
                            { value: "flexible", label: "Flexible / Planning Phase" },
                          ].map((time, index) => (
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

                      <motion.div variants={fadeInUp} className="space-y-2 mt-4">
                        <Label htmlFor="budget">Which QA Strategy Package Fits Your Needs?</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => updateFormData("budget", value)}
                        >
                          <SelectTrigger id="budget" className="bg-background/50">
                            <SelectValue placeholder="Select a range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="starter_reality_check">Starter Reality Check - $299</SelectItem>
                            <SelectItem value="growth_fix">Growth Fix - $999</SelectItem>
                            <SelectItem value="serious_scale">Serious Scale - $2,499</SelectItem>
                            <SelectItem value="custom">Custom Need / Retainer</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 6: Additional Details */}
                {currentStep === 5 && (
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
                )}
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
