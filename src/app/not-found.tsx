import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
      <div className="text-center">
        <p className="text-7xl font-black text-[#B6FF00]">
          404
        </p>

        <h1 className="mt-4 text-3xl font-black">
          Page Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#B6FF00] px-6 py-3 text-sm font-black text-black"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}