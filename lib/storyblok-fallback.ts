import type { SbBlokData } from "@storyblok/react/rsc";

const fallbackButtons: SbBlokData[] = [
  {
    _uid: "btn-start",
    component: "button-item",
    label: "Start Now",
    variant: "primary",
    style: "yellow",
    link: { url: "#start" },
  },
  {
    _uid: "btn-featured",
    component: "button-item",
    label: "Featured Jobs",
    variant: "secondary",
    style: "white",
    link: { url: "#featured" },
  },
];

const fallbackCards: SbBlokData[] = [
  {
    _uid: "card-concierge",
    component: "hero-card",
    title: "Concierge",
    description:
      "Deliver five-star experiences for residents and guests in luxury communities across the DMV.",
    tag_text: "HIRED",
  },
  {
    _uid: "card-grocery",
    component: "hero-card",
    title: "Grocery Merchandiser",
    description:
      "Keep regional grocery brands thriving with eye-catching in-store merchandising and logistics.",
    tag_text: "HIRED",
  },
  {
    _uid: "card-maintenance",
    component: "hero-card",
    title: "Maintenance Technician",
    description:
      "Support property teams with preventative care and rapid response that residents can count on.",
    tag_text: "HIRED",
  },
];

export const fallbackStory = {
  content: {
    _uid: "landing-home",
    component: "page",
    body: [
      {
        _uid: "hero-home",
        component: "hero-section",
        eyebrow: "Headline",
        headline:
          "We help you find the right job in Maryland, Virginia, and Washington DC.",
        subheading: "Our career paths allow you to double your earning power.",
        description:
          "We connect ambitious talent with top employers across hospitality, facilities, and retail—backed by ongoing training, coaching, and community support that keeps you moving forward.",
        buttons: fallbackButtons,
        cards: fallbackCards,
      },
    ],
  },
};


