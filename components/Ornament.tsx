export function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      className={`mx-auto h-5 w-40 text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M0 12 H78" opacity="0.6" />
      <path d="M122 12 H200" opacity="0.6" />
      <path d="M100 12 C94 4, 84 4, 80 12 C84 20, 94 20, 100 12 C106 4, 116 4, 120 12 C116 20, 106 20, 100 12 Z" />
      <path d="M100 12 C99 8, 96 6, 92 6" opacity="0.7" />
      <path d="M100 12 C101 8, 104 6, 108 6" opacity="0.7" />
    </svg>
  );
}

export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2 30 C2 12, 12 2, 30 2" opacity="0.6" />
      <path d="M8 30 C8 16, 16 8, 30 8" opacity="0.85" />
      <path d="M8 30 C8 24, 12 20, 16 22" opacity="0.85" />
      <path d="M30 8 C24 8, 20 12, 22 16" opacity="0.85" />
      <circle cx="9" cy="29" r="1.6" fill="currentColor" stroke="none" opacity="0.85" />
    </svg>
  );
}

export function PetalBadge({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <g opacity="0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="20"
            cy="8"
            rx="3.2"
            ry="7"
            transform={`rotate(${i * 45} 20 20)`}
          />
        ))}
      </g>
    </svg>
  );
}
