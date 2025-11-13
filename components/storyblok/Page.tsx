import { StoryblokComponent } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react/rsc";

import type { SbBlokData } from "@storyblok/react/rsc";

export type PageBlok = SbBlokData & {
  body?: SbBlokData[];
};

export default function Page({ blok }: { blok: PageBlok }) {
  const editableProps =
    "_editable" in blok
      ? storyblokEditable(blok)
      : { "data-blok-c": blok._uid };

  return (
    <div {...editableProps} className="flex flex-col gap-24">
      {blok.body?.map((nestedBlok, index) => (
        <StoryblokComponent
          blok={nestedBlok}
          key={`blok-${nestedBlok._uid ?? index}`}
        />
      ))}
    </div>
  );
}
