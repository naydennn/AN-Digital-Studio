# AN Digital Studio - Setup & Usage Instructions

## Architecture

- **WordPress** (your hosting) = Content management backend (blog posts, portfolio, services, about text)
- **Next.js** (Vercel) = Frontend website that visitors see
- **Communication** = WordPress exposes data via GraphQL API, Next.js fetches and displays it

---

## STEP 1: Install WordPress on Your Hosting

1. Log in to your hosting control panel (cPanel, Plesk, or your host's panel)
2. Find the one-click WordPress installer (Softaculous, Installatron, or similar)
3. Install WordPress on your domain
4. Set your admin username and a strong password
5. Confirm you can log in at `https://yourdomain.com/wp-admin`

---

## STEP 2: Install Required WordPress Plugins

Log in to WordPress admin and install these plugins (Plugins > Add New):

| Plugin | Purpose |
|--------|---------|
| **WPGraphQL** | Exposes WordPress data as a GraphQL API (essential for headless setup) |
| **Advanced Custom Fields (ACF)** | Custom fields for hero text, services, portfolio details, stats |
| **WPGraphQL for ACF** | Makes ACF fields available in the GraphQL API |

Activate all three after installation.

### Verify GraphQL is Working

1. Go to **GraphQL > Settings** in WordPress admin
2. Note the endpoint URL (usually `https://yourdomain.com/graphql`)
3. Visit that URL in your browser - you should see the GraphQL IDE

---

## STEP 3: Configure Environment Variables

1. In the `frontend` folder, copy `.env.example` to `.env.local`:
   ```
   copy .env.example .env.local
   ```
2. Edit `.env.local` and fill in your WordPress URLs:
   ```
   WORDPRESS_API_URL=https://yourdomain.com
   WORDPRESS_GRAPHQL_URL=https://yourdomain.com/graphql
   ```

---

## STEP 4: Run the Frontend Locally

Open a terminal in the `frontend` folder:

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## STEP 5: Deploy to Vercel

### First Time Setup

1. Create a free account at [vercel.com](https://vercel.com)
2. Push your project to a GitHub repository
3. In Vercel dashboard, click **Add New Project**
4. Import your GitHub repo
5. Set **Root Directory** to `frontend`
6. Add **Environment Variables**:
   - `WORDPRESS_API_URL` = `https://yourdomain.com`
   - `WORDPRESS_GRAPHQL_URL` = `https://yourdomain.com/graphql`
7. Click **Deploy**

### After Initial Setup

- Every `git push` to the `main` branch triggers automatic deployment
- Every branch/PR gets a unique preview URL for testing
- Custom domain: Go to Vercel project Settings > Domains > add your domain

---

## STEP 6: Connect Your Custom Domain

### In Vercel:
1. Go to your project Settings > Domains
2. Add your domain (e.g., `andigital.bg` or `www.andigital.bg`)
3. Vercel will show you DNS records to configure

### In Your Domain Registrar:
1. Add the DNS records Vercel provided (usually A record or CNAME)
2. Wait for DNS propagation (can take up to 48 hours, usually much faster)
3. Vercel automatically provisions SSL certificate

---

## Day-to-Day Content Management

All content is managed through your WordPress admin panel:

| Task | Where in WordPress Admin |
|------|--------------------------|
| Add/edit blog posts | Posts > Add New |
| Add/edit portfolio items | Portfolio > Add New |
| Update hero text | Pages > Home (ACF fields) |
| Update services | Pages > Home (ACF fields) |
| Update about section | Pages > Home (ACF fields) |
| Upload images | Media > Library |
| View contact form entries | Form Entries (sidebar menu) |

### Adding a Blog Post

1. Go to **Posts > Add New**
2. Enter title and content
3. Set a **Featured Image** (appears as thumbnail on blog listing)
4. Write an **Excerpt** (short preview text)
5. Assign **Categories** and **Tags**
6. Click **Publish**
7. Post appears on the website automatically within 60 seconds

### Adding a Portfolio Item

1. Go to **Portfolio > Add New**
2. Enter project title and description
3. Set a **Featured Image**
4. Fill in ACF fields: client name, project URL, technologies used, category
5. Click **Publish**

### Updating Homepage Sections

1. Go to **Pages > Home**
2. Scroll to the ACF field groups:
   - **Hero Section**: headline, subheadline, CTA button text and link
   - **About Section**: description, stats (projects count, clients count, years)
   - **Services Section**: each service title, description, icon
3. Update fields and click **Update**

---

## Useful Terminal Commands

Run these from the `frontend` folder:

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start local development server at localhost:3000 |
| `npm run build` | Create optimized production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Check code for errors and style issues |

---

## Troubleshooting

### Content not updating on the live site?
- ISR (Incremental Static Regeneration) revalidates every 60 seconds
- Force revalidation: redeploy on Vercel or wait for the revalidation interval

### GraphQL connection errors?
- Verify the GraphQL endpoint URL in `.env.local` is correct
- Check that WPGraphQL plugin is activated in WordPress
- Ensure your WordPress site allows CORS requests from your Vercel domain

### Images not loading?
- Check that your WordPress domain is listed in `next.config.ts` under `images.remotePatterns`
- Ensure images are uploaded via WordPress Media Library

### Build errors on Vercel?
- Check the build logs in Vercel dashboard
- Ensure all environment variables are set in Vercel project settings
- Run `npm run build` locally first to catch errors
