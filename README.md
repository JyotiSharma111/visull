# Visull — Setup & Deployment Instructions

> Complete guide to configure, run locally, and deploy to production.

---

## What's inside

```
visull/
├── src/
│   ├── app/
│   │   ├── layout.js          ← Root layout with SEO metadata + JSON-LD
│   │   ├── page.js            ← Marketing homepage
│   │   ├── page.module.css    ← Homepage styles
│   │   ├── sitemap.js         ← Auto-generated sitemap
│   │   ├── robots.js          ← robots.txt
│   │   ├── api/auth/callback/ ← Supabase OAuth callback handler
│   │   ├── auth/
│   │   │   ├── layout.js      ← Two-panel auth layout
│   │   │   ├── login/         ← Login page
│   │   │   └── signup/        ← Signup page
│   │   └── app/               ← Protected dashboard (requires login)
│   ├── components/
│   │   ├── Nav.js             ← Marketing nav
│   │   ├── AppNav.js          ← App dashboard nav
│   │   └── auth/              ← Login / Signup form components
│   ├── lib/
│   │   ├── supabase-client.js ← Browser Supabase client
│   │   └── supabase-server.js ← Server Supabase client
│   └── styles/
│       └── globals.css        ← Design system tokens + global styles
├── middleware.js               ← Auth protection + cross-subdomain cookie
├── CROSS_SUBDOMAIN_AUTH.js    ← How to add auth to each tool
└── .env.example               ← Environment variables template
```

---

## Prerequisites

- Node.js 18+ 
- A Supabase account (free tier is fine): https://supabase.com
- A Vercel account (free): https://vercel.com
- Your domain: visull.com (or any domain you own)

---

## Step 1 — Set up Supabase (one-time, ~10 minutes)

### 1a. Create / identify your Supabase project

**If CyberGuard already has a Supabase project → use the SAME project.**
This is the key to universal login — all tools share one project.

1. Go to https://supabase.com → open your project (or create one)
2. Settings → API → copy:
   - **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 1b. Configure Auth redirect URLs

In Supabase: **Authentication → URL Configuration**

Set **Site URL** to:
```
https://app.visull.com
```

Add all these to **Redirect URLs**:
```
https://app.visull.com/**
https://app.visull.com/api/auth/callback
https://cyberguard.visull.com/**
https://reportmind.visull.com/**
http://localhost:3000/**
http://localhost:3000/api/auth/callback
```

> ⚠️ Missing redirect URLs are the #1 cause of auth errors. Double-check this.

### 1c. Enable Email auth

Authentication → Providers → Email → make sure it's enabled.

Optionally disable "Confirm email" during development for faster testing.

---

## Step 2 — Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CYBERGUARD_URL=https://cyberguard.visull.com
NEXT_PUBLIC_REPORTMIND_URL=https://reportmind.visull.com
```

---

## Step 3 — Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

> **Note on local cross-subdomain auth**: Browser cookies scoped to `.visull.com`
> don't work on localhost. During local development you'll need to log in separately
> on each tool. Cross-subdomain SSO only activates in production on *.visull.com.

---

## Step 4 — Deploy to Vercel (production)

### 4a. Push to GitHub

```bash
git init
git add .
git commit -m "Initial Visull commit"
git remote add origin https://github.com/YOUR_USERNAME/visull.git
git push -u origin main
```

### 4b. Import to Vercel

1. Go to https://vercel.com → New Project → Import from GitHub
2. Select the `visull` repo
3. Framework: **Next.js** (auto-detected)
4. Add environment variables (from your `.env.local`):
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   NEXT_PUBLIC_SITE_URL       = https://app.visull.com
   NEXT_PUBLIC_CYBERGUARD_URL = https://cyberguard.visull.com
   NEXT_PUBLIC_REPORTMIND_URL = https://reportmind.visull.com
   ```
5. Deploy

### 4c. Add your custom domain

In Vercel → your project → Settings → Domains:

- Add `app.visull.com` (for the login/dashboard hub)
- Add `visull.com` → redirect to `app.visull.com` OR point it here too

In your DNS provider (wherever visull.com is registered):
```
Type   Name   Value
CNAME  app    cname.vercel-dns.com
A      @      76.76.21.21
```

> Vercel will auto-provision an SSL certificate.

---

## Step 5 — Update CyberGuard for universal auth

Open `CROSS_SUBDOMAIN_AUTH.js` in this repo — it explains exactly how to update
CyberGuard to use the shared Supabase project and the cross-subdomain cookie.

**Key changes needed in CyberGuard:**

1. Make sure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` match visull's values
2. Replace the Supabase client initialisation with the cookie-scoped version from `CROSS_SUBDOMAIN_AUTH.js`
3. If the user isn't authenticated, redirect to `https://app.visull.com/auth/login?redirect=...`
4. Add `https://cyberguard.visull.com/**` to Supabase redirect URLs (done in Step 1b)

---

## Step 6 — Add future tools

For every new tool you build (e.g. `invoicing.visull.com`):

1. Use the **same Supabase project**
2. Copy the Supabase client from `CROSS_SUBDOMAIN_AUTH.js`
3. Add `https://invoicing.visull.com/**` to Supabase redirect URLs
4. Add a card for the tool in `/src/app/app/page.js` (the `TOOLS` array)
5. Add the tool URL to `.env` and Vercel env vars

That's it — the user's session automatically works on the new subdomain.

---

## SEO / AEO checklist (already done)

- ✅ Next.js metadata API (title, description, og:*, twitter:*)
- ✅ JSON-LD structured data: Organization, WebSite, SoftwareApplication ×2, FAQPage
- ✅ Semantic HTML (landmarks, article, header, footer, nav, main)
- ✅ aria-label on all interactive and landmark elements
- ✅ sitemap.xml (auto-generated via `/src/app/sitemap.js`)
- ✅ robots.txt (auto-generated via `/src/app/robots.js`)
- ✅ Canonical URL set
- ✅ OG image tag (add your actual og-image.png to /public)
- ✅ Mobile responsive

### To complete post-deploy:

1. **Create og-image.png** (1200×630px) and put it in `/public/`
2. **Submit sitemap** to Google Search Console: `https://visull.com/sitemap.xml`
3. **Add GSC verification** — uncomment `verification` in `src/app/layout.js`
4. **Set up Google Analytics / Plausible** — add script to layout.js

---

## Troubleshooting

**"Invalid login credentials"**
→ Check Supabase Auth → Users to confirm the account was created.
→ If email confirmation is on, the user must click the email link first.

**Redirect loop on login**
→ Check Supabase → Auth → URL Configuration → Site URL and Redirect URLs.
→ Make sure `NEXT_PUBLIC_SITE_URL` matches exactly what's in Supabase.

**Cross-subdomain session not working**
→ This only works in production on *.visull.com. Local dev requires separate logins per tool.
→ Check browser DevTools → Application → Cookies — the cookie domain should be `.visull.com`.

**Build error: "cookies() expects to be called in a Server Component"**
→ Any file that calls `createClient()` from `supabase-server.js` must be a Server Component (no `'use client'`).

---

## Environment variables reference

| Variable | Where used | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | Client | This app's URL |
| `NEXT_PUBLIC_CYBERGUARD_URL` | Client | CyberGuard app URL |
| `NEXT_PUBLIC_REPORTMIND_URL` | Client | ReportMind app URL |

---

Built for Visull · https://visull.com
