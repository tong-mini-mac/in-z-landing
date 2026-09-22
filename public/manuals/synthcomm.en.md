# User Manual — SynthComm

Use the **Web Portal** in a browser — no Telegram / LINE bot.

Two product types: **dialogue** (CS chats) and **document** (synthetic document JSON rows).

Portal tabs: **Package** · **LLM API keys** · **Domains** · **New job** · **Job status** · **Account**

## 1. Get started

1. Sign in at [inz.lol](https://www.inz.lol)
2. Open SynthComm from **Your package** (SSO) — no second sign-in in the app
3. Check remaining quota on the **Package** tab

## 2. Create a job

1. Go to **New job**
2. Pick **Dialogue** or **Document**
3. For documents — choose a type (or let the system infer from the topic):
   - Complaint form
   - Customer ↔ support email
   - HOA / village notice
   - Invoice / receipt
   - Support ticket
4. Enter **Topic**
5. Language: Thai · English · Vietnamese · Indonesian
6. Enter row count (deducted from this month’s quota — dialogue and document share the same quota)
7. Output format: Bundle / JSON / CSV / PDF
8. Optional CSV for batch input
9. **Submit** — keep the **Job ID** and download token

**Locale defaults**

- Thai with no region → Central Thailand
- English with no country → Singapore

## 3. Track and download

1. Open **Job status**
2. Enter Job ID (and token if shown)
3. **Check status** or **Auto-poll** until `completed`
4. **Download**

Large jobs (> 1,000 rows) split into parallel worklines automatically — track the same parent Job ID.

## 4. What you get

| Format | Typical contents |
|--------|------------------|
| **Bundle** | Data (dialogue or document) + HTML/PDF summary + QC |
| **JSON** | Data package including QC |
| **CSV** | Row table |
| **PDF** | Summary report |

The **job summary report** (`05_Final_Package.html` / `.pdf`) is the job detail document — topic, QC, samples — separate from raw data files.

Note: downloads are **job outputs only** — not the engine.

## 5. License — LLM keys (BYOK)

On License / White Label, open **LLM API keys** and paste Research / Writer / QC keys.  
SaaS plans use IN Z keys — BYOK token cost is billed on your own key account.

## 6. License — your domain

1. **Domains** tab — copy the CNAME target shown
2. Create the CNAME at your DNS
3. Submit the request in the portal — HTTPS is enabled after the record points correctly

## 7. Account (PDPA)

**Account** tab — export JSON or delete the account per PDPA rights.

Upgrade: [inz.lol/pay](https://www.inz.lol/pay?product=synthcomm)
