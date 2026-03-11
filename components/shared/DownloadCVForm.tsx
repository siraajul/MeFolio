"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Loader2, Mail, Zap, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OTPVerification } from "@/components/ui/otp-verify";

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
            <div className="relative z-10 p-6 py-10">
              <div className="text-center mb-6">
                <div className="w-8 h-8 mx-auto mb-5 text-[#FF6B00]">
                  <Zap className="w-full h-full" fill="currentColor" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Download CV
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  Please provide your details. I will send a
                  <br />
                  verification code to your email.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
                  {error}
                </div>
              )}

              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <label className="block text-white/60 text-xs font-medium mb-1.5 ml-1">
                    Name
                  </label>
                  <input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white text-sm placeholder-white/30 focus:bg-white/15 focus:border-[#FF6B00]/50 focus:ring-1 focus:ring-[#FF6B00]/30 focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-medium mb-1.5 ml-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white text-sm placeholder-white/30 focus:bg-white/15 focus:border-[#FF6B00]/50 focus:ring-1 focus:ring-[#FF6B00]/30 focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-medium mb-1.5 ml-1">
                    Company <span className="text-white/30">(Optional)</span>
                  </label>
                  <input
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white text-sm placeholder-white/30 focus:bg-white/15 focus:border-[#FF6B00]/50 focus:ring-1 focus:ring-[#FF6B00]/30 focus:outline-none transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6B00] hover:bg-[#FF7A1A] text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending Code...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      Send Verification Code
                    </>
                  )}
                </button>
              </form>
            </div>
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
          {step === "success" && (
            <div className="relative z-10 p-6 py-14 flex flex-col items-center">
              {/* Animated checkmark */}
              <div className="relative mb-6">
                <svg
                  className="w-20 h-20 animate-[scaleIn_0.4s_ease-out]"
                  viewBox="0 0 80 80"
                >
                  {/* Circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="animate-[circleStroke_0.6s_ease-out_forwards]"
                    style={{
                      strokeDasharray: 226,
                      strokeDashoffset: 226,
                    }}
                  />
                  {/* Checkmark */}
                  <path
                    d="M24 42 L35 53 L56 28"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-[checkStroke_0.4s_ease-out_0.5s_forwards]"
                    style={{
                      strokeDasharray: 50,
                      strokeDashoffset: 50,
                    }}
                  />
                </svg>
                {/* Glow effect */}
                <div className="absolute inset-0 w-20 h-20 rounded-full bg-green-500/20 blur-xl animate-[pulseGlow_2s_ease-in-out_infinite]" />
              </div>

              <h2 className="text-xl font-semibold text-white mb-2 animate-[fadeUp_0.5s_ease-out_0.6s_both]">
                Download Started!
              </h2>
              <p className="text-white/60 text-sm text-center leading-relaxed animate-[fadeUp_0.5s_ease-out_0.8s_both]">
                Your email has been verified successfully.
                <br />
                The resume download should begin automatically.
              </p>
              <a
                href="/resume.pdf"
                download="Sirajul_SQA.pdf"
                className="mt-4 text-[#FF6B00]/80 hover:text-[#FF6B00] text-sm font-medium transition-colors underline underline-offset-2 animate-[fadeUp_0.5s_ease-out_1s_both]"
              >
                Click here if download didn&apos;t start
              </a>
            </div>
          )}
        </div>

        {/* Inline keyframe styles for animations */}
        <style>{`
          @keyframes scaleIn {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes circleStroke {
            to { stroke-dashoffset: 0; }
          }
          @keyframes checkStroke {
            to { stroke-dashoffset: 0; }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
