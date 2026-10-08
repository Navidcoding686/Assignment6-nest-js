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
      <div className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:h-20 sm:flex-row sm:items-center sm:justify-between sm:py-0">
        
        {/* Logo */}
        <div className="flex items-center justify-between sm:justify-start">
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

          {/* Mobile counters */}
          <div className="flex items-center gap-2 sm:hidden">
            <Link
              href="/my-plan"
              className="rounded-full bg-[#B6FF00] px-3 py-2 text-[10px] font-bold text-black"
            >
              Plan {plan.length}
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full border border-white/20 px-3 py-2 text-[10px] font-bold text-white"
            >
              Saved {saved.length}
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex items-center justify-center gap-8 sm:mt-0">
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

        {/* Desktop counters */}
        <div className="hidden items-center gap-2 sm:flex">
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