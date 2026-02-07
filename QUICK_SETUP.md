# Quick Setup Commands - GitHub & Vercel

## Summary of What's Done ✅

Your local repository is ready with 3 commits:
1. **Initial commit** - All project files (Next.js, WordPress integration, etc.)
2. **Documentation** - GitHub and Vercel setup guides
3. **Deployment checklist** - Quick reference for deployment

---

## Step 1: Create GitHub Repository (Browser)

1. Go to https://github.com/naydennn
2. Click **+** → **New repository**
3. **Name**: `AN-Digital-Studio`
4. **Description**: `Next.js + WordPress headless CMS portfolio and blog`
5. **Visibility**: Private (recommended)
6. ⚠️ **Do NOT** initialize with README, .gitignore, or license
7. Click **Create repository**

---

## Step 2: Push to GitHub (PowerShell)

After creating the repository, run these commands in PowerShell:

```powershell
cd "c:\Users\Anita\Desktop\AN Digital Studio"

# Add GitHub as the remote
git remote add origin https://github.com/naydennn/AN-Digital-Studio.git

# Make sure you're on main branch
git branch -M main

# Push all commits to GitHub
git push -u origin main
```

**Expected output:**
```
Enumerating objects: ...
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### Troubleshooting GitHub Push

If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Or authenticate via SSH

Create a Personal Access Token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click **Generate new token** → **Tokens (classic)**
3. Name: `git-cli`
4. Scopes: Check `repo` and `workflow`
5. Copy the token
6. When git prompts for password, paste the token

---

## Step 3: Deploy to Vercel (Browser)

### A. Sign Up / Log In to Vercel

1. Go to https://vercel.com
2. Click **Sign Up** → **Continue with GitHub**
3. Authorize Vercel to access your GitHub account

### B. Create New Project

1. After authentication, click **Create New Project**
2. Find and click on repository: `AN-Digital-Studio`
3. Click **Import**

### C. Configure Settings

On the Vercel import page:

**Root Directory:** 
- Click the input field
- Select: `frontend`

**Framework Preset:**
- Should auto-detect: Next.js ✓

**Build and Output Settings:**
- Leave as default

**Environment Variables:**
Add these two variables:

```
Name: WORDPRESS_API_URL
Value: https://yourdomain.com

Name: WORDPRESS_GRAPHQL_URL
Value: https://yourdomain.com/graphql
```

⚠️ **Replace `yourdomain.com` with your actual WordPress site URL**

For each variable, ensure these are checked:
- ✓ Production
- ✓ Preview
- ✓ Development

### D. Deploy

Click **Deploy** button

Vercel will:
1. Build your Next.js app
2. Run tests/linting
3. Deploy to edge network
4. Provide a preview URL

**This takes 2-5 minutes**

---

## Step 4: Access Your Live Site

Once deployment completes, Vercel shows you:
- **Production URL**: `https://an-digital-studio-[random].vercel.app`
- **Deployment logs**: See any build/runtime errors

Visit the URL to verify your site is live!

---

## Step 5: Configure Custom Domain (Optional)

### In Vercel

1. Go to your Vercel project → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain: `yourdomain.com` or `www.yourdomain.com`
4. Vercel shows you DNS records to add

### In Your Domain Registrar

1. Log into your registrar (GoDaddy, Namecheap, etc.)
2. Go to DNS management
3. Add the records Vercel provided
4. Wait for DNS to propagate (15 minutes to 48 hours)

Once DNS propagates:
- ✅ Your domain redirects to Vercel
- ✅ SSL certificate auto-provisioned
- ✅ Site accessible at your custom domain

---

## Future Updates: Deploy Changes

### Local Development
```powershell
cd "c:\Users\Anita\Desktop\AN Digital Studio\frontend"
npm run dev
# Open http://localhost:3000
# Test your changes
```

### Push Changes to Live
```powershell
cd "c:\Users\Anita\Desktop\AN Digital Studio"

# Make sure you're in the repo root
git add .
git commit -m "Description of your changes"
git push
```

### What Happens Next
- Vercel automatically detects the push
- Triggers a new build
- Deploys to production
- Your live site updates

**No manual deployment needed after first setup!**

---

## Important Notes

✅ **Security**
- No credentials committed to Git
- .env files in .gitignore
- Environment variables set in Vercel dashboard only
- Safe to make repository public if needed

✅ **Environment Variables**
- Different in Vercel vs local .env.local
- Vercel variables never exposed in code
- Each environment (dev/preview/production) can have different values

✅ **Automatic Deployment**
- Every git push to `main` → deploys to production
- Pull requests → get preview URLs for testing
- Fast and reliable

---

## Verification Checklist

After setup, verify these:

- [ ] Repository exists on GitHub
- [ ] All files pushed to GitHub
- [ ] Project imported into Vercel
- [ ] Environment variables set in Vercel
- [ ] Deployment completed successfully
- [ ] Live site accessible at Vercel URL
- [ ] Content loads from WordPress GraphQL
- [ ] Images display correctly
- [ ] Multi-language switching works

---

## Useful URLs

| Service | URL |
|---------|-----|
| GitHub | https://github.com/naydennn/AN-Digital-Studio |
| Vercel Dashboard | https://vercel.com/dashboard |
| Your Live Site | https://an-digital-studio-xxx.vercel.app |
| WordPress Admin | https://yourdomain.com/wp-admin |

---

## Need Help?

### Build Fails on Vercel
- Check Vercel build logs for errors
- Run `npm run build` locally in `frontend` folder
- Ensure environment variables are set
- Check that .env.local is in .gitignore

### Content Not Showing
- Verify WORDPRESS_API_URL and WORDPRESS_GRAPHQL_URL
- Check WordPress GraphQL endpoint is accessible
- Ensure WPGraphQL plugin is active on WordPress
- Check browser console for API errors

### Can't Push to GitHub
- Check remote is set: `git remote -v`
- Verify GitHub token has `repo` scope
- Try using HTTPS instead of SSH

### Site Shows 404 or Error
- Check Vercel deployment logs
- Verify `Root Directory` set to `frontend`
- Ensure all environment variables are present
- Check that WordPress is accessible

---

## Time Estimates

- Creating GitHub repository: **2 minutes**
- Pushing to GitHub: **1-2 minutes**
- Setting up Vercel: **5 minutes**
- First deployment: **2-5 minutes**
- **Total: ~15 minutes**

---

**Ready? Start with Step 1 above! 🚀**
