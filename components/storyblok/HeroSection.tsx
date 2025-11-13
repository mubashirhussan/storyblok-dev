import { StoryblokComponent } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react/rsc";

import type { SbBlokData } from "@storyblok/react/rsc";

type RichTextDocument = {
  type: string;
  content?: RichTextDocument[];
  text?: string;
};

function extractPlainText(doc?: RichTextDocument): string {
  if (!doc) return "";
  if (doc.type === "doc") {
    return (
      doc.content
        ?.map((node) => extractPlainText(node))
        .filter(Boolean)
        .join(" ")
        .trim() ?? ""
    );
  }
  if (doc.text) return doc.text;
  if (!doc.content) return "";
  return doc.content
    .map((node) => extractPlainText(node))
    .filter(Boolean)
    .join(doc.type === "paragraph" ? " " : "");
}

export type HeroSectionBlok = SbBlokData & {
  eyebrow?: string;
  headline?: string | RichTextDocument;
  subheading?: string;
  description?: string;
  buttons?: SbBlokData[];
  cards?: SbBlokData[];
  background_note?: string;
};

export default function HeroSection({ blok }: { blok: HeroSectionBlok }) {
  const editableProps =
    "_editable" in blok
      ? storyblokEditable(blok)
      : { "data-blok-c": blok._uid };

  const headlineText =
    typeof blok.headline === "string"
      ? blok.headline
      : extractPlainText(blok.headline);

  return (
    <section
      {...editableProps}
      className="relative isolate h-screen overflow-hidden  border border-white/15 bg-slate-950 px-6 text-white shadow-[0_40px_120px_rgba(15,23,42,0.45)] sm:px-16 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.45),_rgba(17,24,39,0.9))]" />
      <div className="pointer-events-none absolute -top-1/3 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-sky-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-12 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto flex h-full flex-col items-center justify-center gap-8 py-12 text-center lg:flex-row lg:items-center lg:gap-12 lg:text-left">
        <div className="flex-1 space-y-6">
          {blok.eyebrow ? (
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-sky-100">
              {blok.eyebrow}
            </span>
          ) : null}
          {headlineText ? (
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {headlineText}
            </h1>
          ) : null}
          {blok.subheading ? (
            <p className="text-lg text-sky-100/80 sm:text-xl">
              {blok.subheading}
            </p>
          ) : null}
          {blok.description ? (
            <p className="text-base leading-relaxed text-sky-100/70 sm:text-lg">
              {blok.description}
            </p>
          ) : null}

          {blok.buttons && blok.buttons.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 lg:justify-start">
              {blok.buttons.map((nestedBlok, index) => (
                <StoryblokComponent
                  blok={nestedBlok}
                  key={`button-${nestedBlok._uid ?? index}`}
                />
              ))}
            </div>
          ) : null}
        </div>

        {blok.cards && blok.cards.length > 0 ? (
          <div className="flex-1 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {blok.cards.map((cardBlok, index) => (
                <StoryblokComponent
                  blok={cardBlok}
                  key={`card-${cardBlok._uid ?? index}`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
