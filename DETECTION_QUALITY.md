# Detection Quality Standard

Detection rules accepted into this library must meet all of the following.

## Required

1. **Production-tested.** Tested in a production environment for at least 30 days.
2. **Reported false-positive rate.** The submission states the observed false-positive rate (% of triggers that were genuine) and the population size on which the rate was measured.
3. **Tuning steps documented.** Concrete tuning instructions for orgs with different scale or risk tolerance.
4. **Required data sources enumerated.** No "you'll need to figure out what logs to ingest."
5. **Prerequisites documented.** Licensing, connectors, time-to-value.
6. **Author attribution permanent.** Contributors are credited; attribution is not removed.
7. **At least one framework mapping.** NIST AI RMF, ISO/IEC 42001, MITRE ATT&CK, or NIST CSF.

## Not accepted

- Vendor-supplied marketing rules.
- Rules that detect specific named persons, customers, or third-party systems beyond well-known public services.
- Rules whose evidence collection requires unauthorized data access.
- Rules whose primary purpose is offensive rather than defensive.

## Stack realism

State explicitly which stack profiles the rule applies to. If it requires a specific license or configuration, that goes in `prerequisites`.

## Review cadence

Rules are reviewed quarterly. Rules that have not been re-validated in 12 months are flagged stale in the UI.

## Submission

PRs against `/src/content/detections/`. Run `npm run validate` and `npm run test` before submitting.
