# User Manual — SynthComm

Use the **Web Portal** in a browser — no Telegram / LINE bot.

Portal tabs: **Package** · **LLM API keys** · **Domains** · **New job** · **Job status** · **Account**

## 1. Get started

1. Sign in at [inz.lol](https://www.inz.lol)
2. Open SynthComm from **Your package** (SSO) — no second sign-in in the app
3. Check remaining quota on the **Package** tab

## 2. Create a job

1. Open **New job**
2. Enter **Topic** (subject / context)
3. Choose language: Thai · English · Vietnamese · Indonesian
4. Set conversation count (deducted from this month’s quota)
5. Choose output format: Bundle / JSON / CSV / PDF
6. Optionally upload a CSV for batch input
7. Click **Submit** — keep the **Job ID** and download token

**Language and locale**

- Thai — if no region is specified, Central Thailand is the default
- English — if no country is specified, Singapore is the default

## 3. Track and download

1. Open **Job status**
2. Enter the Job ID (and token if shown)
3. Click **Check status** or **Auto-poll** until `completed`
4. Click **Download**

Large jobs (> 1,000 rows) are split into parallel workers automatically — track the same parent Job ID.

## 4. What each job produces

| Format | You typically get |
|--------|-------------------|
| **Bundle** | Conversation data + HTML/PDF summary report + QC |
| **JSON** | Data and package JSON (including QC) |
| **CSV** | Conversation table |
| **PDF** | Summary report PDF |

The **job summary report** (`05_Final_Package.html` / `.pdf`) is the job-detail document — topic, QC, emotion mix, and sample dialogues — separate from the raw data file.

Note: you can download **job outputs** — not the engine itself.

## 5. License — LLM keys (BYOK)

On License / White Label, open **LLM API keys** and paste keys for Research / Writer / QC.  
SaaS uses IN Z keys; BYOK token usage bills to your own keys.

## 6. License — custom domain

1. Open **Domains** — copy the CNAME target shown
2. Create the CNAME at your DNS
3. Submit the request in the portal — the team enables HTTPS after pointing

## 7. Account (PDPA)

On **Account**, export your data as JSON or delete the account under PDPA rights.

Upgrade packages: [inz.lol/pay](https://www.inz.lol/pay?product=synthcomm)
