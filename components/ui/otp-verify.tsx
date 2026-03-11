"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Zap } from "lucide-react"

interface OTPVerificationProps {
  email: string
  onVerify: (otp: string) => void
  onResend: () => void
  isLoading?: boolean
  error?: string
  cooldown?: number
}

export function OTPVerification({
  email,
  onVerify,
  onResend,
  isLoading = false,
  error = "",
  cooldown = 0,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all 6 digits are filled
    const fullOtp = newOtp.join("")
    if (fullOtp.length === 6 && newOtp.every((d) => d !== "")) {
      onVerify(fullOtp)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (pasted.length === 0) return

    const newOtp = [...otp]
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || ""
    }
    setOtp(newOtp)

    const nextEmpty = newOtp.findIndex((d) => d === "")
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus()

    if (pasted.length === 6) {
      onVerify(pasted)
    }
  }

  return (
    <div className="p-6 py-10">
      <div className="text-center mb-6">
        <div className="w-8 h-8 mx-auto mb-5 text-[#FF6B00]">
          <Zap className="w-full h-full" fill="currentColor" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Enter verification code
        </h2>
        <p className="text-white/60 text-sm leading-relaxed">
          We emailed you a verification code to
          <br />
          <span className="text-white font-medium">{email}</span>
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {/* OTP Inputs */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-6">
        {otp.map((digit, index) => (
          <div key={index} className="relative">
            <input
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isLoading}
              className="w-11 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-medium bg-white/10 border border-white/20 text-white placeholder-white/30 focus:bg-white/15 focus:border-[#FF6B00]/60 focus:ring-1 focus:ring-[#FF6B00]/30 focus:outline-none transition-all duration-200 rounded-xl disabled:opacity-50"
            />
          </div>
        ))}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 mb-4 text-white/70 text-sm">
          <div className="w-4 h-4 border-2 border-white/30 border-t-[#FF6B00] rounded-full animate-spin" />
          Verifying...
        </div>
      )}

      {/* Resend */}
      <div className="text-center">
        <span className="text-white/50 text-sm">Didn&apos;t get the code? </span>
        {cooldown > 0 ? (
          <span className="text-white/40 text-sm tabular-nums">
            Resend in {cooldown}s
          </span>
        ) : (
          <button
            onClick={onResend}
            disabled={isLoading}
            className="text-[#FF6B00]/80 hover:text-[#FF6B00] text-sm font-medium transition-colors duration-200 disabled:opacity-50"
          >
            Resend
          </button>
        )}
      </div>
    </div>
  )
}
