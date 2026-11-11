import { Bookmark, CalendarClock, FileText, MailCheck, Plus } from "lucide-react";
import Link from "next/link";

import { StatCard } from "@/components/dashboard/StatCard";

// Figma: Seeker / Dashboard
const STATS = [
  { label: "Saved Jobs", value: "12", icon: Bookmark, iconClassName: "text-white" },
  { label: "Applications Submitted", value: "24", icon: FileText, iconClassName: "text-white" },
  { label: "Interviews Scheduled", value: "3", icon: CalendarClock, iconClassName: "text-[#f59e0b]" },
  { label: "Offers Received", value: "1", icon: MailCheck, iconClassName: "text-[#22c55e]" },
] as const;

const ACTIVITIES = [
  {
    message: "Application for Senior Product Designer at TechFlow updated to ‘Under Review’",
    time: "2 hours ago",
    icon: FileText,
    iconClassName: "text-white",
  },
  {
    message: "New Job Alert: Lead Frontend Engineer at FinGrid matches your profile.",
    time: "5 hours ago",
    icon: MailCheck,
    iconClassName: "text-[#22c55e]",
  },
  {
    message: "You have a new message from Sarah Jenkins (Hiring Manager at CloudOps).",
    time: "1 day ago",
    icon: MailCheck,
    iconClassName: "text-white",
  },
] as const;

export default function SeekerDashboardPage() {
  return (
    <div className="mx-auto max-w-[1120px] pt-6">
      {/* Section - Stats Row */}
      <div className="grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ label, value, icon, iconClassName }) => (
          <StatCard
            key={label}
            label={label}
            value={value}
            icon={icon}
            iconClassName={iconClassName}
            variant="inline"
          />
        ))}
      </div>

      {/* Bottom Section: Recent Activity */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#ededeff2]">
            Recent Activity
          </h2>
          <Link
            href="/dashboard/activity"
            className="text-sm text-[#a0a0ab] transition-colors hover:text-white"
          >
            View All Activity
          </Link>
        </div>

        <ul className="mt-4">
          {ACTIVITIES.map(({ message, time, icon: Icon, iconClassName }) => (
            <li
              key={message}
              className="flex items-center gap-4 rounded-xl bg-[#141418] px-4 py-3 ring-1 ring-white/[0.06] [&+&]:mt-2"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#222228]">
                <Icon className={iconClassName} aria-hidden="true" />
              </span>
              <p className="min-w-0 flex-1 truncate text-sm text-white sm:whitespace-normal">
                {message}
              </p>
              <span className="hidden shrink-0 text-sm text-[#a0a0ab] sm:block">
                {time}
              </span>
              <span
                className="size-2 shrink-0 rounded-full border border-white/40 border-t-0 border-r-0 rotate-45 sm:hidden"
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Button - FAB (Only on Home-like Dashboard) */}
      <Link
        href="/jobs"
        aria-label="Quick action"
        className="fixed right-6 bottom-6 flex size-14 items-center justify-center rounded-full bg-white text-[#2f3131] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-transform hover:scale-105"
      >
        <Plus className="size-5" aria-hidden="true" />
      </Link>
    </div>
  );
}
