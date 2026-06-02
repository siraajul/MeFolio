// Shared types, step config, and animation variants for the multi-step consultation form.

export interface FormData {
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

/** Ordered steps; `currentStep` indexes this array. */
export const steps = [
  { id: "personal", title: "Personal" },
  { id: "project", title: "Project Type" },
  { id: "testing", title: "QA Needs" },
  { id: "tools", title: "Tools" },
  { id: "timeline", title: "Timeline" },
  { id: "details", title: "Details" },
];

/** Per-field reveal animation, shared by every step's inputs. */
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

/** Slide transition between steps (used by the shell's AnimatePresence). */
export const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

/** Props passed to every step component. Steps destructure only what they use. */
export interface StepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  toggleTestingType: (type: string) => void;
}
