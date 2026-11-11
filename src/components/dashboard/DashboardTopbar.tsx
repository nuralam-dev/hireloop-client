import Link from "next/link";
import { Bell } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";

// Figma: Header - TopNavBar (Web) — ড্যাশবোর্ডের শেয়ার্ড টপবার
export function DashboardTopbar({
  searchPlaceholder = "Search for opportunities...",
}: {
  searchPlaceholder?: string;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-4">
        {/* মোবাইলে সাইডবার টগল */}
        <SidebarTrigger className="md:hidden" />

        <div className="relative hidden w-full max-w-[320px] sm:block">
          <input
            type="search"
            placeholder={searchPlaceholder}
            className="h-9 w-full rounded-lg bg-[#0c0c0f] px-3 text-sm text-[#ededeff2] ring-1 ring-white/[0.07] outline-none transition-shadow placeholder:text-[#828997] focus:ring-2 focus:ring-[#5c53fe]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* নোটিফিকেশন বেল — লাল ডট সহ */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-8 items-center justify-center rounded-lg text-[#c4c7c8] transition-colors hover:bg-white/5 hover:text-white"
        >
          <Bell className="size-[18px]" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#ef4444]" />
        </button>

        {/* ইউজার অ্যাভাটার — পরে session.user.image দিয়ে বদলাবে */}
        <Link
          href="/dashboard/profile"
          aria-label="Your profile"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#222228] text-xs font-semibold text-white ring-1 ring-white/10"
        >
          <span aria-hidden="true">AS</span>
        </Link>
      </div>
    </header>
  );
}
