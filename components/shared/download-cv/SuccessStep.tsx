/** Phase 3 of the CV download flow: animated confirmation shown after OTP verification. */
export function SuccessStep() {
  return (
    <div className="relative z-10 p-6 py-14 flex flex-col items-center">
      {/* Animated checkmark */}
      <div className="relative mb-6">
        <svg className="w-20 h-20 animate-[scaleIn_0.4s_ease-out]" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-[circleStroke_0.6s_ease-out_forwards]"
            style={{ strokeDasharray: 226, strokeDashoffset: 226 }}
          />
          <path
            d="M24 42 L35 53 L56 28"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-[checkStroke_0.4s_ease-out_0.5s_forwards]"
            style={{ strokeDasharray: 50, strokeDashoffset: 50 }}
          />
        </svg>
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

      {/* Keyframes used only by this success animation. */}
      <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes circleStroke { to { stroke-dashoffset: 0; } }
        @keyframes checkStroke { to { stroke-dashoffset: 0; } }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
