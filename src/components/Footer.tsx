
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/salary" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/career" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    icon: FaPinterestP,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedinIn,
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#050505] text-white">
      {/* Curved grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            repeating-radial-gradient(
              ellipse 70% 85% at 50% -55%,
              transparent 0px,
              transparent 58px,
              rgba(65,75,110,0.12) 59px,
              transparent 61px
            )
          `,
        }}
      />

      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-[70px] lg:pt-[110px] lg:pb-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[2.8fr_1fr_1fr_1fr] lg:gap-12">
          {/* Logo and description */}
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/logo.png"
                alt="HireLoop"
                width={160}
                height={55}
                className="h-auto w-[160px] object-contain"
              />
            </Link>

            <p className="mt-7 max-w-[330px] text-[16px] leading-8 text-[#888888]">
              The AI-native career platform. Built for
              people who take their work seriously.
            </p>
          </div>

          {/* Footer navigation */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-7 text-[18px] font-medium text-[#635BDB]">
                {section.title}
              </h3>

              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[16px] text-[#858585] transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-20 flex flex-col gap-8 md:mt-24 md:flex-row md:items-center md:justify-between">
          {/* Social icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`flex h-[42px] w-[42px] items-center justify-center rounded-lg text-[20px] transition-all duration-200 hover:-translate-y-1 ${
                    social.label === "Pinterest"
                      ? "bg-[#5045CC] text-white hover:bg-[#635BDB]"
                      : "bg-[#141414] text-[#A3A3A3] hover:bg-[#262626] hover:text-white"
                  }`}
                >
                  <Icon />
                </a>
              );
            })}
          </div>

          {/* Copyright and policies */}
          <div className="flex flex-col gap-3 text-[15px] text-[#777777] sm:flex-row sm:flex-wrap sm:gap-7">
            <p>Copyright 2024 – Programming Hero</p>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Terms & Policy - Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
