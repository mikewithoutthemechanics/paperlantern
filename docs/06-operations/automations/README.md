# Automations & Workflows

Where PaperLantern saves time by automating the repetitive work — without losing the human layer.

**Tool:** n8n (self-hosted) + integrations with EspoCRM, Akaunting, Nextcloud, and email.

**Principle:** Automate the *mechanics*, never the *judgment*. Humans choose; robots execute.

---

## Coverage map

| Area | What we automate | What stays human |
|---|---|---|
| **Leads & follow-ups** | Capture, route, remind, track | Qualify, write, close |
| **Invoices** | Create, send, remind, reconcile | Set rates, approve |
| **Content & repurposing** | Draft variants, repurpose, schedule drafts | Voice, facts, final approval |
| **Client reporting** | Pull numbers, draft report, assemble | Interpretation, commentary, sign-off |
| **Backup / maintenance** | Snapshots, health checks, notifications | Review and fix |

---

## Workflow docs in this folder

| File | What it covers |
|---|---|
| `leads-followups.md` | Lead capture, chat booking, no-reply sequences, daily reminders |
| `invoicing.md` | Invoice creation, sending, overdue reminders, payment received |
| `content-repurposing.md` | One source → many channels, client approval gates, quarterly refresh |
| `client-reporting.md` | Monthly report auto-draft, optional auto-send, case-study proof capture |
| `backups-maintenance.md` | Backup checks, snapshots, restore tests, health checks |

---

## General rules

1. **Human approval gates where it matters** — invoices, content, client-facing messages
2. **Every workflow logs what it did** — audit trail, no black boxes
3. **Fail loud** — if a workflow breaks, we should know within 1 business day
4. **Client data stays in approved tools** — no passing customer data through unapproved AI
5. **Kill what doesn't earn its time** — unused workflows get deleted

---

## Cheatsheet of workflow triggers

| Trigger | Workflow |
|---|---|
| New lead lands in EspoCRM | Create follow-up task, first outreach draft |
| 10-min chat booked | Send prep email, add task, log notes |
| No reply after outreach | Follow-up sequence (day 3 / day 7) |
| Audit / Build / Compound milestone | Notify internal, draft update message |
| Month end | Pull metrics, draft report |
| New invoice ready | Send + schedule reminders |
| Invoice overdue | Reminder sequence + alert |
| Backup status | Verify snapshot + notify |
