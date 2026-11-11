import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

// /dashboard → সেশনের role অনুযায়ী নিজের ড্যাশবোর্ডে পাঠায়
// (seeker/recruiter/admin — লগ-ইন না থাকলে seeker ডিফল্ট)
export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role ?? "seeker";
  redirect(`/dashboard/${role}`);
}
