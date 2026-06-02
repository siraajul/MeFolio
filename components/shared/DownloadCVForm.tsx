"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OTPVerification } from "@/components/ui/otp-verify";
import { LeadFormStep } from "@/components/shared/download-cv/LeadFormStep";
import { SuccessStep } from "@/components/shared/download-cv/SuccessStep";

interface DownloadCVFormProps {
  children: React.ReactNode;
}

type Step = "form" | "otp" | "success";

export function DownloadCVForm({ children }: DownloadCVFormProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  // Cooldown timer for resend
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setStep("form");
        setError("");
        setLoading(false);
        setCooldown(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSendOTP = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to send OTP");
          setLoading(false);
          return;
        }

        setStep("otp");
        setCooldown(60);
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData.email]
  );

  const handleVerifyOTP = useCallback(
    async (otpCode: string) => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            otp: otpCode,
            name: formData.name,
            company: formData.company,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Verification failed");
          setLoading(false);
          return;
        }

        // OTP verified — trigger download
        setStep("success");

        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Sirajul_SQA.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Close dialog after animation plays
        setTimeout(() => {
          setOpen(false);
          setFormData({ name: "", email: "", company: "" });
        }, 3500);
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  const handleResendOTP = useCallback(async () => {
    if (cooldown > 0) return;
    setError("");
    await handleSendOTP();
  }, [cooldown, handleSendOTP]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-0 border-0 bg-transparent overflow-hidden shadow-2xl [&>button]:text-white/60 [&>button]:hover:text-white [&>button]:z-20">
        <DialogTitle className="sr-only">Download CV</DialogTitle>
        <DialogDescription className="sr-only">Verify your email to download the resume</DialogDescription>
        <div className="relative w-full overflow-hidden rounded-2xl">
          {/* Shared dark background for all steps */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950" />
          <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF6B00] via-transparent to-transparent" />

          {/* Step 1: Lead form */}
          {step === "form" && (
            <LeadFormStep
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSendOTP}
              loading={loading}
              error={error}
            />
          )}

          {/* Step 2: OTP verification */}
          {step === "otp" && (
            <div className="relative z-10">
              {/* Back button */}
              <button
                onClick={() => {
                  setStep("form");
                  setError("");
                }}
                className="absolute top-4 left-4 z-20 flex items-center gap-1 text-white/50 hover:text-white text-xs transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
              <OTPVerification
                email={formData.email}
                onVerify={handleVerifyOTP}
                onResend={handleResendOTP}
                isLoading={loading}
                error={error}
                cooldown={cooldown}
              />
            </div>
          )}

          {/* Step 3: Success with animated checkmark */}
          {step === "success" && <SuccessStep />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
