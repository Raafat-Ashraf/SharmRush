import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ocean-gradient text-center text-white">
      <h1 className="mb-4 text-8xl font-black text-gradient-aqua">404</h1>
      <p className="mb-8 text-xl text-white/70">Page not found — the wave carried it away.</p>
      <Link
        href="/"
        className="rounded-full bg-aqua-500 px-8 py-3 font-bold text-white shadow-glow transition hover:bg-aqua-400"
      >
        Back to Home
      </Link>
    </div>
  );
}
