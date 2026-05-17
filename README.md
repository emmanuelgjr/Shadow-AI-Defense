# Shadow AI Defense

> Detect and respond to Shadow AI in your enterprise.

[![Site](https://img.shields.io/badge/site-shadowaidefense.dev-B45309)](https://shadowaidefense.dev)
[![License: MIT + CC-BY 4.0](https://img.shields.io/badge/license-MIT%20%2B%20CC--BY%204.0-B45309)](LICENSE)
[![Detection rules](https://img.shields.io/badge/detection%20rules-16-B45309)](https://shadowaidefense.dev/detections)
[![Stacks supported](https://img.shields.io/badge/stacks-4-B45309)](https://shadowaidefense.dev/stack)

The detection rule library, response runbooks, employee comms, and policy
starter for the #1 AI risk on every CISO's desk in 2026.

[**Pick your stack →**](https://shadowaidefense.dev/stack)

## What's inside (v0.1)

- 🔍 **20 AI services** cataloged with network and client signatures
- 🛡️ **16 detection rules** — Microsoft Sentinel KQL, Defender for Cloud
  Apps, Purview DLP, Defender for Endpoint, CrowdStrike Falcon, generic
  network, Conditional Access
- 🚨 **4 graduated response runbooks** with decision trees, RACI, comms templates
- 📋 **Shadow AI policy starter** under CC-BY 4.0
- ✉️ **10 comms templates** referenced (5 with downloadable stubs in v0.1)
- 🎯 **4 stack profiles** — pick yours, see only what works
- 🗺️ **Compliance crosswalk** — NIST AI RMF, ISO 42001, EU AI Act, NIST CSF, OSFI B-13, NYDFS Part 500

## Why this exists

Shadow AI is the #1 AI risk on every CISO's desk right now. The public state
of guidance is fragmented blog posts and scattered KQL on individual blogs.
CISOs are paying consultants tens of thousands for what is essentially a
curated rule set and a runbook. This repo is the canonical, free, open
alternative.

## Who built this

**Emmanuel Guilherme Jr.** — Senior Global IT Auditor, Co-lead of OWASP
GenAI Data Security Initiative. Proposed the exact Shadow AI / DLP control
at a Tier 1 global multinational on a Microsoft-centric stack (Defender,
Purview, Sentinel) plus CrowdStrike. This repo is the generalized, public
version of that work.

## How to use it

1. Pick your stack
2. Deploy the recommended detection rules in order
3. Use the runbooks when alerts fire
4. Roll out the policy and comms templates
5. Track maturity over time

## Local development

```bash
npm ci
npm run dev         # http://localhost:4321
npm run validate    # schema + cross-reference validation
npm run test        # vitest
npm run build       # production build → ./dist
```

## Contributing

Especially valued: detection engineers submitting battle-tested rules.
Quality bar is in [DETECTION_QUALITY.md](DETECTION_QUALITY.md). Rules must
be tested for ≥ 30 days in production before submission, with reported
false-positive rates.

## Use it. Cite it.

```
Guilherme Jr., E. (2026). Shadow AI Defense (Version 0.1.0). https://shadowaidefense.dev
```

## Licensing

- **Code:** [MIT](LICENSE)
- **Content** (detection rules, runbooks, policies, comms): [Creative Commons Attribution 4.0](CONTENT-LICENSE)

## Related work in this portfolio

- [AI-Controls-Catalog](https://github.com/emmanuelgjr/AI-Controls-Catalog) — Audit AI
- [AI-RedTeam-Framework](https://github.com/emmanuelgjr/AI-RedTeam-Framework) — Attack AI
- [AI-Governance-Toolkit](https://github.com/emmanuelgjr/AI-Governance-Toolkit) — Govern AI
- [Shadow-AI-Defense](https://github.com/emmanuelgjr/Shadow-AI-Defense) — Defend against rogue AI *(this repo)*
