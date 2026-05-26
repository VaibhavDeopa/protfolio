# Deploy portfolio monorepo to Vercel (detailed guide)

Your repo has **three Next.js apps**. On Vercel you create **three separate projects** that all point at the **same GitHub repository**, each with a different **Root Directory**.

Only **`apps/web`** is your public portfolio. The other two are backend APIs.

```
GitHub repo (portfolio)
├── apps/web       → Vercel project "portfolio-web"      (your site)
├── apps/projects  → Vercel project "portfolio-projects" (API)
└── apps/blog      → Vercel project "portfolio-blog"     (API)
```

---

## Part 0 — Prerequisites

Before you start, confirm:

| Requirement | How to check |
|-------------|--------------|
| Code works locally | `pnpm dev` — all three apps show **Ready** on 3000, 3001, 3002 |
| Build works | `pnpm turbo build` — **4 successful** tasks |
| GitHub account | [github.com](https://github.com) |
| Vercel account | [vercel.com](https://vercel.com) (sign in with GitHub) |
| Repo on GitHub | Code pushed (see Part 1) |

Optional: [GitHub CLI](https://cli.github.com/) (`gh`) and [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`).

---

## Part 1 — Put code on GitHub

### Option A — Using GitHub CLI (fast)

Open PowerShell in `D:\portfolio`:

```powershell
cd D:\portfolio
git init
git add .
git commit -m "Initial portfolio monorepo"
gh auth login
gh repo create portfolio --private --source=. --remote=origin --push
```

Replace `portfolio` with your preferred repo name. Use `--public` instead of `--private` if you want a public repo.

### Option B — Using GitHub website

1. Go to [github.com/new](https://github.com/new).
2. Repository name: e.g. `portfolio`. Do **not** add README, .gitignore, or license (you already have them).
3. Click **Create repository**.
4. In PowerShell:

```powershell
cd D:\portfolio
git init
git add .
git commit -m "Initial portfolio monorepo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `portfolio` with your values.

---

## Part 2 — Understand what you will create on Vercel

You will import the **same repo three times**. Each import becomes its own Vercel **project** with its own URL.

| # | Vercel project name (you choose) | Root Directory | What it does |
|---|----------------------------------|----------------|--------------|
| 1 | `portfolio-projects` | `apps/projects` | Serves `/api/projects` + MDX |
| 2 | `portfolio-blog` | `apps/blog` | Serves `/api/blog` + MDX |
| 3 | `portfolio-web` | `apps/web` | Your portfolio UI |

**Deploy order:** projects → blog → web (web needs the other two URLs).

---

## Part 3 — Deploy `apps/projects` (first API)

### 3.1 Import the repository

1. Log in to [vercel.com](https://vercel.com).
2. Click **Add New…** → **Project**.
3. Under **Import Git Repository**, find your `portfolio` repo.
4. Click **Import**.

### 3.2 Configure the project (first time only)

On the **Configure Project** screen:

1. **Project Name:** `portfolio-projects` (or any name; this becomes part of the URL).
2. **Framework Preset:** Next.js (auto-detected).
3. **Root Directory:** click **Edit** → enter `apps/projects` → **Continue**.
4. **Build and Output Settings** — expand if collapsed. You should see (from `apps/projects/vercel.json`):
   - **Install Command:** `cd ../.. && pnpm install`
   - **Build Command:** `cd ../.. && pnpm turbo build --filter=@portfolio/projects`
5. **Environment Variables:** leave empty for this API project.
6. Click **Deploy**.

Wait until the deployment shows **Ready** (usually 1–3 minutes).

### 3.3 Critical monorepo setting (do this for all 3 projects)

1. Open the project → **Settings** → **General**.
2. Scroll to **Root Directory** → **Edit**.
3. Ensure root is `apps/projects`.
4. Turn **ON**: **Include source files outside of the Root Directory in the Build Step**.
5. Click **Save**.

If you skip this, builds often fail with “Cannot find module `@portfolio/types`”.

### 3.4 Node version (recommended for all 3 projects)

1. **Settings** → **General** → **Node.js Version**.
2. Select **20.x** (or latest LTS).
3. Save.

### 3.5 Copy the production URL

1. Go to **Deployments** → open the latest **Production** deployment.
2. Click **Visit** or copy the URL, e.g. `https://portfolio-projects.vercel.app`.
3. Save it in a note — you need it for the `web` project.

### 3.6 Verify the API

In a browser, open:

```
https://portfolio-projects.vercel.app/api/projects
```

You should see JSON like:

```json
{ "data": [ { "slug": "neural-transparency", "title": "...", ... } ] }
```

If you see that, the projects service is live.

---

## Part 4 — Deploy `apps/blog` (second API)

Repeat Part 3, but with these differences:

| Setting | Value |
|---------|--------|
| Project Name | `portfolio-blog` |
| Root Directory | `apps/blog` |
| Include source outside root | **ON** |
| Node.js | **20.x** |

After deploy, verify:

```
https://portfolio-blog.vercel.app/api/blog
```

You should see JSON with blog posts in `"data"`.

Save this URL too, e.g. `https://portfolio-blog.vercel.app`.

---

## Part 5 — Deploy `apps/web` (your public site)

### 5.1 Import the same repo again

1. **Add New…** → **Project**.
2. Import the **same** `portfolio` repository again (yes, a second/third project from one repo is normal).

### 5.2 Configure

| Setting | Value |
|---------|--------|
| Project Name | `portfolio-web` |
| Root Directory | `apps/web` |
| Install / Build | From `apps/web/vercel.json` (auto) |
| Include source outside root | **ON** (after first deploy, in Settings) |
| Node.js | **20.x** |

### 5.3 Add environment variables **before** or right after first deploy

1. On the configure screen, open **Environment Variables**,  
   **or** go to **Settings** → **Environment Variables**.

Add **two** variables:

| Key | Value | Environments |
|-----|--------|--------------|
| `PROJECTS_API_URL` | `https://portfolio-projects.vercel.app` | Production, Preview, Development |
| `BLOG_API_URL` | `https://portfolio-blog.vercel.app` | Production, Preview, Development |

**Rules:**

- Use your **actual** URLs from Part 3.5 and 4.
- **No** trailing slash (`/` at the end).
- Use `https://`, not `http://`.

Example:

```
PROJECTS_API_URL=https://portfolio-projects-abc123.vercel.app
BLOG_API_URL=https://portfolio-blog-xyz789.vercel.app
```

3. Click **Deploy** (or **Redeploy** if you already deployed without env vars).

### 5.4 Redeploy if you added env vars late

Env vars are baked in at **build** time for Next.js config and server code.

1. **Deployments** tab → **⋯** on latest deployment → **Redeploy**.
2. Enable **Use existing Build Cache** (optional) → **Redeploy**.

### 5.5 Verify the site

Open your **web** production URL, e.g. `https://portfolio-web.vercel.app`.

Check:

- Home page loads with **Research at a glance** (projects).
- **News** table shows blog entries.
- `/projects` and `/blog` work.
- Click a project and a blog post — detail pages render MDX content.

If the layout loads but lists are empty or you see errors, see **Part 8 — Troubleshooting**.

---

## Part 6 — Custom domain (optional)

Only attach a domain to **`portfolio-web`**, not the API projects.

1. Open **portfolio-web** on Vercel.
2. **Settings** → **Domains**.
3. Enter your domain (e.g. `www.yourname.com`).
4. Follow Vercel’s DNS instructions at your registrar (A/CNAME records).
5. Wait for SSL (**Valid Configuration**).

API projects can stay on `*.vercel.app` URLs.

---

## Part 7 — What happens on every git push

After setup, each project watches the repo:

- Change only `apps/projects/content/*.mdx` → redeploy **portfolio-projects**.
- Change only `apps/blog/content/*.mdx` → redeploy **portfolio-blog**.
- Change `apps/web/**` → redeploy **portfolio-web**.

Turbo may skip unchanged apps depending on Vercel/Turbo settings; manual **Redeploy** always works.

---

## Part 8 — Troubleshooting

### Build fails: `Cannot find module '@portfolio/types'`

- **Settings → General → Root Directory →** enable **Include source files outside of the Root Directory in the Build Step**.
- Redeploy.

### Build fails: `pnpm: command not found`

- Root `package.json` must include `"packageManager": "pnpm@9.15.9"`.
- **Settings → General → Node.js Version** → **20.x**.
- Redeploy.

### `web` builds but home page has no projects / news

- `PROJECTS_API_URL` and `BLOG_API_URL` missing or wrong on **portfolio-web**.
- Open API URLs in browser; they must return JSON.
- **Redeploy** `portfolio-web` after fixing env vars.

### `web` works on Production but Preview deployments are broken

- Add the same env vars for **Preview** environment,  
  **or** set Preview URLs to the Preview deployments of the API projects (advanced).

### APIs return 404 on Vercel

- Confirm Root Directory is `apps/projects` or `apps/blog`, not repo root.
- Check **Deployments → Build Logs** for failed routes.

### Windows local `pnpm dev` failed earlier

- Use `pnpm dev` from repo root (Turbo **stream** UI).
- Free ports 3000–3002 if `EADDRINUSE`.

---

## Part 9 — Alternative: Vercel CLI

If you prefer the terminal:

```powershell
npm install -g vercel
cd D:\portfolio\apps\projects
vercel login
vercel link
vercel --prod

cd D:\portfolio\apps\blog
vercel link
vercel --prod

cd D:\portfolio\apps\web
vercel link
vercel env add PROJECTS_API_URL production
vercel env add BLOG_API_URL production
vercel --prod
```

When linking, choose **existing** or **new** project names matching the three apps. Set env vars on `web` before the final `vercel --prod`.

---

## Quick reference checklist

- [ ] Code on GitHub
- [ ] Vercel project `portfolio-projects` → root `apps/projects` → monorepo toggle ON
- [ ] `/api/projects` returns JSON
- [ ] Vercel project `portfolio-blog` → root `apps/blog` → monorepo toggle ON
- [ ] `/api/blog` returns JSON
- [ ] Vercel project `portfolio-web` → root `apps/web` → monorepo toggle ON
- [ ] `PROJECTS_API_URL` + `BLOG_API_URL` set on web
- [ ] Web redeployed after env vars
- [ ] Site works at web production URL
- [ ] (Optional) Custom domain on web only
