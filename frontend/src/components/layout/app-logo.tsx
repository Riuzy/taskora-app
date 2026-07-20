import Link from "next/link";

export default function AppLogo() {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-3"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">
        T
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-tight">
          TASKORA
        </h1>
      </div>
    </Link>
  );
}