import Link from "next/link";

import { storyblokEditable } from "@storyblok/react/rsc";

import type { SbBlokData } from "@storyblok/react/rsc";

type LinkField =
  | string
  | (SbBlokData & {
      url?: string;
      cached_url?: string;
      linktype?: string;
      target?: string;
    });

export type ButtonItemBlok = SbBlokData & {
  label?: string;
  link?: LinkField;
  variant?: "primary" | "secondary" | "ghost";
  style?: string;
};

const baseClasses =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<string, string> = {
  primary:
    "bg-sky-400 text-slate-950 shadow-[0_20px_45px_rgba(56,189,248,0.35)] hover:-translate-y-0.5 hover:bg-sky-300 focus-visible:outline-sky-200",
  secondary:
    "border border-white/30 bg-white/10 text-white hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20 focus-visible:outline-white/60",
  ghost:
    "text-white/80 hover:-translate-y-0.5 hover:text-white focus-visible:outline-white/40",
  yellow:
    "bg-amber-300 text-slate-950 shadow-[0_20px_40px_rgba(253,224,71,0.35)] hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline-amber-100",
  white:
    "border border-white/30 bg-white/90 text-slate-950 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-white/70",
};

const arrowIcon = (
  <svg
    aria-hidden="true"
    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 3l4 4-4 4"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function resolveHref(link?: LinkField): { href: string; target?: string } {
  if (!link) {
    return { href: "#" };
  }

  if (typeof link === "string") {
    return { href: link };
  }

  if (link.linktype === "story" && "cached_url" in link) {
    const cached = (link.cached_url ?? "").replace(/^\/+/, "");
    return { href: cached ? `/${cached}` : "/" };
  }

  if (link.linktype === "asset" && "url" in link) {
    return { href: link.url ?? "#", target: "_blank" };
  }

  return {
    href: ("url" in link && link.url) || ("cached_url" in link && link.cached_url)
      ? (link.url ?? `/${link.cached_url}`)
      : "#",
    target: link.target,
  };
}

export default function ButtonItem({ blok }: { blok: ButtonItemBlok }) {
  const editableProps =
    "_editable" in blok ? storyblokEditable(blok) : { "data-blok-c": blok._uid };

  const { href, target } = resolveHref(blok.link);
  const rawVariant = blok.variant ?? blok.style;
  const variantKey =
    typeof rawVariant === "string"
      ? rawVariant.toLowerCase().replace(/[^a-z]/g, "")
      : "primary";
  const variantClass = variants[variantKey] ?? variants.primary;

  return (
    <Link
      {...editableProps}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`group ${baseClasses} ${variantClass}`}
    >
      <span>{blok.label ?? "Learn More"}</span>
      {arrowIcon}
    </Link>
  );
}


