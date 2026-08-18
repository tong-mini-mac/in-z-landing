# PRISM — User Manual

PRISM = Property Retrieval & Intent Subset Matching, powered by SRAG (Subset Retrieval Augmented Generation).

AI customer-engagement platform for real estate marketing: segment, match, and nurture leads from registration through closing.

## Live reference

Admin web: https://prism-web-production.up.railway.app  
API health: https://prism-api-production-d41e.up.railway.app/health

## Flow

Customer registration → intent classification + SRAG → High / Medium / Low

- High: match existing project → AI invitation → schedule viewing → 1-week follow-up
- Medium: upcoming project → present + launch date → schedule → reminder
- Low: no match → group analysis → market gap report
- All: monthly check-ins (2×/month) → analytics → ad campaigns

## Core

- Intent classes: zone_focused / transit_focused / premium / first_jobber
- SRAG search: Keyword Bot → 4 Code Bots → Subset Calculator → Vector Refiner
- SubsetGuard: each user searches only inside their assigned subset (zone, price, type, …)
- Offers, appointments, follow-ups, and person-reference tags

White Label packaging: contact IN Z sales for source, rebrand, and ownership.
License: co-branded binary deploy without full rebrand rights — contact sales for terms.
