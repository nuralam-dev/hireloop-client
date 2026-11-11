import { StatusPill, type StatusTone } from "./StatusPill";

// Figma: Recent Subscription Transactions (Admin Dashboard Overview)
type Transaction = {
  email: string;
  company: string;
  plan: string;
  /** Enterprise প্ল্যানে সাদা হাইলাইট পিল থাকে, বাকিগুলো মিউট */
  planHighlighted?: boolean;
  txnId: string;
  amount: string;
  date: string;
  status: string;
  tone: StatusTone;
};

const TRANSACTIONS: Transaction[] = [
  {
    email: "marcus.k@techcorp.io",
    company: "TechCorp Inc.",
    plan: "Enterprise Monthly",
    planHighlighted: true,
    txnId: "#TXN-902341",
    amount: "$1,299.00",
    date: "Oct 24, 2023, 14:20",
    status: "Success",
    tone: "success",
  },
  {
    email: "sarah.l@creativestudio.com",
    company: "Creative Studio",
    plan: "Professional Annual",
    txnId: "#TXN-882103",
    amount: "$499.00",
    date: "Oct 24, 2023, 11:05",
    status: "Success",
    tone: "success",
  },
  {
    email: "j.doe@freelance.org",
    company: "Independent",
    plan: "Starter Monthly",
    txnId: "#TXN-774129",
    amount: "$49.00",
    date: "Oct 23, 2023, 16:45",
    status: "Pending",
    tone: "pending",
  },
  {
    email: "admin@retailglobal.net",
    company: "Retail Global",
    plan: "Enterprise Monthly",
    planHighlighted: true,
    txnId: "#TXN-552014",
    amount: "$1,299.00",
    date: "Oct 23, 2023, 09:12",
    status: "Failed",
    tone: "failed",
  },
];

const HEADERS = [
  "User/Recruiter",
  "Plan Type",
  "Transaction ID",
  "Amount",
  "Date",
  "Status",
];

export function TransactionsTable() {
  return (
    <div className="overflow-x-auto rounded-xl bg-[#141418] ring-1 ring-white/[0.06]">
      <table className="w-full min-w-[720px] text-left">
        <thead>
          <tr className="bg-[#1a1a1f]">
            {HEADERS.map((h) => (
              <th
                key={h}
                className="h-11 px-5 text-xs font-medium tracking-wide text-[#6e6e78] uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TRANSACTIONS.map((t) => (
            <tr
              key={t.txnId}
              className="border-t border-white/[0.06] transition-colors hover:bg-white/[0.02]"
            >
              <td className="h-16 px-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#222228] text-xs font-semibold text-white">
                    {t.company.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="leading-tight">
                    <span className="block text-sm text-[#ededeff2]">
                      {t.email}
                    </span>
                    <span className="block text-xs text-[#a0a0ab]">
                      {t.company}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-5">
                {t.planHighlighted ? (
                  <span className="inline-flex h-[21px] items-center rounded-full bg-white px-2.5 text-xs font-medium text-[#141418]">
                    {t.plan}
                  </span>
                ) : (
                  <span className="inline-flex h-[21px] items-center rounded-full bg-[#222228] px-2.5 text-xs font-medium text-[#a0a0ab]">
                    {t.plan}
                  </span>
                )}
              </td>
              <td className="px-5 text-sm text-[#a0a0ab]">{t.txnId}</td>
              <td className="px-5 text-sm font-medium text-[#ededeff2]">
                {t.amount}
              </td>
              <td className="px-5 text-sm text-[#a0a0ab]">{t.date}</td>
              <td className="px-5">
                <StatusPill status={t.status} tone={t.tone} withDot />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
