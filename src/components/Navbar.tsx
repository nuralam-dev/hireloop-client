"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
] as const;

function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center"
      aria-label="HireLoop home"
    >
      <Image
        src="/images/logo.png"
        alt="HireLoop"
        width={154}
        height={44}
        priority
        className="h-11 w-auto"
      />
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

const linkClasses = cn(
  "text-base text-[#ededeff2] transition-colors hover:text-white",
  "data-[active=true]:font-semibold data-[active=true]:text-white",
);

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  console.log(session, "user session");

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Sign out failed:", error.message);
      return;
    }

    console.log("Successfully signed out");
  };

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto w-full max-w-[1320px]">
        <nav
          className="flex h-[74px] items-center justify-between rounded-2xl bg-[#222222] pl-6 pr-4 ring-1 ring-white/[0.07] shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
          aria-label="Main navigation"
        >
          <Logo />

          {/* Desktop */}
          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={isActive(pathname, link.href)}
                  className={linkClasses}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <span aria-hidden="true" className="h-px w-6 bg-[#a8a8a8]/70" />

            <div className="flex items-center gap-4">
              {session?.user ? (
                <>
                  <span className="text-white">
                    Welcome {session.user.name}
                  </span>
                  <Button
                    onClick={handleSignOut}
                    nativeButton={false}
                    className="h-[52px] rounded-xl bg-transparent px-6 text-lg font-semibold text-[#5c53fe] hover:bg-white/5"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    render={<Link href="/sign-in" />}
                    nativeButton={false}
                    className="h-[52px] rounded-xl bg-transparent px-6 text-lg font-semibold text-[#5c53fe] hover:bg-white/5"
                  >
                    Sign In
                  </Button>
                  <Button
                    render={<Link href="/sign-up" />}
                    nativeButton={false}
                    className="h-[52px] rounded-xl bg-[#5c53fe] px-6 text-lg text-white ring-1 ring-[#090a15] hover:bg-[#4b45e0]"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="text-[#ededeff2] hover:bg-white/10 md:hidden"
                />
              }
            >
              <Menu />
            </SheetTrigger>

            {/* Default Sheet margins/paddings removed */}
            <SheetContent
              showCloseButton={false}
              className="gap-0 bg-[#1a1a1f] p-0 text-[#ededeff2] ring-1 ring-white/[0.07]"
            >
              <div className="flex items-center justify-between border-b border-white/[0.07] p-6">
                <Logo />
              </div>

              <div className="flex flex-col p-6">
                <div className="flex flex-col gap-6">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      data-active={isActive(pathname, link.href)}
                      className={cn(
                        "text-lg text-[#ededeff2] transition-colors hover:text-white",
                        "data-[active=true]:font-semibold data-[active=true]:text-white",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <span
                  aria-hidden="true"
                  className="my-6 h-px w-full bg-[#a8a8a8]/20"
                />

                <div className="flex flex-col gap-3">
                  <Button
                    render={<Link href="/sign-in" />}
                    nativeButton={false}
                    className="h-[52px] rounded-xl bg-transparent text-lg font-semibold text-[#5c53fe] hover:bg-white/5"
                  >
                    Sign In
                  </Button>
                  <Button
                    render={<Link href="/sign-up" />}
                    nativeButton={false}
                    className="h-[52px] rounded-xl bg-[#5c53fe] text-lg text-white ring-1 ring-[#090a15] hover:bg-[#4b45e0]"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
              <SheetTitle className="sr-only">Menu</SheetTitle>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
