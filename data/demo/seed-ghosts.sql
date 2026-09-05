-- Force 5% demo ghost candidates into low tier, then call:
--   POST /api/v1/users/ghost-profile/generate?inactive_days=0
--   POST /api/v1/users/ghost-profile/aggregate
-- Header: X-User-Role: ai_system

UPDATE segmentations AS s
SET
  tier = 'low',
  score = 0.12,
  match_summary = 'Demo unmatched demand — ghost candidate',
  updated_at = NOW()
FROM customers AS c
WHERE s.customer_id = c.id
  AND c.source = 'ghost_unmatched_demo';
