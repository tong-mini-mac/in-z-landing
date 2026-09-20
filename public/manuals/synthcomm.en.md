# User Manual — SynthComm

Web portal only — no Telegram or LINE bot.

## Get started

1. Sign in at [inz.lol](https://www.inz.lol)
2. Open SynthComm from **Your package** (SSO)
3. Enter the portal and create a job

## Create a job

1. Enter topic and conversation count
2. Choose language TH / EN / ID / VI
3. Run production — optional web research, locale lock, then QC
4. Download outputs as JSON / CSV / HTML / PDF from the portal

## License — configure LLM keys (if applicable)

In the portal **LLM API keys** tab, paste keys per slot:

| Slot | Used for |
|------|----------|
| Research | Web context before writing |
| Writer | Conversation generation |
| QC | Judge / fix rows |

Token usage bills to your own keys (BYOK).

## License — custom domain (if applicable)

1. Open the portal **Domains** tab and create a request
2. At your DNS, create a **CNAME** to the target shown in the portal
3. Submit — the team enables the host after review

Note: you can download **job outputs** — not the engine itself.
