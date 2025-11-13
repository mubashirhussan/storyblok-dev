import {
  apiPlugin,
  getStoryblokApi,
  storyblokInit,
} from "@storyblok/react/rsc";

import { storyblokComponents } from "@/components/storyblok";

let initialized = false;

export function initStoryblok() {
  if (initialized) {
    return;
  }

  storyblokInit({
    accessToken:
      process.env.STORYBLOK_ACCESS_TOKEN ??
      process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN ??
      "",
    use: [apiPlugin],
    components: storyblokComponents,
  });

  initialized = true;
}

export async function fetchStory(slug: string) {
  const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;

  if (!token) {
    return null;
  }

  try {
    const api = getStoryblokApi();
    const { data } = await api.get(`cdn/stories/${slug}`, {
      version: process.env.NODE_ENV === "production" ? "published" : "draft",
      resolve_relations: "hero_section.buttons",
    });

    return data.story;
  } catch (error) {
    console.error("Storyblok fetch failed:", error);
    return null;
  }
}
