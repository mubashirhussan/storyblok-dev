## Xubrtech Careers Landing Page

This project is a polished landing page for highlighting concierge, merchandising, and maintenance opportunities across the DMV region. It is powered by [Next.js](https://nextjs.org) with a modular content model managed in [Storyblok](https://www.storyblok.com/).

### Prerequisites

- Node.js 18+
- A Storyblok space (Preview API token)

### 1. Configure Storyblok

Create the following components in Storyblok so the UI renders dynamically:

| Component | Fields | Notes |
|-----------|--------|-------|
| `landing_page` | `body` (Blocks) | Allow `hero_section` blocks |
| `hero_section` | `eyebrow` (Text), `headline` (Text), `subheading` (Textarea), `description` (Richtext or Textarea), `buttons` (Blocks), `cards` (Blocks) | Limit buttons to `button_item`, cards to `hero_card` |
| `button_item` | `label` (Text), `variant` (Option: `primary`, `secondary`, `ghost`), `link` (Link field) | `variant` toggles button styling |
| `hero_card` | `title` (Text), `description` (Textarea), `badge` (optional Text) | Cards populate the grid on the right |

Add a story named `home` and compose it with one `hero_section`. Populate it using the content provided by the client.

### 2. Environment Variables

Create an `.env.local` file at the project root with your Storyblok token:

```bash
STORYBLOK_ACCESS_TOKEN=your_preview_token
```

Restart the development server after adding the environment variable.

### 3. Local Development

```bash
pnpm install
pnpm dev
# or npm/yarn/bun as needed
```

Visit [http://localhost:3000](http://localhost:3000) to view the page. If the token is missing or incorrect, a styled fallback version of the hero section is displayed.

### 4. Deployment

Deploy with your provider of choice. Remember to configure the `STORYBLOK_ACCESS_TOKEN` environment variable in your hosting platform.

---

Built with ❤️ for the Xubrtech talent team.
