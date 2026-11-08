import Image from "next/image";
import Link from "next/link";
import { Search, Sparkles, Star, Trophy, UserSearch, MapPin } from "lucide-react";

const TRENDING = ["Product Designer", "AI Engineering", "Dev-ops Engineer"] as const;

const STATS = [
  { icon: Search, value: "50K", label: "Active Jobs" },
  { icon: Trophy, value: "12K", label: "Companies" },
  { icon: UserSearch, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfication Rate" },
] as const;

const cardClasses =
  "relative flex h-[204px] flex-col justify-between rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.01] p-6 ring-1 ring-white/10 lg:h-[254px]";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#08080a]">
      {/* Decor — magenta nebula + purple glow + globe horizon (from Figma "Group 1") */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[620px] w-[1100px] max-md:w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#dc02ce,transparent)] opacity-30 blur-3xl" />
        <div className="absolute top-32 left-1/2 h-[520px] w-[1400px] max-md:w-full -translate-x-1/2 rounded-full bg-[#5c53fe] opacity-25 blur-[140px]" />
        <Image
          src="/images/globe.png"
          alt=""
          width={1440}
          height={1882}
          priority
          sizes="2400px"
          className="absolute left-1/2 top-[240px] w-[1600px] max-md:w-[1300px] max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)]"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-[1320px] px-4 pt-40 sm:px-6 sm:pt-48 lg:pt-[210px]">
        <div className="mx-auto w-full max-w-[784px]">
          {/* Badge pill */}
          <div className="mx-auto flex max-w-[549px] items-center gap-6">
            <span className="h-px w-16 shrink-0 bg-white/70" aria-hidden="true" />
            <span className="flex h-[50px] flex-1 items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-white/[0.12] to-white/[0.02] ring-1 ring-white/30 shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]">
              <Sparkles className="size-6 shrink-0 text-white" aria-hidden="true" />
              <span className="font-mono text-sm sm:text-lg text-white">50,000+ new jobs this month</span>
            </span>
            <span className="h-px w-16 shrink-0 bg-white/70" aria-hidden="true" />
          </div>

          {/* Title + sub */}
          <h1 className="mt-8 text-center font-bold text-4xl leading-[1.14] tracking-tight text-white sm:text-5xl lg:text-[56px] lg:leading-[64px]">
            Find Your Dream Job Today
          </h1>
          <p className="mt-4 text-center text-lg text-[#ededeff2] sm:text-xl lg:leading-8">
            HireLoop connects top talent with world-class companies. Browse thousands of curated
            opportunities and land your next role — faster.
          </p>

          {/* Search bar */}
          <form
            action="/jobs"
            method="get"
            className="mt-10 flex flex-col gap-3 rounded-2xl bg-[#101010] p-2 ring-1 ring-white/20 sm:h-16 sm:flex-row sm:items-center sm:gap-0 lg:h-16"
          >
            <div className="flex flex-1 items-center gap-2 px-3 py-2 text-base sm:py-0">
              <Search className="size-6 shrink-0 text-[#ededeff2]" aria-hidden="true" />
              <input
                type="search"
                name="q"
                placeholder="Job title, skill or company"
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-[#ededeff2]/80"
              />
            </div>
            <span aria-hidden="true" className="mx-2 hidden h-6 w-px bg-white/20 sm:block" />
            <div className="flex flex-1 items-center gap-2 px-3 py-2 text-base sm:py-0">
              <MapPin className="size-6 shrink-0 text-[#ededeff2]" aria-hidden="true" />
              <input
                type="search"
                name="location"
                placeholder="Location or Remote"
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-[#ededeff2]/80"
              />
            </div>
            <button
              type="submit"
              aria-label="Search jobs"
              className="flex h-12 w-full items-center justify-center rounded-xl bg-[#5c53fe] text-white ring-1 ring-[#090a15] transition-colors hover:bg-[#4b45e0] sm:size-12 sm:w-auto"
            >
              <Search className="size-6" aria-hidden="true" />
              <span className="sr-only">Search</span>
            </button>
          </form>

          {/* Trending chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-2 text-base text-[#ededeff2]">Trending Position</span>
            {TRENDING.map((chip) => (
              <Link
                key={chip}
                href={`/jobs?q=${encodeURIComponent(chip)}`}
                className="rounded-full bg-[#1a1a1b] px-3.5 py-1.5 text-sm text-white ring-1 ring-white/10 transition-colors hover:bg-[#232326]"
              >
                {chip}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="relative pt-56 sm:pt-72 lg:pt-[380px]">
          <p className="mx-auto max-w-[600px] text-center text-3xl text-white sm:text-4xl lg:text-[40px] lg:leading-[1.3]">
            Assisting over 15,000 job seekers find their dream positions.
          </p>
          <div className="mx-auto mt-16 grid max-w-[1320px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className={cardClasses}>
                <stat.icon className="size-6 text-white" aria-hidden="true" />
                <div>
                  <div className="text-4xl font-semibold text-white sm:text-5xl lg:text-[56px] lg:leading-[64px]">
                    {stat.value}
                  </div>
                  <div className="text-base lg:text-lg text-white/90">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
