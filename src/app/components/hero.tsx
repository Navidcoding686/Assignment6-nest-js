import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="px-5">
      <section className="mx-auto mt-2 grid max-w-7xl items-center gap-10 rounded-[10px] border border-gray-700 bg-[#15171D] px-5 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-block rounded-full border border-[#B6FF00]/30 bg-[#B6FF00]/10 px-4 py-2 text-xs font-bold tracking-widest text-[#B6FF00]">
            WORKOUT LIBRARY
          </span>

          <h1 className="mt-9 text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            TRAIN WITH INTENT.
            <br />
            <span className="text-[#B6FF00]">
              LOG EVERY SET.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-400">
            Build better training habits with a focused workout
            library. Choose your exercises, build your plan and
            track every session.
          </p>

          <Link
            href="#library"
            className="mt-8 inline-flex rounded-full bg-[#B6FF00] px-7 py-4 text-sm font-black tracking-wide text-black transition hover:scale-105"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        <div className="flex justify-end">
          <Image
            src= "/assets/banner.png"
            width={400}
            height={400}
            alt="gym"
          />
        </div>
      </section>
    </div>
  );
}

