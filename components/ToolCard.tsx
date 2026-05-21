import Link from "next/link";

interface ToolCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
}

export default function ToolCard({ href, icon, title, description }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="tool-card group block rounded-xl border p-6 transition-colors duration-150"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}
    >
      <div className="flex flex-col gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-md text-xl"
          style={{ backgroundColor: "var(--color-bg-elevated)" }}
          aria-hidden="true"
        >
          {icon}
        </span>
        <div>
          <h2
            className="text-lg font-bold leading-tight tracking-tight transition-colors"
            style={{ color: "var(--color-text)" }}
          >
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
