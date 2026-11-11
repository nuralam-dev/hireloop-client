"use client";

import {
  BarChart3,
  Bookmark,
  Briefcase,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  PlusCircle,
  Search,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type Role = "seeker" | "recruiter" | "admin";

type MenuItem = {
  name: string;
  url: string;
  icon: LucideIcon;
};

const MENU_ITEMS_BY_ROLE: Record<Role, MenuItem[]> = {
  seeker: [
    { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { name: "Browse Jobs", url: "/jobs", icon: Search },
    { name: "Saved Jobs", url: "/dashboard/saved", icon: Bookmark },
    { name: "My Applications", url: "/dashboard/applications", icon: FileText },
    { name: "Billing & Subscription", url: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/settings", icon: Settings },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { name: "Post a Job", url: "/dashboard/post-job", icon: PlusCircle },
    { name: "My Jobs", url: "/dashboard/jobs", icon: Briefcase },
    { name: "Applicants", url: "/dashboard/applicants", icon: Users },
    { name: "Company Profile", url: "/dashboard/company", icon: Building2 },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { name: "Manage Users", url: "/dashboard/users", icon: Users },
    { name: "Manage Jobs", url: "/dashboard/jobs", icon: Briefcase },
    { name: "Payments & Subscriptions", url: "/dashboard/payments", icon: CreditCard },
    { name: "Reports", url: "/dashboard/reports", icon: BarChart3 },
  ],
};


export function DashboardSidebar() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  const role = (session?.user?.role ?? "seeker") as Role;
  const menuItems = MENU_ITEMS_BY_ROLE[role];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    tooltip={item.name}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
