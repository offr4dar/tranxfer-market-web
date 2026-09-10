/** The page-level title on a legal/policy page (privacy, terms,
 * safeguarding, ...) — e.g. "Privacy policy." */
export function PolicyTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="min-w-full text-center font-heading text-[90px] font-semibold uppercase leading-[80px] text-black">
      {children}
    </h1>
  );
}

/** A numbered section on a legal/policy page (privacy, terms,
 * safeguarding, ...) — the orange "N. Title" heading plus its body. */
export function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-start gap-[20px]">
      <h2 className="w-full font-heading text-[30px] font-semibold uppercase leading-[28px] text-primary-orange">
        {title}
      </h2>
      {children}
    </div>
  );
}

/** A sub-heading within a PolicySection (e.g. "2.1 Player Profile Data"). */
export function PolicySubheading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="w-full font-heading text-[24px] font-semibold uppercase leading-[28px] text-black">
      {children}
    </h3>
  );
}

/** Body paragraph shared styling for policy pages. */
export function PolicyParagraph({ children }: { children: React.ReactNode }) {
  return <p className="w-full font-body text-[16px] leading-[1.21] tracking-[0.32px] text-black">{children}</p>;
}

/** Bulleted list shared styling for policy pages. */
export function PolicyList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="w-full list-disc space-y-[10px] pl-[24px] font-body text-[16px] leading-[1.21] tracking-[0.32px] text-black">
      {children}
    </ul>
  );
}

/** The "Effective date / Last reviewed / ..." key-value block under a
 * policy page's title. */
export function PolicyMetaTable({ rows }: { rows: [label: string, value: string][] }) {
  return (
    <div className="flex w-full flex-col gap-[10px] bg-black/8 p-[20px] font-body text-[16px] leading-[1.21] tracking-[0.32px] text-black">
      {rows.map(([label, value]) => (
        <div key={label} className="flex w-full gap-[10px]">
          <p className="flex-1">{label}</p>
          <p className="flex-1">{value}</p>
        </div>
      ))}
    </div>
  );
}
