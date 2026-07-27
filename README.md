# IN Z Landing

Minimal landing page for **IN Z** — AI Transform and SaaS.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Mailboxes

| Address | Role |
|---|---|
| `no-reply@inz.lol` | Sign Up activation emails (From) |
| `info@inz.lol` | Customer Service inbox + activation Reply-To |
| `help@inz.lol` | Support inbox |

Configure **one** mail provider in `.env.local` / Vercel:

1. **Resend** (recommended): set `RESEND_API_KEY`, verify domain `inz.lol`, enable sending from the three addresses above.
2. **SMTP** (Gmail / Workspace / host): set `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.

Also set:

- `NEXT_PUBLIC_SITE_URL=https://www.inz.lol`
- `AUTH_ACTIVATION_SECRET` (long random string; required in production)

At Porkbun, forward `info@`, `help@`, and optionally `no-reply@` to your Gmail so staff can read inbound mail.

## Deploy

Push to GitHub, then import the repo in [Vercel](https://vercel.com). Add the same env vars in the Vercel project settings.
