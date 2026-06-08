# Cloudflare Deployment Guide — Visull + CyberGuard + ReportMind

## Architecture overview (Cloudflare)

```
visull.com          → Cloudflare Pages (Next.js static export — marketing site + login hub)
app.visull.com      → Cloudflare Pages (same repo or separate, the auth hub)
cyberguard.visull.com → Cloudflare Pages (existing CyberGuard repo — React/Vite)
reportmind.visull.com → Cloudflare Pages (ReportMind repo — React/Vite)
```

All apps share the same Supabase project. Auth cookies are scoped to `.visull.com`.
The backend (Express/Node scans) stays on Railway — Cloudflare Pages is front-end only.

---

## PART 1 — Deploy Visull hub to Cloudflare Pages

### 1a. Important — Next.js on Cloudflare Pages

The `next.config.js` uses `output: 'export'` which creates a fully static site.
This means:
- ✅ Marketing homepage, FAQ, pricing — all work perfectly
- ✅ Login and signup pages — work (client-side Supabase)
- ✅ App dashboard — works (client-side auth check)
- ❌ `middleware.js` does NOT run on Cloudflare Pages static export
- ❌ Route Handlers (`/api/auth/callback/route.js`) need a workaround (see below)

**Auth callback workaround for Cloudflare Pages:**

Because the `/api/auth/callback` route handler won't run, handle the Supabase callback client-side.
Add `src/app/auth/callback/page.js` (already included in updated zip — see below).

### 1b. Build settings in Cloudflare Pages

In Cloudflare dashboard → Pages → Create application → Connect to Git:

| Setting | Value |
|---|---|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` (or wherever your visull folder is) |
| Node version | 18 |

### 1c. Environment variables (Cloudflare Pages → Settings → Environment variables)

```
NEXT_PUBLIC_SUPABASE_URL         = https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY    = your_anon_key
NEXT_PUBLIC_SITE_URL             = https://app.visull.com
NEXT_PUBLIC_CYBERGUARD_URL       = https://cyberguard.visull.com
NEXT_PUBLIC_REPORTMIND_URL       = https://reportmind.visull.com
```

### 1d. Custom domain in Cloudflare Pages

In your Pages project → Custom domains:
- Add `visull.com`
- Add `app.visull.com`

Cloudflare handles DNS automatically if your domain is on Cloudflare (it will be — it's Cloudflare).

---

## PART 2 — Deploy CyberGuard frontend to Cloudflare Pages

### 2a. Build settings

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20 |

### 2b. Environment variables

```
VITE_SUPABASE_URL      = https://YOUR_PROJECT.supabase.co  ← SAME project as Visull
VITE_SUPABASE_ANON_KEY = your_anon_key                     ← SAME key
VITE_API_URL           = https://your-railway-backend.up.railway.app
VITE_VISULL_HUB_URL    = https://app.visull.com
```

### 2c. Custom domain

In your Pages project → Custom domains → Add `cyberguard.visull.com`

### 2d. _redirects file (SPA routing)

Create `public/_redirects` in CyberGuard repo:
```
/* /index.html 200
```
This ensures React Router works — Cloudflare Pages needs this for SPAs.

---

## PART 3 — Deploy ReportMind to Cloudflare Pages

### 3a. Build settings

Same as CyberGuard (Vite):

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 18 |

### 3b. Environment variables

```
VITE_SUPABASE_URL      = https://YOUR_PROJECT.supabase.co  ← SAME project
VITE_SUPABASE_ANON_KEY = your_anon_key
VITE_VISULL_HUB_URL    = https://app.visull.com
VITE_ANTHROPIC_API_KEY = sk-ant-your-key
```

⚠️ **IMPORTANT**: The `VITE_ANTHROPIC_API_KEY` will be visible in the browser bundle.
For production, proxy the Anthropic call through a Cloudflare Worker or Railway endpoint.
See "Securing the Anthropic key" section below.

### 3c. Custom domain

Add `reportmind.visull.com`

### 3d. _redirects file

Create `public/_redirects` in ReportMind repo:
```
/* /index.html 200
```

---

## PART 4 — Update CyberGuard for universal login (Step 6)

This is the exact code change needed. CyberGuard is React + Vite + `@supabase/supabase-js`.

### 4a. Find your existing Supabase client

Look in your CyberGuard repo for a file like:
- `src/lib/supabase.js`
- `src/supabaseClient.js`
- `src/lib/supabaseClient.js`
- Wherever `createClient` is called

It currently looks something like:
```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### 4b. Replace it entirely with this

```js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY
const HUB_URL       = import.meta.env.VITE_VISULL_HUB_URL || 'https://app.visull.com'

// ── Cookie storage scoped to .visull.com ──────────────────────
// This cookie is set with domain=.visull.com, so it's readable
// on cyberguard.visull.com, reportmind.visull.com, and all future
// *.visull.com subdomains — that's the universal login.

const COOKIE_KEY = 'visull-auth'

function isProduction() {
  return window.location.hostname.endsWith('.visull.com')
}

const cookieStorage = {
  getItem(key) {
    const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'))
    return match ? decodeURIComponent(match[2]) : null
  },
  setItem(key, value) {
    const domain  = isProduction() ? '; domain=.visull.com' : ''
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
    const secure  = isProduction() ? '; Secure' : ''
    document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires}; path=/${domain}; SameSite=Lax${secure}`
  },
  removeItem(key) {
    const domain = isProduction() ? '; domain=.visull.com' : ''
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
  },
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    storageKey: COOKIE_KEY,
    storage: cookieStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

export { HUB_URL }
```

### 4c. Add the auth guard (one place in App.jsx)

Find where CyberGuard checks for an existing session and redirects to login.
It likely looks like one of these:

**Pattern A** — if it redirects to its own `/login` route:
```jsx
// In App.jsx or a ProtectedRoute component
if (!session) {
  return <Navigate to="/login" />
}
```

**Replace with:**
```jsx
if (!session) {
  const returnUrl = encodeURIComponent(window.location.href)
  window.location.href = `${HUB_URL}/auth/login?redirect=${returnUrl}`
  return null
}
```

**Pattern B** — if it shows a login form inline, wrap it:
```jsx
import { HUB_URL } from './lib/supabase'

// In the useEffect that checks session:
supabase.auth.getSession().then(({ data: { session } }) => {
  if (!session) {
    const returnUrl = encodeURIComponent(window.location.href)
    window.location.href = `${HUB_URL}/auth/login?redirect=${returnUrl}`
  } else {
    setSession(session)
  }
})
```

### 4d. Remove CyberGuard's own login/signup pages (optional but clean)

Once universal login is working, you can remove CyberGuard's own auth pages.
They're no longer needed — users log in at app.visull.com.

### 4e. Add the VITE_VISULL_HUB_URL env var

In CyberGuard's `.env.local`:
```
VITE_VISULL_HUB_URL=https://app.visull.com
```

In Cloudflare Pages env vars for CyberGuard:
```
VITE_VISULL_HUB_URL = https://app.visull.com
```

### 4f. Update Supabase redirect URLs

In Supabase dashboard → Authentication → URL Configuration → Redirect URLs, add:
```
https://cyberguard.visull.com/**
https://app.visull.com/**
https://app.visull.com/auth/callback
https://reportmind.visull.com/**
http://localhost:5173/**
http://localhost:5174/**
http://localhost:3000/**
```

---

## PART 5 — Supabase setup for ReportMind

Run `supabase-schema.sql` from the reportmind folder in Supabase SQL editor.
This creates the `rm_clients`, `rm_reports`, and `rm_waitlist` tables.

---

## Securing the Anthropic API key

The `VITE_ANTHROPIC_API_KEY` in ReportMind is exposed in the browser bundle.
For production, create a Cloudflare Worker proxy:

1. Create a new Cloudflare Worker
2. Add your Anthropic key as a Worker secret: `wrangler secret put ANTHROPIC_API_KEY`
3. The worker forwards requests to `api.anthropic.com/v1/messages`
4. Change the fetch URL in `NewReport.jsx` from `https://api.anthropic.com/v1/messages`
   to `https://your-worker.workers.dev/api/narrative`

Basic worker code:
```js
export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })

    const body = await request.json()
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    })

    return new Response(response.body, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://reportmind.visull.com',
      },
    })
  }
}
```

---

## Testing cross-subdomain auth

After deploying all three apps:

1. Go to `app.visull.com` → sign up or log in
2. Open DevTools → Application → Cookies
3. You should see a cookie named `visull-auth` with domain `.visull.com`
4. Now navigate to `cyberguard.visull.com` — you should be logged in automatically
5. Navigate to `reportmind.visull.com` — logged in automatically too

If step 4/5 fails:
- Check the cookie domain in DevTools — must be `.visull.com` not `app.visull.com`
- Check Supabase redirect URLs include the new domains
- Confirm all apps use the same Supabase project (same URL + anon key)

---

## DNS setup (all on Cloudflare — easiest possible)

Since you're using Cloudflare for deployment, your DNS is already managed by Cloudflare.
When you add a custom domain to Cloudflare Pages, it automatically adds the DNS record.
You just need to make sure:

- `visull.com` nameservers point to Cloudflare (already done if visull.com is on Cloudflare)
- Add each custom domain in the respective Pages project

No manual DNS records needed — Cloudflare handles it all.
