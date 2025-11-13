import ButtonItem from "./ButtonItem";
import HeroCard from "./HeroCard";
import HeroSection from "./HeroSection";
import Page from "./Page";

export const storyblokComponents = {
  landing_page: Page,
  page: Page,
  hero_section: HeroSection,
  "hero-section": HeroSection,
  button_item: ButtonItem,
  "button-item": ButtonItem,
  hero_card: HeroCard,
  "hero-card": HeroCard,
};

export type { HeroCardBlok } from "./HeroCard";
export type { HeroSectionBlok } from "./HeroSection";
export type { PageBlok } from "./Page";
export type { ButtonItemBlok } from "./ButtonItem";


