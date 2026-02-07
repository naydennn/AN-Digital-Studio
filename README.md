# AN Digital Studio

Next.js + WordPress headless CMS portfolio and blog platform.

## Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create `frontend/.env.local`:

```
WORDPRESS_API_URL=https://yourdomain.com
WORDPRESS_GRAPHQL_URL=https://yourdomain.com/graphql
```

## Deploy to Vercel

- Root Directory: `frontend`
- Framework: Next.js
- Add environment variables in Vercel dashboard
