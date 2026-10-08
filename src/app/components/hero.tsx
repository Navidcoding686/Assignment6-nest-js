import Image from "next/image";
import Link from "next/link";
import { IoArrowDownCircleOutline } from "react-icons/io5";

export default function Hero() {
  return (
    <div className="px-4 sm:px-5">
      <section className="mx-auto mt-2 grid max-w-7xl items-center gap-10 rounded-[10px] border border-gray-700 bg-[#15171D] px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        
        
        <div>
          <span className="inline-block rounded-full border border-[#B6FF00]/30 bg-[#B6FF00]/10 px-4 py-2 text-xs font-bold tracking-widest text-[#B6FF00]">
            WORKOUT LIBRARY
          </span>

          <h1 className="mt-8 text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            TRAIN WITH INTENT.
            <br />
            <span className="text-[#B6FF00]">
              LOG EVERY SET.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#B6FF00] px-6 py-4 text-sm font-black tracking-wide text-black transition hover:scale-105"
          >
            <IoArrowDownCircleOutline className="text-lg" />
            BROWSE WORKOUTS
          </Link>
        </div>

        
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/assets/banner.png"
            width={400}
            height={400}
            alt="gym"
            className="h-auto w-full max-w-[400px]"
          />
        </div>
      </section>
    </div>
  );
}