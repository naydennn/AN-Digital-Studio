# GitHub Setup & Deployment to Vercel

This guide walks you through pushing your local AN Digital Studio project to GitHub and deploying it to Vercel.

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and log in with username `naydennn`
2. Click the **+** icon in the top right → **New repository**
3. Enter repository name: `AN-Digital-Studio`
4. Description (optional): `Next.js + WordPress headless CMS portfolio and blog`
5. Choose **Private** (to keep it secure)
6. Do NOT initialize with README (we already have one)
7. Click **Create repository**

## Step 2: Push Local Repository to GitHub

After creating the repository on GitHub, you'll see instructions. Follow these commands:

```powershell
cd "c:\Users\Anita\Desktop\AN Digital Studio"

# Add GitHub as remote
git remote add origin https://github.com/naydennn/AN-Digital-Studio.git

# Rename branch to main (if not already)
git branch -M main

# Push local commits to GitHub
git push -u origin main
```

**Expected output:**
```
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## Step 3: Verify on GitHub

1. Go to [github.com/naydennn/AN-Digital-Studio](https://github.com/naydennn/AN-Digital-Studio)
2. You should see all your files there
3. The commit history should show your initial commit

## Step 4: Connect GitHub to Vercel

### A. Create Vercel Account & Link GitHub

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign up**
3. Choose **Continue with GitHub**
4. You may be asked to authorize Vercel to access your GitHub account
5. Click **Authorize** to allow Vercel to read your repositories

### B. Import Project to Vercel

1. After authentication, click **Create New Project** or **Add New Project**
2. Select the repository: `naydennn/AN-Digital-Studio`
3. Click **Import**

### C. Configure Project Settings

On the Vercel import screen:

1. **Root Directory**: Set to `frontend`
2. **Framework**: Should auto-detect as `Next.js`
3. **Build Command**: Default is fine (or use `npm run build`)
4. **Output Directory**: Default is fine

### D. Add Environment Variables

1. Click **Environment Variables** section
2. Add the following variables:

   ```
   WORDPRESS_API_URL = https://yourdomain.com
   WORDPRESS_GRAPHQL_URL = https://yourdomain.com/graphql
   ```
   
   ⚠️ Replace `yourdomain.com` with your actual WordPress domain

3. For each variable, select which environments it applies to:
   - Production
   - Preview
   - Development (optional)

### E. Deploy

1. Click **Deploy**
2. Vercel will start building your project
3. Wait for deployment to complete (usually 2-3 minutes)
4. You'll see a preview URL like: `https://an-digital-studio-xxxx.vercel.app`

## Step 5: Configure Custom Domain (Optional)

### In Vercel:

1. Go to your project Settings → **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `andigital.bg` or `www.andigital.bg`)
4. Vercel will show DNS records to configure

### In Your Domain Registrar:

1. Log into your domain registrar (GoDaddy, Namecheap, etc.)
2. Go to DNS settings
3. Add the DNS records Vercel provided
4. Wait for DNS to propagate (usually 24-48 hours, often faster)
5. Vercel will automatically provision an SSL certificate

## Step 6: Verify Deployment

1. Visit your Vercel URL: `https://an-digital-studio-xxxx.vercel.app`
2. You should see your AN Digital Studio website
3. Check that content loads from WordPress GraphQL API

## Future Updates & Deployment

After initial setup, deployment is automatic:

1. **Make changes locally**
   ```powershell
   cd frontend
   npm run dev  # Test locally
   ```

2. **Commit and push to GitHub**
   ```powershell
   git add .
   git commit -m "Your message describing the changes"
   git push
   ```

3. **Automatic deployment**
   - Vercel automatically deploys when you push to the `main` branch
   - Each push gets a unique preview URL
   - You can see deployment progress in Vercel dashboard

## Troubleshooting

### Cannot push to GitHub
**Error:** `fatal: 'origin' does not appear to be a 'git' repository`

**Solution:** Make sure you ran `git remote add origin https://github.com/naydennn/AN-Digital-Studio.git`

### Build fails on Vercel
**Solution:** 
1. Run `npm run build` locally in the `frontend` folder to check for errors
2. Check Vercel build logs for specific error messages
3. Ensure all environment variables are set in Vercel project settings

### Content not showing on deployed site
**Solution:**
1. Verify environment variables in Vercel match your WordPress URLs
2. Check that WordPress GraphQL endpoint is accessible
3. Check CORS settings on your WordPress installation
4. Review Vercel logs for API errors

### Can't connect GitHub to Vercel
**Solution:**
1. Make sure your GitHub account (`naydennn`) is connected to Vercel
2. Go to Vercel Settings → **Git** to manage GitHub integration
3. May need to re-authorize GitHub connection

## Quick Reference

| Service | URL | User |
|---------|-----|------|
| GitHub | https://github.com/naydennn | naydennn |
| Vercel | https://vercel.com | (same GitHub account) |
| Repository | https://github.com/naydennn/AN-Digital-Studio | - |
| Live Site | https://an-digital-studio-xxxx.vercel.app | (after deployment) |

## Important Notes

- ✅ All sensitive data (.env files, credentials) are in .gitignore
- ✅ Only configuration and code are committed to GitHub
- ✅ Each team member can pull from GitHub and create their own .env.local
- ✅ Environment variables in Vercel are separate from GitHub (secure)
- ⚠️ Never commit .env files or credentials to GitHub

## Next Steps

1. Follow the steps above to push to GitHub
2. Connect GitHub to Vercel
3. Set environment variables in Vercel
4. Deploy your project
5. Test the live site
6. Configure custom domain (optional)
7. Continue managing content through WordPress admin panel

For detailed local development instructions, see INSTRUCTIONS.md
