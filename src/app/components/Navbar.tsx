"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/app/context/PlanContext";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={25}
            height={25}
          />

          <Link
            href="/"
            className="text-2xl font-black tracking-wider"
          >
            <span className="text-[#B6FF00]">FIT</span>
            <span>LOG</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 sm:flex">
          <Link
            href="/"
            className={`text-sm font-semibold transition ${
              pathname === "/"
                ? "text-[#B6FF00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-semibold transition ${
              pathname === "/my-plan"
                ? "text-[#B6FF00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#B6FF00] px-4 py-2 text-xs font-bold text-black transition hover:opacity-80"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white transition hover:border-[#B6FF00] hover:text-[#B6FF00]"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </header>
  );
}

