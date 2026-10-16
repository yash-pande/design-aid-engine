# ⛅ Hosting Yamini Studio on Cloudflare

Yamini Studio is fully configured and ready for production hosting on **Cloudflare Workers with Static Assets** (Cloudflare's modern unified platform).

---

## 🚀 Quick Start (Deploy in 2 Minutes)

### Step 1: Login to Cloudflare (First Time Only)
Run this command in your terminal:
```bash
npx wrangler login
```
*A browser window will open asking you to authorize Wrangler with your Cloudflare account.*

### Step 2: Deploy Live
Run:
```bash
npm run deploy
```
*This command compiles the TanStack Start production bundle with Nitro's Cloudflare preset, copies all optimized images & assets, bundles the SSR worker, and uploads everything directly to Cloudflare.*

Once finished, Wrangler prints your live URL:
```text
Uploaded yaministudio-web (3.12 sec)
Deployed yaministudio-web triggers
  https://yaministudio-web.<your-subdomain>.workers.dev
```

---

## 🔄 Automatic Deployment with GitHub Actions

We have pre-configured a GitHub Actions CI/CD workflow at [`.github/workflows/deploy-cloudflare.yml`](file:///.github/workflows/deploy-cloudflare.yml).

Every time you push code to `main`, GitHub Actions will automatically build and deploy the latest version to Cloudflare.

### Setup Instructions:
1. Go to your repository on **GitHub** → **Settings** → **Secrets and variables** → **Actions**.
2. Add the following repository secrets:
   - `CLOUDFLARE_API_TOKEN`: Create a token in [Cloudflare Dashboard → My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens) using the **Edit Cloudflare Workers** template.
   - `CLOUDFLARE_ACCOUNT_ID`: Found on your Cloudflare Dashboard right sidebar under **Account ID**.
3. Push to `main` — your site will build and deploy automatically!

---

## 🌐 Adding Your Custom Domain (e.g. `yaministudio.com`)

Once deployed:
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages**.
2. Click on **`yaministudio-web`**.
3. Navigate to **Settings** → **Domains & Routes** → **Add** → **Custom Domain**.
4. Enter your domain (e.g. `yaministudio.com` or `shop.yaministudio.com`).
5. Cloudflare will automatically provision SSL certificates and route traffic globally through their edge CDN.

---

## 🛠️ Local Preview (Simulating Cloudflare Environment)

To test how your app runs locally inside Cloudflare's exact `workerd` edge runtime:
```bash
npm run deploy:preview
```
This runs Wrangler's local emulator on `http://localhost:8787` with all bindings and asset delivery simulated.

---

## 📂 Cloudflare Files & Configuration in this Project

| File | Purpose |
| :--- | :--- |
| [`wrangler.json`](file:///wrangler.json) | Cloudflare Workers configuration specifying the SSR worker entry (`.output/server/index.mjs`), static asset directory (`.output/public`), and `nodejs_compat` runtime flag. |
| [`public/_headers`](file:///public/_headers) | Edge headers for 1-year immutable caching on product photographs and security headers (`X-Frame-Options`, `X-Content-Type-Options`). |
| [`public/_routes.json`](file:///public/_routes.json) | Cloudflare edge routing rules that serve static assets (`/assets/*`, `/dresses/*`, `/favicon.png`) directly from the CDN with 0ms server latency. |
| [`.github/workflows/deploy-cloudflare.yml`](file:///.github/workflows/deploy-cloudflare.yml) | GitHub Actions CI/CD automation pipeline for zero-downtime deployments on push. |
| [`worker-configuration.d.ts`](file:///worker-configuration.d.ts) | TypeScript typings for Cloudflare Worker runtime and environment bindings (`ASSETS`). |
| [`package.json`](file:///package.json) | Convenient scripts: `"deploy"`, `"deploy:preview"`, and `"cf-typegen"`. |

---

## 📋 Available Cloudflare Commands

```bash
# Build & Deploy to production
npm run deploy

# Build & Preview locally using Cloudflare's workerd emulator
npm run deploy:preview

# Generate/Update Cloudflare Worker TypeScript definitions
npm run cf-typegen
```
