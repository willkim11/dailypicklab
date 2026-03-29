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
      className="tool-card group block p-6 rounded-xl border transition-all duration-150 hover:shadow-md"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
    >
      <div className="flex flex-col gap-3">
        <span className="text-3xl" aria-hidden="true">{icon}</span>
        <div>
          <h2
            className="font-semibold text-lg leading-tight transition-colors"
            style={{ color: "var(--color-text)" }}
          >
            {title}
          </h2>
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
