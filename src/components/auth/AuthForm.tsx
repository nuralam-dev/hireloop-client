"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, type FormEvent } from "react";

export type AuthMode = "sign-in" | "sign-up";

export type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
};

// CHANGED: onSubmit এখন form-এর values গ্রহণ করবে
type AuthFormProps = {
  mode: AuthMode;
  onSubmit: (values: AuthFormValues) => Promise<void>;
};

const MODES = [
  {
    mode: "sign-in",
    label: "Sign In",
    href: "/sign-in",
  },
  {
    mode: "sign-up",
    label: "Sign Up",
    href: "/sign-up",
  },
] as const;

const COPY = {
  "sign-in": {
    title: "Welcome back",
    subtitle: "Sign in to your HireLoop account to continue your job search.",
    submit: "Sign In",
    footer: "New to HireLoop?",
    footerLinkLabel: "Create an account",
  },

  "sign-up": {
    title: "Create your account",
    subtitle: "Sign up and start connecting with top companies today.",
    submit: "Sign Up",
    footer: "Already have an account?",
    footerLinkLabel: "Sign in",
  },
} as const;

const inputClasses =
  "h-12 w-full rounded-xl bg-[#101010] px-4 text-base text-white ring-1 ring-white/20 outline-none transition-shadow placeholder:text-[#ededeff2]/60 focus:ring-2 focus:ring-[#5c53fe]";

const labelClasses =
  "mb-2 flex items-center justify-between text-sm text-[#ededeff2]";

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const copy = COPY[mode];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    const formData = new FormData(event.currentTarget);
    const values: AuthFormValues = {
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
    };
    if (mode === "sign-up") {
      values.name = String(formData.get("name") ?? "").trim();
      if (!values.name) {
        setErrorMessage("Please enter your full name.");
        return;
      }
    }
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[440px] rounded-2xl bg-[#141418] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] ring-1 ring-white/[0.07] sm:p-8">
      {/* UNCHANGED: Sign In এবং Sign Up mode toggle */}
      <div
        className="mb-8 flex rounded-full bg-[#1a1a1b] p-1 ring-1 ring-white/10"
        role="tablist"
        aria-label="Authentication mode"
      >
        {MODES.map(({ mode: m, label, href }) => (
          <Link
            key={m}
            href={href}
            role="tab"
            aria-selected={m === mode}
            data-state={m === mode ? "active" : "inactive"}
            className={cn(
              "flex-1 rounded-full py-2 text-center text-sm transition-colors",
              m === mode
                ? "bg-[#5c53fe] font-semibold text-white"
                : "text-[#ededeff2] hover:text-white",
            )}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* UNCHANGED: Heading */}
      <h2 className="text-2xl font-bold text-white sm:text-[28px]">
        {copy.title}
      </h2>

      {/* UNCHANGED: Subtitle */}
      <p className="mt-2 text-sm text-[#ededeff2] sm:text-base">
        {copy.subtitle}
      </p>

      {/* UNCHANGED: Form structure */}
      <form onSubmit={handleSubmit} className="mt-8">
        {/* UNCHANGED: Name field শুধু Sign Up-এ দেখাবে */}
        {mode === "sign-up" && (
          <div className="mb-5">
            <label htmlFor="name" className={labelClasses}>
              Full name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="John Doe"
              // NEW: Submit চলাকালে input disabled
              disabled={isSubmitting}
              className={inputClasses}
            />
          </div>
        )}

        {/* UNCHANGED: Email field */}
        <div className="mb-5">
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            // NEW: Submit চলাকালে input disabled
            disabled={isSubmitting}
            className={inputClasses}
          />
        </div>

        {/* UNCHANGED: Password field */}
        <div className="mb-6">
          <label htmlFor="password" className={labelClasses}>
            {mode === "sign-up" ? (
              <>Password</>
            ) : (
              <>
                Password
                {/* UNCHANGED: Future forgot-password link */}
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-[#5c53fe] hover:text-[#7a73ff]"
                >
                  Forgot password?
                </Link>
              </>
            )}
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={mode === "sign-up" ? 8 : undefined}
            autoComplete={
              mode === "sign-up" ? "new-password" : "current-password"
            }
            placeholder={
              mode === "sign-up"
                ? "At least 8 characters"
                : "Enter your password"
            }
            // NEW: Submit চলাকালে input disabled
            disabled={isSubmitting}
            className={inputClasses}
          />
        </div>

        {/* NEW: Authentication error message UI */}
        {errorMessage && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {errorMessage}
          </div>
        )}

        {/* CHANGED: Submit button-এ loading যোগ করা হয়েছে */}
        <button
          type="submit"
          // NEW: API request চললে button disabled থাকবে
          disabled={isSubmitting}
          // CHANGED: Disabled অবস্থার জন্য styling যোগ
          className="h-12 w-full rounded-xl bg-[#5c53fe] text-lg text-white ring-1 ring-[#090a15] transition-colors hover:bg-[#4b45e0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {/* CHANGED: Loading text দেখাবে */}
          {isSubmitting ? "Please wait..." : copy.submit}
        </button>

        {/* UNCHANGED: Footer navigation */}
        <p className="mt-6 text-center text-sm text-[#ededeff2]">
          {copy.footer}{" "}
          <Link
            href={mode === "sign-up" ? "/sign-in" : "/sign-up"}
            className="font-semibold text-[#5c53fe] hover:text-[#7a73ff]"
          >
            {copy.footerLinkLabel}
          </Link>
        </p>
      </form>
    </div>
  );
}

// UNCHANGED: Default export
export default AuthForm;
