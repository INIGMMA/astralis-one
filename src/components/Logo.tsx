import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={cn("h-9 w-9", className)} aria-hidden>
      <defs>
        <linearGradient id="lg-ring" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="55%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
      </defs>
      <ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="8.5"
        stroke="url(#lg-ring)"
        strokeWidth="1.6"
        transform="rotate(-24 24 24)"
      />
      <circle cx="24" cy="24" r="9.5" stroke="url(#lg-ring)" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="4.4" fill="url(#lg-ring)" />
      <path
        d="M24 6.5l1.5 3.6 3.6 1.5-3.6 1.5L24 16.7l-1.5-3.6-3.6-1.5 3.6-1.5L24 6.5z"
        fill="#e879f9"
      />
      <circle cx="40.5" cy="30.5" r="1.7" fill="#67e8f9" />
    </svg>
  );
}

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      {!compact && (
        <span className="font-display text-[15px] font-700 tracking-[0.28em] text-ink">
          ASTRALIS
        </span>
      )}
    </span>
  );
}
