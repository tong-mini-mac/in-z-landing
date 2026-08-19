# SynthComm — User Manual

For B2B customers. SynthComm is an industrial multi-agent factory for high-fidelity synthetic CS data (Thai · English · Indonesian · Vietnamese). Customer channel: **web portal only** — no Telegram or LINE bot.

## What it does

- Takes a **topic** and a **conversation count**
- Optional web research
- Locale-locked geo / banks / tracking (TH / EN / ID / VI)
- Multi-dimensional QC
- Delivers JSON / CSV / HTML / PDF via the portal

## Getting started

1. Sign in at IN Z, then open SynthComm from **Your package**.
2. Email verify activates **Free** (100 conversations / month).
3. Upgrade to Starter / Growth / Business, or buy License / White Label at [inz.lol/pay](https://www.inz.lol/pay).

## SaaS plans

| Plan | Price | Included |
|------|-------|----------|
| Free | ฿0 | 100 conversations / month |
| Starter | ฿2,900 / month | 1,000 / month |
| Growth | ฿12,900 / month | 5,000 / month |
| Business | ฿39,000 / month | 20,000 / month |

Annual plans save about 20%. Prices exclude VAT 7%.

## License (dedicated instance on IN Z cloud — not a download)

Sold like **Shopify**: you use your own domain; the software stays on IN Z servers. You do not get the source.

```
Your domain (e.g. ai.customer.com)
        │
        │  CNAME  →  synthcomm.inz.lol (or the tenant hostname we assign)
        ▼
  IN Z cloud — dedicated tenant
  engine · workers · control plane · quota · expiry
        │
        │  BYOK — your LLM keys (never IN Z keys)
        ▼
  Your DeepSeek / Gemini APIs
```

| Question | Answer |
|------|------|
| Does the app run on IN Z cloud? | **Yes — entirely.** Engine, workers, and control plane stay with IN Z. |
| Isolated from other customers? | **Yes** — dedicated tenant, not the shared SaaS pool. |
| Whose API? | **Split.** Job submit / status / download = IN Z. LLM tokens = **your BYOK**. |
| Can you run it on-prem? | **No.** That is Enterprise IP (฿2,800,000), not License. |

| You get | You do not get |
|------|------|
| Dedicated instance on IN Z cloud | Source code |
| Your domain via CNAME | Worker image |
| Portal UI to paste multi-vendor LLM keys (research / writer / QC) | Prompts / factory |
| Job output files | On-prem engine |
| Quota + expiry we enforce | IN Z LLM keys |
| Co-brand badge + 6–12 months support | |

| Plan | Price | Included |
|------|-------|----------|
| Startup License | ฿480,000 / year | 1 domain · 50,000 conversations / month · 6 months support |
| Professional License | ฿720,000 / year | 3 domains · 150,000 conversations / month · 12 months support |

After you run jobs you can download **job outputs** and this manual — not the engine.

Portal tab **LLM API keys**: paste keys per pipeline slot.

| Slot | Pipeline step | Vendors |
|------|----------------|---------|
| Research | Web-grounded context before writing | Gemini (Search) · OpenAI · OpenAI-compatible |
| Writer | Generate conversation rows | DeepSeek · OpenAI · OpenAI-compatible |
| QC | Judge / fix rows | Gemini · DeepSeek · OpenAI · OpenAI-compatible |

Each slot can use a different vendor. Token cost is on the customer’s account.

### Your domain (CNAME)

Portal tab **Domains** — count follows the package.

| Package | Hosts |
|------|------:|
| Startup License | 1 |
| Professional License | 3 |
| Agency White Label | up to 10 |

At your DNS, create a **CNAME** from your host (e.g. `ai.company.com`) to the target shown in the portal (default `synthcomm-production.up.railway.app`), then ask IN Z to attach HTTPS.

SaaS uses the IN Z hostname — no customer CNAME.

## White Label and IP

| Plan | Price | What you get |
|------|-------|----------------|
| Agency White Label | ฿980,000 one-time | Your brand · no badge · SaaS resell · dedicated tenant · **engine stays with IN Z** |
| Enterprise IP Package | ฿2,800,000 | Full source · IP transfer · 2 years support — no technical lock |

Pay in full and save 10%. Installment by sales agreement.
