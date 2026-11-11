import {
  Banknote,
  Briefcase,
  Building2,
  Calendar,
  Download,
  Users,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/StatCard";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";

// Figma: Admin / Dashboard Overview
const STATS = [
  { label: "Total Users", value: "124,892", icon: Users, change: { value: "+12%", tone: "up" as const } },
  { label: "Total Recruiters", value: "12,405", icon: Users, change: { value: "+8%", tone: "up" as const } },
  { label: "Total Companies", value: "4,281", icon: Building2, change: { value: "0%", tone: "neutral" as const } },
  { label: "Jobs Posted", value: "8,920", icon: Briefcase, change: { value: "+24%", tone: "up" as const } },
  { label: "Platform Revenue", value: "$245,800", icon: Banknote, change: { value: "+18.5%", tone: "up" as const } },
] as const;

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-[1118px] pt-6">
      {/* Header Section */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-7 font-bold text-[#ededeff2]">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-[#a0a0ab]">
            Real-time platform performance and growth metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-8 items-center gap-2 rounded-lg bg-[#1a1a1f] px-3 text-sm text-[#ededeff2] ring-1 ring-white/[0.07] transition-colors hover:bg-[#222228]"
          >
            <Calendar className="size-4" aria-hidden="true" />
            Last 30 Days
          </button>
          <button
            type="button"
            className="inline-flex h-8 items-center gap-2 rounded-lg bg-white px-3 text-sm font-medium text-[#0b0b0c] transition-colors hover:bg-[#e4e4e4]"
          >
            <Download className="size-4" aria-hidden="true" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Row (5 কার্ড) */}
      <div className="mt-6 grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 lg:grid-cols-3 min-[1200px]:grid-cols-5">
        {STATS.map(({ label, value, icon, change }) => (
          <StatCard
            key={label}
            label={label}
            value={value}
            icon={icon}
            change={change}
          />
        ))}
      </div>

      {/* Recent Payments Section */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#ededeff2]">
            Recent Subscription Transactions
          </h2>
          <button
            type="button"
            className="text-sm text-[#ededeff2] transition-colors hover:text-white"
          >
            View All Activity
          </button>
        </div>
        <div className="mt-4">
          <TransactionsTable />
        </div>
      </section>
    </div>
  );
}
