import Image from "next/image";
import Link from "next/link";

const AUTH_BG_DECOR = (
  <>
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] max-md:w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#dc02ce,transparent)] opacity-25 blur-3xl"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-10 left-1/2 h-[440px] w-[1100px] max-md:w-full -translate-x-1/2 rounded-full bg-[#5c53fe] opacity-20 blur-[140px]"
    />
  </>
);

/* Shared shell for /sign-in and /sign-up */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-[#08080a] px-4 py-10">
      {AUTH_BG_DECOR}

      <Link href="/" className="relative z-10" aria-label="HireLoop home">
        <Image
          src="/hireloop-logo.png"
          alt="HireLoop"
          width={154}
          height={44}
          priority
          className="h-11 w-auto"
        />
      </Link>

      <div className="relative z-10 mt-10 flex w-full flex-1 items-start justify-center">
        {children}
      </div>
    </main>
  );
}
