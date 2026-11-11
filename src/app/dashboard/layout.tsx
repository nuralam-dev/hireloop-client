import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { DashboardSidebar } from "../components/DashboardSidebar";

// Figma: পেজ bg #08080a-এর ওপরে এলিভেটেড মেইন প্যানেল (#0e0e11, rounded-2xl)
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex min-h-svh flex-1 flex-col overflow-hidden rounded-2xl bg-[#0e0e11] ring-1 ring-white/[0.06]">
        <DashboardTopbar />
        <main className="flex-1 px-4 pb-8 sm:px-8">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
