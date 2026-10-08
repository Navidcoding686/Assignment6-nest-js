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
            height={15}
            alt="Logo"
            className="rotate-135"
          />
          <span className="text-[#B6FF00]">FIT</span>
          LOG
          </div>
        </div>

        <p className="text-sm text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}