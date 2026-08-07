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
