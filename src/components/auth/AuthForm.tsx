"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export type AuthMode = "sign-in" | "sign-up";

const MODES = [
  { mode: "sign-in" as AuthMode, label: "Sign In", href: "/sign-in" },
  { mode: "sign-up" as AuthMode, label: "Sign Up", href: "/sign-up" },
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
const labelClasses = "mb-2 flex items-center justify-between text-sm text-[#ededeff2]";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const copy = COPY[mode];

  // Stub handler — wire it to better-auth / the API later.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    console.log(`[auth] ${mode} form data collected:`, data);
  }

  return (
    <div className="mx-auto w-full max-w-[440px] rounded-2xl bg-[#141418] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] ring-1 ring-white/[0.07] sm:p-8">
      {/* Mode toggle — switches between /sign-in and /sign-up */}
      <div className="mb-8 flex rounded-full bg-[#1a1a1b] p-1 ring-1 ring-white/10" role="tablist">
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
                : "text-[#ededeff2] hover:text-white"
            )}
          >
            {label}
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-white sm:text-[28px]">{copy.title}</h2>
      <p className="mt-2 text-sm text-[#ededeff2] sm:text-base">{copy.subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-8" noValidate={false}>
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
              className={inputClasses}
            />
          </div>
        )}

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
            className={inputClasses}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className={labelClasses}>
            {mode === "sign-up" ? (
              <>Password</>
            ) : (
              // toggle target for a future forgot-password flow
              <>
                Password
                <Link href="/sign-in" className="text-sm font-medium text-[#5c53fe] hover:text-[#7a73ff]">
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
            autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
            placeholder={mode === "sign-up" ? "At least 8 characters" : "Enter your password"}
            className={inputClasses}
          />
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#5c53fe] text-lg text-white ring-1 ring-[#090a15] transition-colors hover:bg-[#4b45e0]"
        >
          {copy.submit}
        </button>

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

export default AuthForm;
