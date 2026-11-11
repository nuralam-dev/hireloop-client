"use client";

import {
  Building2,
  Calendar,
  ChevronDown,
  DollarSign,
  Globe,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { cn } from "@/lib/utils";

// Figma: Add New Job — 3 section form (Basic / Location & Compensation / Description)
// সিম্পল লজিক: controlled state নেই — submit-এর সময় FormData থেকে সব ডেটা নেওয়া হয়
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;
const CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
  "Other",
] as const;
const FREQUENCIES = ["per hour", "per day", "per month", "per year"] as const;

const inputClasses =
  "h-11 w-full rounded-xl bg-[#1e1e21] px-4 text-sm text-white ring-1 ring-white/[0.07] outline-none transition-shadow placeholder:text-white/40 focus:ring-2 focus:ring-[#5c53fe]";

const labelClasses = "mb-2 block text-sm text-[#f4f4f5]";

export default function PostJobPage() {
  // একমাত্র state — সাবমিট সফল হলে সবুজ মেসেজ দেখানোর জন্য
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    // TODO: পরে API দিয়ে ডাটাবেসে সেভ হবে — আপাতত data collect হচ্ছে
    console.log("[post-job] form data collected:", data);
    setSuccess("Job posted successfully! It is now visible to job seekers.");
  }

  return (
    <div className="mx-auto max-w-[860px]">
      {/* Top bar: breadcrumb + heading */}
      <div className="pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
          <Link
            href="/dashboard"
            className="text-[#a0a0ab] transition-colors hover:text-white"
          >
            Dashboard
          </Link>
          <span className="text-[#5a5a60]" aria-hidden="true">
            ›
          </span>
          <span className="text-[#c3c0ff]">Add New Job</span>
        </nav>

        <h1 className="mt-3 text-[32px] leading-10 font-bold text-white">
          Add New Job
        </h1>
        <p className="mt-1 text-sm text-[#a0a0ab]">
          Create and publish a new job posting to attract top talent.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6 pb-8">
        {/* Section 1: Basic Information */}
        <section className="rounded-2xl bg-[#151516] p-6 ring-1 ring-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-[#5c53fe]" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-white">Basic Information</h2>
          </div>

          <div className="mt-5 flex flex-col gap-5">
            <div>
              <label htmlFor="title" className={labelClasses}>
                Job Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Frontend Developer"
                className={inputClasses}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className={labelClasses}>
                  Company Name *
                </label>
                <div className="relative">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    placeholder="HirePulse Network"
                    className={cn(inputClasses, "pr-10")}
                  />
                  <Building2
                    className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-[#a0a0ab]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className={labelClasses}>
                  Job Category *
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    className={cn(inputClasses, "cursor-pointer appearance-none pr-10")}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} className="bg-[#1e1e21]">
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#a0a0ab]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Job Type — radio group (peer-checked দিয়ে স্টাইল, state লাগে না) */}
            <fieldset>
              <legend className={labelClasses}>Job Type *</legend>
              <div className="grid grid-cols-2 gap-2 min-[520px]:grid-cols-4">
                {JOB_TYPES.map((t) => (
                  <label key={t} className="cursor-pointer">
                    <input
                      type="radio"
                      name="jobType"
                      value={t}
                      defaultChecked={t === "Full-time"}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        "flex h-11 items-center justify-center rounded-xl text-sm font-medium transition-colors",
                        "bg-[#1e1e21] text-[#a0a0ab] ring-1 ring-white/[0.07]",
                        "peer-checked:bg-[#232327] peer-checked:text-white peer-checked:ring-2 peer-checked:ring-[#5c53fe]",
                      )}
                    >
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </section>

        {/* Section 2: Location & Compensation */}
        <section className="rounded-2xl bg-[#151516] p-6 ring-1 ring-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-[#5c53fe]" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-white">
              Location &amp; Compensation
            </h2>
          </div>

          <div className="mt-5 flex flex-col gap-5">
            {/* Remote toggle — checkbox (checked হলে FormData-তে "on" আসবে) */}
            <div className="flex items-center justify-between rounded-xl bg-[#1e1e21] p-4 ring-1 ring-white/[0.07]">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-[#232327]">
                  <Globe className="size-5 text-[#c3c0ff]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-white">
                    Remote Work Allowed
                  </p>
                  <p className="text-xs text-[#a0a0ab]">
                    This job can be performed from anywhere.
                  </p>
                </div>
              </div>
              <label className="relative inline-block h-6 w-11 shrink-0">
                <input
                  type="checkbox"
                  name="isRemote"
                  aria-label="Remote work allowed"
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "absolute inset-0 rounded-full bg-[#1f1f1f] transition-colors",
                    "peer-checked:bg-[#5c53fe]",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform",
                    "peer-checked:translate-x-5",
                  )}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="location" className={labelClasses}>
                  Location
                </label>
                <div className="relative">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="New York, USA"
                    className={cn(inputClasses, "pr-10")}
                  />
                  <MapPin
                    className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#a0a0ab]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="deadline" className={labelClasses}>
                  Application Deadline
                </label>
                <div className="relative">
                  <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    className={cn(inputClasses, "[color-scheme:dark] pr-10")}
                  />
                  <Calendar
                    className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#a0a0ab]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-3">
              <div>
                <label htmlFor="minSalary" className={labelClasses}>
                  Min Salary / Rate
                </label>
                <div className="relative">
                  <DollarSign
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#a0a0ab]"
                    aria-hidden="true"
                  />
                  <input
                    id="minSalary"
                    name="minSalary"
                    type="number"
                    min="0"
                    placeholder="50"
                    className={cn(inputClasses, "pl-9")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="maxSalary" className={labelClasses}>
                  Max Salary / Rate
                </label>
                <div className="relative">
                  <DollarSign
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#a0a0ab]"
                    aria-hidden="true"
                  />
                  <input
                    id="maxSalary"
                    name="maxSalary"
                    type="number"
                    min="0"
                    placeholder="120"
                    className={cn(inputClasses, "pl-9")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="frequency" className={labelClasses}>
                  Frequency
                </label>
                <div className="relative">
                  <select
                    id="frequency"
                    name="frequency"
                    className={cn(inputClasses, "cursor-pointer appearance-none pr-10")}
                  >
                    {FREQUENCIES.map((f) => (
                      <option key={f} className="bg-[#1e1e21]">
                        {f}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#a0a0ab]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Job Description & Core Skills */}
        <section className="rounded-2xl bg-[#151516] p-6 ring-1 ring-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-[#5c53fe]" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-white">
              Job Description &amp; Core Skills
            </h2>
          </div>

          <div className="mt-5 flex flex-col gap-5">
            <div>
              <label htmlFor="responsibilities" className={labelClasses}>
                Key Responsibilities
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                rows={4}
                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences..."
                className={cn(inputClasses, "h-auto resize-y py-3")}
              />
            </div>

            <div>
              <label htmlFor="requirements" className={labelClasses}>
                Qualifications &amp; Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                placeholder="• 3+ years of experience with React, TypeScript...
• Solid understanding of DOM performance..."
                className={cn(inputClasses, "h-auto resize-y py-3")}
              />
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="flex flex-col items-start gap-3">
          <button
            type="submit"
            className="inline-flex h-11 items-center rounded-xl bg-[#5c53fe] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#4b45e0]"
          >
            Publish Job
          </button>

          {success && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-lg border border-[#22c55e]/20 bg-[#22c55e]/10 px-4 py-3 text-sm text-[#22c55e]"
            >
              {success}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
