import { StatusPill, type StatusTone } from "./StatusPill";

// Figma: Section - Recent Applications (Recruiter Dashboard)
type Application = {
  name: string;
  initials: string;
  role: string;
  applied: string;
  experience: string;
  status: string;
  tone: StatusTone;
};

const APPLICATIONS: Application[] = [
  {
    name: "Julianne Moore",
    initials: "JM",
    role: "Senior Product Designer",
    applied: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
    tone: "interviewing",
  },
  {
    name: "Robert Downey",
    initials: "RD",
    role: "Backend Engineer",
    applied: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
    tone: "new",
  },
  {
    name: "Emma Stone",
    initials: "ES",
    role: "Marketing Lead",
    applied: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
    tone: "reviewing",
  },
  {
    name: "Chris Pratt",
    initials: "CP",
    role: "Product Manager",
    applied: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
    tone: "rejected",
  },
];

const HEADERS = ["Candidate Name", "Role", "Date Applied", "Experience", "Status"];

export function ApplicationsTable() {
  return (
    <div className="overflow-hidden rounded-xl bg-[#141418] ring-1 ring-white/[0.06]">
      <table className="w-full text-left">
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
          {APPLICATIONS.map((a) => (
            <tr
              key={a.name}
              className="border-t border-white/[0.06] transition-colors hover:bg-white/[0.02]"
            >
              <td className="h-16 px-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#222228] text-xs font-semibold text-white">
                    {a.initials}
                  </span>
                  <span className="text-sm font-medium text-[#ededeff2]">
                    {a.name}
                  </span>
                </div>
              </td>
              <td className="px-5 text-sm text-[#a0a0ab]">{a.role}</td>
              <td className="px-5 text-sm text-[#a0a0ab]">{a.applied}</td>
              <td className="px-5 text-sm text-[#a0a0ab]">{a.experience}</td>
              <td className="px-5">
                <StatusPill status={a.status} tone={a.tone} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
