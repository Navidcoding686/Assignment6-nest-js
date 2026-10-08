import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xl font-black tracking-wider">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              width={25}
              height={25}
              alt="Logo"
              className="rotate-135"
            />

            <span>
              <span className="text-[#B6FF00]">FIT</span>
              LOG
            </span>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 sm:text-right sm:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}