# TrustiChain — Deployment & Setup Guide

## Step 1: Download the project
Download the `/trustichain` folder from the outputs.

## Step 2: Deploy to Vercel

```bash
# Install Vercel CLI globally (if not installed)
npm install -g vercel

# Login to your Vercel account
vercel login

# From inside the project folder, deploy
cd trustichain
vercel deploy --prod
```

Follow the prompts — it will auto-detect Next.js and deploy in ~60 seconds.
Your site will be live at: `https://trustichain.vercel.app` (or custom domain)

---

## Step 3: Add a Vercel KV (Redis) Store

1. Go to your Vercel dashboard → Project → **Storage** tab
2. Click **Create Database** → choose **KV (Upstash Redis)**
3. Name it `trustichain-db` → Create
4. Vercel will auto-inject these env vars:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

All questionnaire submissions will now be stored there.

---

## Step 4: Set Up Google Sheets Integration

### 4a. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) → create new sheet
2. Name it: **TrustiChain Exhibition Contacts**
3. Add these headers in Row 1:
   ```
   Submitted At | Name | Company | Email | Phone | Organisation | Size | Challenges | Region | Priority Feature | Timeline | Submission ID
   ```
4. Rename the tab to: `Contacts`
5. Copy the **Sheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit`

### 4b. Create a Google Service Account

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project: `trustichain`
3. Enable **Google Sheets API** (APIs & Services → Enable APIs)
4. Go to **IAM & Admin → Service Accounts** → Create Service Account
5. Name it: `trustichain-sheets` → Create
6. Click the service account → **Keys** tab → **Add Key** → JSON
7. Download the JSON file — this is your `GOOGLE_SERVICE_ACCOUNT_JSON`

### 4c. Share the Sheet with Service Account

1. Open your Google Sheet
2. Click **Share** 
3. Add the service account email (looks like `trustichain-sheets@project.iam.gserviceaccount.com`)
4. Give it **Editor** access

---

## Step 5: Add Environment Variables to Vercel

In Vercel dashboard → Project → **Settings** → **Environment Variables**, add:

| Variable | Value |
|---|---|
| `KV_REST_API_URL` | Auto-added by Vercel KV |
| `KV_REST_API_TOKEN` | Auto-added by Vercel KV |
| `ADMIN_SECRET` | Your chosen admin password (e.g. `trustichain_admin_2026`) |
| `GOOGLE_SHEET_ID` | The ID from your sheet URL |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Paste the entire contents of the downloaded JSON file |

Then **redeploy** for variables to take effect:
```bash
vercel deploy --prod
```

---

## Step 6: Access the Admin Dashboard

Visit: `https://your-site.vercel.app/admin`

Login with your `ADMIN_SECRET` password.

---

## Summary of URLs

| Page | URL |
|---|---|
| Pitch Deck | `https://your-site.vercel.app/` |
| Admin Dashboard | `https://your-site.vercel.app/admin` |
| Submit API | `https://your-site.vercel.app/api/submit` |
| Submissions API | `https://your-site.vercel.app/api/submissions` |
