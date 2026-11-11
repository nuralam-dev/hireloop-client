import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// Figma: Section - Stats Row — ড্যাশবোর্ডের স্ট্যাট কার্ড
// দুই ভ্যারিয়েন্ট:
//  - "inline": seeker ড্যাশবোর্ড (লেবেল+আইকন ওপরে, ভ্যালু নিচে)
//  - "bubble": recruiter/admin (আইকন বাবল ওপরে, তারপর লেবেল, তারপর ভ্যালু)
type StatCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  /** আইকনের রঙ (Figma-তে স্ট্যাট অনুযায়ী আলাদা) */
  iconClassName?: string;
  variant?: "inline" | "bubble";
  /** Admin কার্ডের change badge (যেমন +12%, 0%) */
  change?: { value: string; tone: "up" | "down" | "neutral" };
};

const CHANGE_TONES = {
  up: "text-[#22c55e]",
  down: "text-[#ef4444]",
  neutral: "text-[#a0a0ab]",
} as const;

export function StatCard({
  label,
  value,
  icon: Icon,
  iconClassName,
  variant = "bubble",
  change,
}: StatCardProps) {
  return (
    <div className="flex flex-col rounded-xl bg-[#141418] p-5 ring-1 ring-white/[0.06]">
      {variant === "inline" ? (
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#a0a0ab]">{label}</span>
            <Icon className={cn("size-4", iconClassName)} aria-hidden="true" />
          </div>
          <span className="mt-1 text-[32px] leading-8 font-bold text-[#ededeff2]">
            {value}
          </span>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#222228]">
              <Icon
                className={cn("size-4", iconClassName)}
                aria-hidden="true"
              />
            </span>
            {change && (
              <span
                className={cn(
                  "text-xs font-medium",
                  CHANGE_TONES[change.tone],
                )}
              >
                {change.value}
              </span>
            )}
          </div>
          <span className="mt-3 text-sm text-[#a0a0ab]">{label}</span>
          <span className="mt-1 text-[32px] leading-8 font-bold text-[#ededeff2]">
            {value}
          </span>
        </>
      )}
    </div>
  );
}
