import {} from "@storyblok/react/rsc";
import { fetchStory, initStoryblok } from "@/lib/storyblok";
import { fallbackStory } from "@/lib/storyblok-fallback";
import { StoryblokComponent } from "@storyblok/react";

initStoryblok();

export default async function Home() {
  const slug = "home_test";
  const story = await fetchStory(slug);
  const isFallback = !story;
  const content = story?.content ?? fallbackStory.content;

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.25),_rgba(15,23,42,0.95))]" />
      <div className="pointer-events-none absolute -top-40 left-1/4 -z-20 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="mx-auto flex w-full  flex-col gap-24">
        {content ? <StoryblokComponent blok={content} /> : null}
      </div>
      {isFallback ? (
        <p className="mx-auto mt-16 max-w-3xl text-center text-xs uppercase tracking-[0.35em] text-white/40">
          Displaying preview content. Provide a Storyblok token to load live
          data.
        </p>
      ) : null}
    </main>
  );
}
