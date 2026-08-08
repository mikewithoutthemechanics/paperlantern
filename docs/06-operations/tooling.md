# Tooling — PaperLantern Stack

Solo · Self-hosted on **Contabo VPS** · Light stack, not one big ERP.

**Philosophy:** every tool must earn its place. Choose simple tools that do one job well and stay out of the way. No per-seat SaaS sprawl.

---

## Recommended stack

| Job | Tool | Why |
|---|---|---|
| CRM / pipeline | **EspoCRM** | Self-hosted, simple, covers leads, contacts, deals, tasks |
| Invoicing / accounting | **Akaunting** | Self-hosted, handles invoices, expenses, reports |
| Docs & files | **Nextcloud** | Self-hosted, files, calendar, contacts, sharing for client handover |
| Website | **paperlantern.xyz** | SPA (docs-ready), can be self-hosted or static on the same VPS |
| Email | **Self-hosted or provider** | TBD — recommend a simple mail setup (e.g., mailcow) or an external provider |
| AI tools | TBD | Only approved tools; never process client data through unapproved AI |

---

## Present day (v0 — before full self-hosting)

Until the VPS is configured:

- CRM: spreadsheet or paperlantern docs until EspoCRM is up
- Invoicing: spreadsheet / template until Akaunting is up
- Docs & files: this repo (`/root/PaperLantern`) + cloud drive if needed
- Email: [existing email] until a dedicated setup exists

---

## Contabo VPS baseline

| Item | Suggested |
|---|---|
| Provider | Contabo |
| Size | Small VPS (2–4 vCPU, 8–16 GB RAM) is plenty for solo |
| OS | Ubuntu LTS (or Debian) |
| Purpose | Host EspoCRM, Akaunting, Nextcloud, and optionally the website |
| Backups | Enable provider snapshots + database dumps scheduled |
| Security | HTTPS everywhere, firewall, fail2ban, regular updates |

---

## Setup order (suggested)

1. Provision Contabo VPS + DNS (paperlantern.xyz subdomains)
2. Set up HTTPS + reverse proxy (Caddy or Nginx)
3. Deploy **Nextcloud** — docs and files
4. Deploy **EspoCRM** — pipeline and contacts
5. Deploy **Akaunting** — invoices and accounting
6. Wire logins + backups
7. Move client data in from spreadsheets/templates
8. Deploy website (paperlantern.xyz SPA) when ready

---

## What stays in this docs repo

- Company identity
- Offer / process / case studies
- Playbooks and templates
- Website copy
- Anything that's not client-confidential operational content

**What moves into Nextcloud**
- Client files, contracts, deliverables, receipts
- Anything with client-confidential data

---

## Future swaps

- If CRM gets complex: consider Cloudron/Yunohost as an app manager, or ERPNext if we ever outgrow light stack
- If email becomes critical: mailcow (self-hosted) or a managed provider
- If solo becomes team: add shared workspaces and permissions carefully

---

## Rules

- **No per-seat SaaS unless it's clearly worth it.** Self-host when the cost/effort makes sense.
- **Backups are non-negotiable.** Test restoring at least once.
- **Client data stays in approved tools only.**
- **Every tool earns its place.** If a tool leaves unused for 60 days, remove it.
