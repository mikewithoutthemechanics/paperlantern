# Operations

How PaperLantern runs internally.

## Contents

| Folder/File | What it covers |
|---|---|
| `README.md` | This overview |
| `account-management.md` | Client communication standards, response times, weekly rhythm |
| `onboarding-checklist.md` | Pre-kickoff and kickoff checklist |
| `offboarding-checklist.md` | Clean handover + what we keep |
| `sales/` | Lead intake, qualification, pipeline, pricing reference |
| `playbooks/` | Diagnose / Build / Compound operating playbooks |
| `ai/` | AI amplification SOP and usage rules |
| `automations/` | n8n workflow docs: leads, invoicing, content, reporting, backups |
| `tooling.md` | Self-hosted stack (Contabo, EspoCRM, Akaunting, Nextcloud, n8n) |
| `templates/` | Agreement, invoice, reports, kickoff notes, case study, content pillars |

---

## Engagement workflow

1. **Discover** — qualify the client fit and problem
2. **Diagnose** — map where visibility breaks down
3. **Build** — ship the exposure system
4. **Compound** — operate and refine

## Deliverables discipline

- **Ship, don't speculate.** Recommendations documents are not deliverables.
- **Show the work.** Every engagement should be presentable as proof.
- **Outcomes over deliverables.** Track conversion, response time, booked jobs — not vanity metrics.

## Guiding principles

- **Anyone should be able to run a process from the playbooks.** No tribal knowledge required.
- **Every client engagement is a potential case study.** Document as you go, not after.
- **Tools are a means, not the product.** Tooling should be swapped freely when better exists.
- **AI amplifies; humans judge.** Never publish AI output without human review.

---

## Tooling stack (summary)

See [`tooling.md`](tooling.md) for full detail.

| Job | Tool | Where |
|---|---|---|
| CRM / pipeline | EspoCRM | Self-hosted on Contabo |
| Invoicing / accounting | Akaunting | Self-hosted on Contabo |
| Docs & files | Nextcloud | Self-hosted on Contabo |
| Automations | n8n | Self-hosted on Contabo |
| Website | paperlantern.xyz | SPA, can live on the same VPS |

---

## Quick start (new engagement)

1. Qualify fit — see `sales/README.md`
2. Sign agreement — see `templates/engagement-agreement.md`
3. Onboard — see `onboarding-checklist.md`
4. Run the phase — see `playbooks/`
5. Report — see `templates/monthly-report.md`
6. Keep proof — see `templates/case-study.md`
