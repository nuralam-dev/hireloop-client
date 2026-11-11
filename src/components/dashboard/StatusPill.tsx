import { cn } from "@/lib/utils";

// Figma-র status pill গুলোর রঙ ম্যাপিং (Overlay+Border)
export type StatusTone =
  | "interviewing"
  | "new"
  | "reviewing"
  | "rejected"
  | "success"
  | "pending"
  | "failed";

const TONES: Record<StatusTone, string> = {
  interviewing: "border-[#8f88ff]/40 text-[#8f88ff]",
  new: "border-[#60a5fa]/40 text-[#60a5fa]",
  reviewing: "border-[#f59e0b]/40 text-[#f59e0b]",
  rejected: "border-[#ef4444]/40 text-[#ef4444]",
  success: "border-[#22c55e]/40 text-[#22c55e]",
  pending: "border-[#f59e0b]/40 text-[#f59e0b]",
  failed: "border-[#f74c4c]/40 text-[#f74c4c]",
};

const DOT_TONES: Record<StatusTone, string> = {
  interviewing: "bg-[#8f88ff]",
  new: "bg-[#60a5fa]",
  reviewing: "bg-[#f59e0b]",
  rejected: "bg-[#ef4444]",
  success: "bg-[#22c55e]",
  pending: "bg-[#f59e0b]",
  failed: "bg-[#f74c4c]",
};

export function StatusPill({
  status,
  tone,
  withDot = false,
}: {
  status: string;
  tone: StatusTone;
  withDot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium",
        TONES[tone],
      )}
    >
      {withDot && (
        <span
          className={cn("size-1.5 rounded-full", DOT_TONES[tone])}
          aria-hidden="true"
        />
      )}
      {status}
    </span>
  );
}
