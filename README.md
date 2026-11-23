# Devfolio — Personal Developer Portfolio

A modern, highly interactive personal developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. Designed to showcase projects, technical writing, professional experience, live coding activity, and digital experiments with high-performance animations and real-time API integrations.

**Live Website:** [mohanx.in](https://mohanx.in)

---

## Table of Contents

- [Features Overview](#features-overview)
  - [Showcase & Content](#showcase--content)
  - [Real-Time Live Integrations](#real-time-live-integrations)
  - [UI/UX & Interactive Delight](#uiux--interactive-delight)
  - [Personal & Lifestyle Showcases](#personal--lifestyle-showcases)
  - [SEO, Analytics & Performance](#seo-analytics--performance)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Set Up the Database](#4-set-up-the-database)
  - [5. Run the Development Server](#5-run-the-development-server)
- [Integration Setup Guides](#integration-setup-guides)
  - [Spotify API Setup (Built-in OAuth)](#spotify-api-setup-built-in-oauth)
  - [Dodo Payments & Webhooks Setup](#dodo-payments--webhooks-setup)
  - [WakaTime Integration](#wakatime-integration)
  - [Resend Contact Form](#resend-contact-form)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [License & Attributions](#license--attributions)

---

## Features Overview

### Showcase & Content

- **Dynamic Hero & Profile** — Developer introduction with animated role transitions, social profile links, and quick availability status.
- **Projects & In-Depth Case Studies (`/projects`, `/projects/[slug]`)** — MDX-powered project showcases with stack tags, status badges (`Working` / `Building`), links to GitHub and live deployments, and automated related-project recommendations based on tech stack matching.
- **Technical Blog (`/blog`, `/blog/[slug]`)** — MDX-driven technical articles with reading progress, tag filters, table of contents (`BlogTableOfContents`), author metadata, and related articles (`RelatedBlogs`).
- **Automated RSS Feed (`/blog/feed.xml`)** — Fully valid RSS 2.0 XML feed generated dynamically for feed readers and syndication.
- **Work Experience (`/work`)** — Interactive career journey timeline detailing companies, roles, key accomplishments, dates, locations, and hover-expanding technology badges.
- **Embedded Resume (`/resume`)** — Clean, responsive embedded PDF resume viewer with Google Drive preview integration.
- **Client Testimonials** — Feedback and endorsement carousel from collaborators and clients.

### Real-Time Live Integrations

- **Live Spotify Player** — Real-time music widget showing currently playing or recently played tracks, album cover art, artist name, and direct Spotify links, polled periodically with smooth UI state fallbacks.
- **Live WakaTime Coding Activity** — Displays live coding metrics (active editor such as Cursor or VS Code, project name, current file, and an active running stopwatch timer), falling back to yesterday's recorded coding time when offline. Includes server-side 5-minute caching and rate-limit cooldown handling.
- **GitHub Contribution Calendar & Repo Stars** — 365-day visual GitHub activity calendar with custom light and dark color scales. Responsive block sizing via `ResizeObserver`, plus dynamic repository creation tracking with celebration emojis and star counts on new repo days.
- **Sponsorship & Supporter Wall (Dodo Payments + Prisma PostgreSQL + Vercel Blob)**:
  - One-time seat sponsorship model with instant checkout sessions powered by **Dodo Payments**.
  - Secure webhook handler (`/api/webhooks/dodo`) for automatic seat activation and refund processing.
  - Dedicated claiming portal (`/sponsor/claim`) where supporters can submit their display name, link, and upload a custom avatar/logo to **Vercel Blob** storage.
  - Interactive supporter grid with slot counters, DiceBear fallback avatars, and a moderator kill switch (`hidden` column).
- **Vercel Web Analytics Insights Chart** — Interactive 7-day visitors and pageviews chart built with **Recharts**, featuring dynamic linear gradient dimming effects calculated on mouse hover via `requestAnimationFrame`.
- **Global Visitors Pill (`AnalyticsPill`)** — Real-time total visitor counter pill featuring a custom multi-color smiley illustration.
- **Resend Contact Form (`/contact`)** — Functional contact form built with React Hook Form and Zod validation, complete with in-memory IP rate-limiting (5 requests/min), live message character counter (1000 max), Sonner toast feedback, and direct email delivery via **Resend**.

### UI/UX & Interactive Delight

- **macOS-Style Magnification Dock (`Navbar`)** — Floating bottom navigation bar powered by `motion/react` with proximity-based icon scaling and spring physics.
- **View Transitions Theme Switcher** — Smooth dark/light mode toggle with native View Transitions API animations (circle reveals, directional polygon wipes, and blur transitions), plus a global keyboard shortcut: press `d` to toggle theme.
- **Interactive Spring Cursor (`CustomCursor`)** — Physics-based custom mouse cursor with `mix-blend-difference` that expands over interactive elements and plays audio feedback on click.
- **Oneko Retro Pixel Cat Companion** — Classic nostalgic pixel cat that runs around and chases the mouse cursor across the screen (can be enabled or disabled in `src/config/Cat.ts`).
- **AI Chatbot Swarm Easter Egg (`SwarmTrigger`)** — Detects visitors arriving via UTM parameters from AI tools (`chatgpt.com`, `claude.ai`, `grok.com`, `x.ai`, `gemini.google.com`, `perplexity.ai`) and triggers a special visual swarm animation script.
- **Page Navigation Progress Bar (`NavigationProgress`)** — Minimalist top progress bar indicating internal route transitions.
- **Smooth Staggered Reveals (`Reveal`)** — Smooth scroll reveal animations throughout page sections.
- **Random Wisdom Quotes** — Thoughtfully curated quotes from literature, philosophy, anime, and science randomized on every visit.

### Personal & Lifestyle Showcases

- **Side Quests (`/side-quests`)** — Highlights of life outside of programming:
  - Interactive **Recharts Radar Chart** displaying gym personal records (Bench, Squat, Leg Press, Shoulder, Deadlift) alongside animated percentage progress bars.
  - Running and swimming athletic milestones.
  - Multilingual proficiency tags (English, Hindi, Marathi, Kannada, Tamil, French).
- **Development Setup (`/setup`)** — Complete Cursor / VS Code configuration walkthrough with downloadable Fira Code font archive, extensions list, and copyable `settings.json`.
- **Gears & Tools (`/gears`)** — Curated gear directory covering hardware devices (laptop, phone, audio), browser extensions, desktop software, and code editor extensions with direct links.
- **Bookshelf (`/books`)** — Visual collection of favorite and influential books organized by genre (Self-help, Finance, Business, Thriller, Romance, Philosophy).
- **Watchlist (`/movies`)** — Recommended movie and cinema catalog with release years.
- **Designs (`/designs`)** — Creative visual explorations and UI experiments showcase.

### SEO, Analytics & Performance

- **Next.js 16 App Router & React 19** — Leveraging the latest React Server Components, server actions, and Next.js caching (`use cache`, `cacheLife`).
- **Tailwind CSS v4** — High-performance styling powered by Turbopack.
- **SEO & Social Sharing** — Full Open Graph and Twitter Card metadata per route, auto-generated `sitemap.ts`, `robots.ts`, and canonical URLs.
- **Dual Analytics Support** — Pre-configured for both **Vercel Web Analytics / Speed Insights** and privacy-friendly **Umami Analytics**.
- **Code Quality & Git Hooks** — Prettier with automatic Tailwind class sorting, ESLint, Husky pre-commit hooks, and Commitlint for conventional commits.

---

## Tech Stack

| Category               | Technologies                                                                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework**          | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React Server Components)                                                                                                   |
| **UI Library**         | [React 19](https://react.dev/)                                                                                                                                                       |
| **Language**           | [TypeScript 5](https://www.typescriptlang.org/)                                                                                                                                      |
| **Styling**            | [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)                                                                                                     |
| **Animation & Motion** | [Motion](https://motion.dev/) (`motion/react`), View Transitions API, CSS Keyframes                                                                                                  |
| **Data Visualization** | [Recharts](https://recharts.org/), [react-activity-calendar](https://github.com/grubersjoe/react-activity-calendar)                                                                  |
| **Database & ORM**     | [PostgreSQL](https://www.postgresql.org/), [Prisma ORM 7](https://www.prisma.io/)                                                                                                    |
| **Payments**           | [Dodo Payments](https://dodopayments.com/) (`@dodopayments/nextjs`, `dodopayments`)                                                                                                  |
| **Cloud Storage**      | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (`@vercel/blob`)                                                                                                          |
| **Content & Markdown** | [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote), [gray-matter](https://github.com/jonschlinkert/gray-matter), [rehype-slug](https://github.com/rehypejs/rehype-slug) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/), [@hookform/resolvers](https://github.com/react-hook-form/resolvers)                                        |
| **Notifications**      | [Sonner](https://sonner.emilkowal.ski/)                                                                                                                                              |
| **Email Service**      | [Resend](https://resend.com/)                                                                                                                                                        |
| **Music Integration**  | [Spotify Web API](https://developer.spotify.com/documentation/web-api)                                                                                                               |
| **Coding Metrics**     | [WakaTime API](https://wakatime.com/developers)                                                                                                                                      |
| **Analytics**          | [Vercel Analytics & Speed Insights](https://vercel.com/analytics), [Umami Analytics](https://umami.is/)                                                                              |
| **Tooling & Hooks**    | [Husky](https://typicode.github.io/husky/), [Commitlint](https://commitlint.js.org/), [Prettier](https://prettier.io/), [ESLint](https://eslint.org/)                                |

---

## Project Structure

```text
devfolio-v2/
├── prisma/
│   ├── schema.prisma              # Prisma database schema (Sponsor model)
│   ├── migrations/                # Database migrations
│   └── prisma7.config.ts          # Prisma 7 configuration file
├── public/
│   ├── assets/                    # Audio files, icons, downloadable assets
│   ├── books/                     # Book cover artwork
│   ├── meta/                      # Open Graph social preview images
│   ├── oneko/                     # Retro pixel cat scripts and sprite assets
│   └── projects/                  # Project preview screenshots
├── src/
│   ├── app/                       # Next.js 16 App Router pages and APIs
│   │   ├── api/                   # Serverless API routes
│   │   │   ├── analytics/         # Vercel analytics endpoints (daily & total)
│   │   │   ├── contact/           # Resend contact form submission handler
│   │   │   ├── github/            # GitHub contributions and repositories proxy
│   │   │   ├── sponsor/           # Dodo checkout session & seat claiming
│   │   │   ├── spotify/           # Spotify player, authorize & callback OAuth
│   │   │   ├── wakatime/          # WakaTime coding stats endpoint
│   │   │   └── webhooks/dodo/     # Dodo Payments webhook handler
│   │   ├── blog/                  # Blog listing, MDX reader, and RSS feed
│   │   ├── books/                 # Books showcase page
│   │   ├── contact/               # Contact form page
│   │   ├── designs/               # UI/UX design concepts page
│   │   ├── gears/                 # Hardware devices and dev tools directory
│   │   ├── movies/                # Watchlist page
│   │   ├── projects/              # Projects gallery and dynamic case studies
│   │   ├── resume/                # Embedded resume viewer
│   │   ├── setup/                 # Editor configuration and extensions guide
│   │   ├── side-quests/           # Gym stats radar chart, languages, activities
│   │   ├── sponsor/               # Sponsor page and seat claiming portal
│   │   ├── work/                  # Career experience timeline
│   │   ├── layout.tsx             # Root layout with providers & global components
│   │   ├── page.tsx               # Portfolio homepage
│   │   ├── robots.ts              # Robots.txt generator
│   │   └── sitemap.ts             # Dynamic XML sitemap generator
│   ├── components/                # Modular React components
│   │   ├── analytics/             # Insights chart, total visitors pill, Umami
│   │   ├── blogs/                 # Blog cards, table of contents, related posts
│   │   ├── common/                # Navbar dock, custom cursor, theme toggle, cat
│   │   ├── home/                  # Homepage hero, spotify, wakatime, github, etc.
│   │   ├── projects/              # Project cards, filters, and detail views
│   │   ├── setup/                 # Editor hero, settings viewer, setup guides
│   │   ├── sponsors/              # Supporter wall, modal, and seat claim form
│   │   └── ui/                    # Reusable shadcn/ui primitives
│   ├── config/                    # Personal info, social links, meta configs
│   ├── context/                   # Sound and interactive contexts
│   ├── data/                      # MDX content files
│   │   ├── blog/                  # MDX blog posts
│   │   └── projects/              # MDX project case studies
│   ├── lib/                       # Utility libraries, stats parsers, API clients
│   │   ├── sponsors/              # Dodo client, seat helpers, validators
│   │   ├── stats/                 # Analytics, WakaTime, and SEO helpers
│   │   ├── blog.ts                # MDX blog reader and parser
│   │   ├── github.ts              # Activity calendar and contributions filter
│   │   ├── prisma.ts              # Prisma PostgreSQL client singleton
│   │   ├── projects.ts            # MDX projects reader and related matcher
│   │   └── spotify.ts             # Spotify Web API access token and track parser
│   ├── providers/                 # Theme and application context providers
│   ├── svgs/                      # Custom vector icons (socials, devices, tech)
│   ├── types/                     # TypeScript interfaces and type definitions
│   └── validations/               # Zod validation schemas
├── .env.example                   # Template for environment variables
├── commitlint.config.mjs          # Commitlint conventional commits config
├── next.config.ts                 # Next.js configuration (images, turbopack, cache)
└── package.json                   # Project metadata and dependencies
```

---

## Getting Started

### Prerequisites

- **Node.js** 20.x or later
- **npm** or **pnpm**
- **Git**
- A **PostgreSQL** database (optional for local testing without the sponsor wall; required for Dodo Payments seat storage). Options include local PostgreSQL, [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [Railway](https://railway.app/).

### 1. Clone the Repository

```bash
git clone https://github.com/igmoni/devfolio-v2.git
cd devfolio-v2
```

### 2. Install Dependencies

```bash
npm install
```

> **Note:** The `postinstall` script automatically runs `prisma generate` to build the Prisma Client artifacts.

### 3. Configure Environment Variables

Create your local environment configuration file:

**macOS / Linux:**

```bash
cp .env.example .env.local
```

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` and provide your credentials. The portfolio is built gracefully: features without configured keys will hide or display a clean fallback rather than crashing the application.

### 4. Set Up the Database

If using the sponsor features, run the Prisma database migrations against your PostgreSQL database:

```bash
npx prisma migrate dev --name init
```

To inspect or manage your database tables visually:

```bash
npx prisma studio
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Integration Setup Guides

### Spotify API Setup (Built-in OAuth)

The portfolio includes built-in OAuth helper routes to retrieve your `SPOTIFY_REFRESH_TOKEN` effortlessly:

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create an application.
2. In your Spotify app settings, add `http://localhost:3000/api/spotify/callback` to the **Redirect URIs**.
3. Copy the **Client ID** and **Client Secret** into your `.env.local`:
   ```env
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/callback
   ```
4. Start your development server (`npm run dev`) and visit:
   ```text
   http://localhost:3000/api/spotify/authorize
   ```
5. Log in with your Spotify account and authorize the application. You will be redirected back with a JSON response containing your `refresh_token`.
6. Copy the token into your `.env.local`:
   ```env
   SPOTIFY_REFRESH_TOKEN=your_generated_refresh_token
   ```

### Dodo Payments & Webhooks Setup

To enable one-time supporter seat purchases and the live supporter wall:

1. Create an account on [Dodo Payments](https://dodopayments.com/).
2. Create a one-time product in the Dodo dashboard and copy the product ID (`pdt_...`).
3. In Dodo Payments, create a Webhook endpoint pointing to:
   ```text
   https://yourdomain.com/api/webhooks/dodo
   ```
   Select events: `payment.succeeded`, `refund.succeeded`.
4. Add the API key, product ID, and webhook signing secret to `.env.local`:
   ```env
   DODO_PAYMENTS_API_KEY=your_dodo_api_key
   DODO_PAYMENTS_ENVIRONMENT=test_mode
   DODO_PRODUCT_ID=pdt_xxxxxxxx
   DODO_PAYMENTS_RETURN_URL=http://localhost:3000/sponsor/claim
   DODO_PAYMENTS_WEBHOOK_KEY=whsec_xxxxxxxx
   ```
5. Set up **Vercel Blob** storage for sponsor avatar/logo uploads:
   ```env
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxx
   ```

### WakaTime Integration

To display your real-time coding editor status and daily duration:

1. Create an account on [WakaTime](https://wakatime.com/).
2. Install the WakaTime extension in your editor (VS Code, Cursor, etc.).
3. Generate a personal OAuth token or API key from [WakaTime Settings > Integrations](https://wakatime.com/settings/account).
4. Add the token and your timezone to `.env.local`:
   ```env
   WAKATIME_OAUTH_TOKEN=sec_xxxxxxxx
   WAKATIME_TIMEZONE=Asia/Kolkata
   WAKATIME_ONLINE_THRESHOLD_SECONDS=180
   ```

### Resend Contact Form

To receive emails from the contact form:

1. Create a free account at [Resend](https://resend.com/).
2. Generate an API Key under **API Keys**.
3. Add the credentials to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxx
   CONTACT_EMAIL=your_personal_email@gmail.com
   RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
   ```

---

## Environment Variables

| Variable                              | Required | Default / Example                            | Purpose                                                                   |
| ------------------------------------- | -------- | -------------------------------------------- | ------------------------------------------------------------------------- |
| `SITE_URL`                            | Yes      | `http://localhost:3000`                      | Canonical site URL used for metadata, Open Graph, and sitemaps.           |
| `DATABASE_URL`                        | Optional | `postgresql://user:pass@localhost:5432/db`   | PostgreSQL connection string for Prisma ORM (Sponsors).                   |
| `SPOTIFY_CLIENT_ID`                   | Optional | `xxxx`                                       | Spotify Developer application Client ID.                                  |
| `SPOTIFY_CLIENT_SECRET`               | Optional | `xxxx`                                       | Spotify Developer application Client Secret.                              |
| `SPOTIFY_REFRESH_TOKEN`               | Optional | `xxxx`                                       | Spotify OAuth refresh token for user playback state.                      |
| `SPOTIFY_REDIRECT_URI`                | Optional | `http://localhost:3000/api/spotify/callback` | OAuth redirect URI configured in Spotify Dashboard.                       |
| `WAKATIME_OAUTH_TOKEN`                | Optional | `xxxx`                                       | WakaTime API token for fetching live coding activity.                     |
| `WAKATIME_TIMEZONE`                   | Optional | `Asia/Kolkata`                               | Timezone used for daily WakaTime coding summaries.                        |
| `WAKATIME_ONLINE_THRESHOLD_SECONDS`   | Optional | `180`                                        | Threshold (in seconds) to consider an editor heartbeat online.            |
| `GITHUB_TOKEN`                        | Optional | `ghp_xxxx`                                   | GitHub Personal Access Token to raise rate limits on `/api/github/repos`. |
| `DODO_PAYMENTS_API_KEY`               | Optional | `xxxx`                                       | Dodo Payments API key for checkout sessions.                              |
| `DODO_PAYMENTS_ENVIRONMENT`           | Optional | `test_mode`                                  | `test_mode` for development, `live_mode` for production.                  |
| `DODO_PRODUCT_ID`                     | Optional | `pdt_xxxx`                                   | Product ID for the sponsor seat checkout session.                         |
| `DODO_PAYMENTS_RETURN_URL`            | Optional | `http://localhost:3000/sponsor/claim`        | Return URL redirecting sponsors to claim their seat.                      |
| `DODO_PAYMENTS_WEBHOOK_KEY`           | Optional | `whsec_xxxx`                                 | Signing secret used to verify incoming Dodo webhooks.                     |
| `BLOB_READ_WRITE_TOKEN`               | Optional | `vercel_blob_rw_xxxx`                        | Vercel Blob token for supporter logo & image uploads.                     |
| `VERCEL_TOKEN_ID` / `VERCEL_TOKEN`    | Optional | `xxxx`                                       | Vercel personal token to query the Web Analytics API.                     |
| `VERCEL_PROJECT_ID`                   | Optional | `prj_xxxx`                                   | Vercel Project ID used by the Insights analytics chart.                   |
| `VERCEL_TEAM_ID`                      | Optional | `team_xxxx`                                  | Vercel Team ID (if deploying under a team account).                       |
| `NEXT_PUBLIC_UMAMI_SRC` / `UMAMI_SRC` | Optional | `https://analytics.domain.com/script.js`     | Script URL for Umami analytics.                                           |
| `NEXT_PUBLIC_UMAMI_ID` / `UMAMI_ID`   | Optional | `xxxx-xxxx`                                  | Umami website tracking ID.                                                |
| `RESEND_API_KEY`                      | Optional | `re_xxxx`                                    | Resend API key for sending contact form emails.                           |
| `CONTACT_EMAIL`                       | Optional | `you@domain.com`                             | Destination inbox for contact submissions.                                |
| `RESEND_FROM_EMAIL`                   | Optional | `Devfolio <onboarding@resend.dev>`           | Sender email address authorized in Resend.                                |
| `NOTRA_GEO_TOKEN`                     | Optional | `xxxx`                                       | Geo Proxy analytics token (if utilizing Notra proxy).                     |

---

## Available Scripts

| Command                  | Description                                               |
| ------------------------ | --------------------------------------------------------- |
| `npm run dev`            | Starts the Next.js development server with Turbopack.     |
| `npm run build`          | Builds the application for production.                    |
| `npm run start`          | Starts the production server.                             |
| `npm run lint`           | Runs ESLint to verify code quality and conventions.       |
| `npm run format`         | Automatically formats codebase files using Prettier.      |
| `npm run format:check`   | Checks code formatting against Prettier rules.            |
| `npx prisma migrate dev` | Applies database migrations locally.                      |
| `npx prisma studio`      | Opens the visual database management GUI in your browser. |

---

## Deployment

### Deploying on Vercel

The fastest way to deploy this portfolio is on the [Vercel Platform](https://vercel.com/):

1. Push your repository to GitHub.
2. Import the project into Vercel.
3. In the Vercel project settings, navigate to **Environment Variables** and add all relevant variables from your `.env.local`.
4. Ensure `SITE_URL` is set to your production domain (e.g., `https://mohanx.in`).
5. Set up a PostgreSQL database (e.g. Neon or Vercel Postgres) and add `DATABASE_URL`.
6. Attach a **Vercel Blob** store to the project to automatically populate `BLOB_READ_WRITE_TOKEN`.
7. Configure the Dodo Payments webhook in production:
   - Endpoint: `https://yourdomain.com/api/webhooks/dodo`
   - Set `DODO_PAYMENTS_ENVIRONMENT=live_mode`
   - Set `DODO_PAYMENTS_WEBHOOK_KEY`
8. Deploy! Next.js will build the project, run Prisma client generation, compile MDX content, and serve optimized assets.

---

## License & Attributions

- **Personal Content & Assets:** The personal writing, resume, brand identity, custom illustrations, and project case study assets belong to the author. If using this repository as a template, please replace personal information, images, projects, and credentials with your own.
- **Open Source Libraries:** All third-party libraries, icons, and packages remain under their respective open-source licenses (MIT, Apache 2.0, etc.).
