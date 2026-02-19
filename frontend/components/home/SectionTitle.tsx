export default function SectionTitle({
  title,
  subtitle,
  actionLabel,
  actionHref = "#",
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end items-start justify-between gap-4 sm:gap-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-white/65 max-w-prose leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {actionLabel && (
        <a
          href={actionHref}
          className="mt-2 sm:mt-0 inline-flex rounded-full border border-white/15 px-4 sm:px-5 py-2 text-sm text-white/85 hover:bg-white/10 transition"
        >
          {actionLabel}
        </a>
      )}
    </div>
  );
}