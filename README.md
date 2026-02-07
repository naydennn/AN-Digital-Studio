# AN Digital Studio

A modern, headless WordPress + Next.js portfolio and blog platform. This project demonstrates a decoupled architecture where WordPress serves as a content management backend via GraphQL API, while Next.js provides the responsive frontend experience.

## Architecture

- **Backend**: WordPress (hosted on your domain) with GraphQL API via WPGraphQL
- **Frontend**: Next.js with TypeScript (deployed to Vercel)
- **Communication**: GraphQL API fetches content from WordPress
- **Languages**: English and Bulgarian (i18n support)

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- WordPress instance with GraphQL enabled (see INSTRUCTIONS.md)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "AN Digital Studio"
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local`:
   ```env
   WORDPRESS_API_URL=https://yourdomain.com
   WORDPRESS_GRAPHQL_URL=https://yourdomain.com/graphql
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
AN Digital Studio/
├── frontend/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/               # Next.js App Router
│   │   ├── components/        # React components
│   │   ├── lib/               # Utilities and GraphQL queries
│   │   └── i18n/              # Internationalization (EN, BG)
│   ├── public/                # Static assets
│   ├── .env.example           # Environment variables template
│   ├── next.config.ts         # Next.js configuration
│   ├── tsconfig.json          # TypeScript configuration
│   └── package.json           # Dependencies
├── INSTRUCTIONS.md            # Detailed setup and deployment guide
└── README.md                  # This file
```

## Available Scripts

Run these from the `frontend` directory:

- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Create production build
- `npm run start` - Run production build locally
- `npm run lint` - Check code quality

## Features

- **Multi-language Support**: English and Bulgarian
- **Blog**: Dynamic blog posts fetched from WordPress
- **Portfolio**: Showcase your work with featured projects
- **Services**: Display your services with descriptions
- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Next.js with ISR (Incremental Static Regeneration)
- **SEO Ready**: Meta tags, sitemaps, robots.txt

## Content Management

All content is managed through WordPress admin panel at your WordPress site. Changes appear automatically on the frontend (ISR revalidates every 60 seconds).

### Managing Content

- **Blog Posts**: Posts > Add New
- **Portfolio**: Portfolio > Add New
- **Services**: Pages > Home (ACF fields)
- **Hero Section**: Pages > Home (ACF fields)
- **Images**: Media > Library

## Deployment

### Deploy to Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Import this GitHub repository
3. Set Root Directory to `frontend`
4. Add environment variables:
   - `WORDPRESS_API_URL`
   - `WORDPRESS_GRAPHQL_URL`
5. Click Deploy

Every push to main branch triggers automatic deployment.

## Environment Variables

Required environment variables (see `.env.example`):

| Variable | Description | Example |
|----------|-------------|---------|
| `WORDPRESS_API_URL` | WordPress site URL | `https://yourdomain.com` |
| `WORDPRESS_GRAPHQL_URL` | WordPress GraphQL endpoint | `https://yourdomain.com/graphql` |

## Technology Stack

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **GraphQL Client**: Built-in fetch (or Apollo Client)
- **Hosting**: Vercel
- **CMS**: WordPress with WPGraphQL

## Requirements

WordPress plugins required for full functionality:
- WPGraphQL
- Advanced Custom Fields (ACF)
- WPGraphQL for ACF

See INSTRUCTIONS.md for detailed setup.

## Troubleshooting

### Content not updating?
- ISR revalidates every 60 seconds
- Force revalidation by redeploying on Vercel

### GraphQL connection errors?
- Verify endpoint URL in `.env.local`
- Check WPGraphQL plugin is activated
- Check CORS settings

### Images not loading?
- Verify WordPress domain in `next.config.ts`
- Ensure images uploaded via WordPress Media Library

### Build errors?
- Check Vercel build logs
- Run `npm run build` locally first
- Verify all environment variables are set

## Support & Documentation

- See `INSTRUCTIONS.md` for detailed setup and deployment guide
- Visit [Next.js docs](https://nextjs.org/docs)
- Visit [WPGraphQL docs](https://www.wpgraphql.com/docs/)

## License

All content and custom code in this repository is proprietary to AN Digital Studio.

## Author

Created by: Anita  
Website: AN Digital Studio
