import Link from "next/link";

// এখনো ডিজাইন/ইমপ্লিমেন্ট না হওয়া সাইডবার লিংকগুলোর placeholder —
// নিজের পেজ বানালে এটা আর সেই রুটে সার্ভ হবে না (static রুট priority পায়)
export default async function DashboardSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-[28px] font-bold text-[#ededeff2] capitalize">
        {section.replace(/-/g, " ")}
      </h1>
      <p className="mt-2 max-w-[420px] text-sm text-[#a0a0ab]">
        This section is coming soon — the layout and data are not built yet.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 inline-flex h-10 items-center rounded-xl bg-[#5c53fe] px-4 text-sm font-medium text-white transition-colors hover:bg-[#4b45e0]"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
