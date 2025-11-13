import Image from "next/image";

import { storyblokEditable } from "@storyblok/react/rsc";

import type { SbBlokData } from "@storyblok/react/rsc";

type HeroCardImage = {
  filename?: string;
  alt?: string;
  focus?: string;
};

export type HeroCardBlok = SbBlokData & {
  title?: string;
  description?: string;
  badge?: string;
  tag_text?: string;
  image?: HeroCardImage;
};

export default function HeroCard({ blok }: { blok: HeroCardBlok }) {
  const editableProps =
    "_editable" in blok
      ? storyblokEditable(blok)
      : { "data-blok-c": blok._uid };

  const badgeLabel = blok.badge ?? blok.tag_text;

  return (
    <article
      {...editableProps}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
    >
      <div className="pointer-events-none absolute inset-0 translate-y-12 scale-125 bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100" />
      <div className="relative z-10 flex min-h-[220px] flex-col gap-4">
        {blok.image?.filename ? (
          <div className="relative md:h-32 md:w-32 h-64 w-full  overflow-hidden rounded-2xl border border-white/15 bg-slate-900">
            <Image
              src={blok.image.filename}
              alt={blok.image.alt || blok.title || "Career Role"}
              fill
              sizes="128px"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : null}
        <div className="space-y-3">
          {badgeLabel ? (
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-sky-100">
              {badgeLabel}
            </span>
          ) : null}
          {blok.title ? (
            <h3 className="text-lg font-semibold text-white sm:text-xl">
              {blok.title}
            </h3>
          ) : null}
          {blok.description ? (
            <p className="text-sm leading-relaxed text-sky-100/70">
              {blok.description}
            </p>
          ) : (
            <p className="text-sm leading-relaxed text-sky-100/60">
              Discover growth-ready roles, steady hours, and teams that care.
            </p>
          )}
        </div>
        <span className="mt-auto text-xs font-semibold uppercase tracking-[0.35em] text-sky-100/60">
          Explore Role
        </span>
      </div>
    </article>
  );
}
