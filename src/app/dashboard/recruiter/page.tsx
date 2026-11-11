import { Briefcase, CalendarRange, Archive, Users } from "lucide-react";
import Link from "next/link";

import { ApplicationsTable } from "@/components/dashboard/ApplicationsTable";
import { StatCard } from "@/components/dashboard/StatCard";

// Figma: Recruiter / Dashboard
const STATS = [
  { label: "Total Job Posts", value: "48", icon: Briefcase },
  { label: "Total Applicants", value: "1,284", icon: Users },
  { label: "Active Jobs", value: "18", icon: CalendarRange },
  { label: "Jobs Closed", value: "32", icon: Archive },
] as const;

export default function RecruiterDashboardPage() {
  return (
    <div className="mx-auto max-w-[1120px] pt-6">
      {/* Section - Welcome Header */}
      <h1 className="text-[28px] leading-7 font-bold text-[#ededeff2]">
        Welcome back, Alex Sterling
      </h1>

      {/* Section - Stats Row */}
      <div className="mt-6 grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ label, value, icon }) => (
          <StatCard key={label} label={label} value={value} icon={icon} />
        ))}
      </div>

      {/* Dashboard Grid — Recent Applications (2/3) */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#ededeff2]">
            Recent Applications
          </h2>
          <Link
            href="/dashboard/applicants"
            className="text-sm text-[#ededeff2] transition-colors hover:text-white"
          >
            View all
          </Link>
        </div>
        <div className="mt-4">
          <ApplicationsTable />
        </div>
      </section>
    </div>
  );
}
