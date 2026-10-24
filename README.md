# Devfolio — Personal Developer Portfolio

A personal developer portfolio built with Next.js to showcase my projects, technical skills, professional experience, and interests.

**Live Website:** https://monxdev.vercel.app

## Features

- **Home** — Introduction, developer profile, and coding activity.
- **Projects** — Project showcases, technologies, and links to source code and live demos.
- **Blog** — Technical articles and personal insights written in MDX.
- **Experience** — Professional experience and career journey.
- **Resume** — Access to my professional resume.
- **Development Setup** — Editor configuration, development tools, and setup.
- **Books, Movies & Gears** — Books, movies, devices, and tools I enjoy.
- **Contact Form** — Contact submissions delivered through Resend.
- **Live Coding Activity** — WakaTime integration for coding activity and editor status.
- **Spotify Integration** — Spotify API integration for music-related data.
- **Analytics** — Umami analytics and Vercel Analytics.
- **SEO** — Page metadata, Open Graph previews, sitemap, robots.txt, and a custom not-found page.
- **Responsive Design** — Layouts optimized for desktop and mobile.
- **Dark & Light Themes** — Theme switching with animated transitions.

## Tech Stack

- **Framework:** Next.js App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Content:** MDX
- **Icons:** Lucide React
- **Coding Activity:** WakaTime API
- **Music Integration:** Spotify API
- **Email:** Resend
- **Analytics:** Umami and Vercel Analytics
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd devfolio-v2
```

Replace `<your-repository-url>` with your Git repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file to create your local configuration.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env.local
```

**macOS / Linux:**

```bash
cp .env.example .env.local
```

Open `.env.local` and add your own credentials and configuration values.

Not every integration is required to run the portfolio. Configure the variables needed by the features you want to use.

| Variable                            | Purpose                                                    |
| ----------------------------------- | ---------------------------------------------------------- |
| `SPOTIFY_CLIENT_ID`                 | Spotify application client ID                              |
| `SPOTIFY_CLIENT_SECRET`             | Spotify application client secret                          |
| `SPOTIFY_REFRESH_TOKEN`             | Spotify refresh token                                      |
| `SPOTIFY_REDIRECT_URI`              | Spotify OAuth redirect URI                                 |
| `SITE_URL`                          | Website base URL used for metadata and canonical URLs      |
| `WAKATIME_OAUTH_TOKEN`              | Personal WakaTime OAuth token                              |
| `WAKATIME_TIMEZONE`                 | Timezone used for coding activity summaries                |
| `WAKATIME_ONLINE_THRESHOLD_SECONDS` | Threshold used to determine recent coding activity         |
| `VERCEL_TOKEN`                      | Vercel API token, if required by the analytics integration |
| `NEXT_PUBLIC_UMAMI_SRC`             | Umami tracking script URL                                  |
| `NEXT_PUBLIC_UMAMI_ID`              | Umami website ID                                           |
| `RESEND_API_KEY`                    | Resend API key for contact emails                          |
| `CONTACT_EMAIL`                     | Recipient email for contact submissions                    |
| `RESEND_FROM_EMAIL`                 | Sender address authorized by Resend                        |

**Important:** Never commit `.env.local` or share real API keys, secrets, refresh tokens, or OAuth tokens. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser, so only use them for values intended to be public.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server          |
| `npm run lint`  | Run ESLint                           |

## Deployment

This portfolio can be deployed on Vercel.

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables in your Vercel project settings.
4. Set `SITE_URL` to your production website URL.
5. Deploy the application.
6. Verify the contact form, Spotify integration, WakaTime widget, analytics, metadata, sitemap, and robots.txt.

Environment variables configured in `.env.local` are not automatically added to Vercel. Add the required values in the Vercel dashboard.

## Contributing

Suggestions and improvements are welcome. If you plan to reuse or adapt this project, please respect the personal content, branding, and assets included in the portfolio.

## License

No open-source license is currently specified. Unless a license is added to this repository, do not assume that the project's code, branding, content, or assets are licensed for unrestricted reuse.
