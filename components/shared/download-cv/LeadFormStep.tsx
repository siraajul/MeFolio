"use client";

import React from "react";
import { Loader2, Mail, Zap } from "lucide-react";

interface LeadFormStepProps {
  formData: { name: string; email: string; company: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e?: React.FormEvent) => void;
  loading: boolean;
  error: string;
}

/** Phase 1 of the CV download flow: collect the visitor's details before sending an OTP. */
export function LeadFormStep({ formData, onChange, onSubmit, loading, error }: LeadFormStepProps) {
  return (
    <div className="relative z-10 p-6 py-10">
      <div className="text-center mb-6">
        <div className="w-8 h-8 mx-auto mb-5 text-[#FF6B00]">
          <Zap className="w-full h-full" fill="currentColor" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Download CV</h2>
        <p className="text-white/60 text-sm leading-relaxed">
          Please provide your details. I will send a
          <br />
          verification code to your email.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-white/60 text-xs font-medium mb-1.5 ml-1">Name</label>
          <input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={onChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white text-sm placeholder-white/30 focus:bg-white/15 focus:border-[#FF6B00]/50 focus:ring-1 focus:ring-[#FF6B00]/30 focus:outline-none transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-white/60 text-xs font-medium mb-1.5 ml-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={onChange}
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
            onChange={onChange}
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
  );
}
