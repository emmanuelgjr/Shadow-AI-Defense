# Roadmap

## v0.2 (current)

Shipped in v0.1:

- Policy starter (inline on /policy)
- 2 watchlists (ConsumerLLMDomains, AIBrowserExtensions)
- Compliance crosswalk
- About / Methodology / Contribute / DETECTION_QUALITY

Content targets met in v0.2:

- 35 AI services (was 20)
- 30 detection rules (was 16) across Microsoft Sentinel, Defender for Cloud
  Apps, Purview DLP, Defender for Endpoint, CrowdStrike Falcon, Netskope,
  Zscaler, generic network, Conditional Access
- 8 response runbooks (was 4)
- 8 stack profiles (was 4)
- Cross-link: all 30 detections reference AI-CTRL-020 and related controls

Still open from v0.2:

- **Comms templates — 5 of 10.** The five written are the escalation-side
  templates (repeat warning, department briefing, pilot announcement,
  incident notification, quarterly update). The five originally listed
  first — all-employee announcement, all-employee education, manager
  talking points, first-occurrence warning, approved-tool launch — are not
  written. `/comms` shows these as "In drafting" rather than linking them.
  To finish one: add it to `scripts/generate-comms.ts`, regenerate, and
  flip its `available` flag in `src/pages/comms.astro`
  (`tests/comms-templates.test.ts` enforces that the two stay in step).
- Exception wizard (interactive, localStorage-backed) — not started
- Maturity self-assessment, Shadow AI program scope — not started

## v0.3

- Watchlist CSV downloads with auto-update GitHub Action (PR weekly)
- Live "newly seen AI services" intelligence page (curated, monthly)
- Custom-stack builder for hybrid environments
