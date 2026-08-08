# Client Reporting Workflows

Goal: monthly reports assemble themselves from real data; Michael's time goes into interpretation, not copy-paste.

**Tools:** n8n pulls from analytics / CRM / booking + drafts the report into `monthly-report.md` format.

---

## Workflow 1 — Monthly report draft

**When:** End of month (or agreed day).

**Steps (n8n):**
1. Cron: trigger monthly
2. Pull metrics from sources:
   - EspoCRM: leads, opportunities, closed
   - Booking/tracking: jobs, calls booked
   - Analytics (if wired): traffic, visibility signals
   - Invoices: revenue recognized
3. Compare vs previous month
4. Fill in the `monthly-report.md` template sections: numbers, changes, what happened
5. Store draft in Nextcloud `Client Reports/[Client]/`
6. Notify Michael "draft ready"

**Human step:** write the executive summary, add nuance, sign off, send to client (or review the auto-send if automated later).

---

## Workflow 2 — Automated send (optional later)

**When:** Michael approves a draft.

**Steps (n8n):**
1. Trigger: report marked "approved" in Nextcloud
2. Convert to PDF (optional)
3. Email client + store PDF in Nextcloud
4. Log that it was sent + copy archived
5. Notify Michael if send fails

**Human step:** choose whether to keep send manual or automate after trust builds. Until then, Michael sends.

---

## Workflow 3 — Case-study proof capture

**When:** Monthly report has a noteworthy outcome.

**Steps (n8n):**
1. Every month end: flag any metric changes that beat targets
2. Create/append a proof log entry (see `templates/case-study.md`)
3. Save screenshots/numbers to Nextcloud `Proof Log/`
4. Remind Michael: "ask client permission for case-study use" if not already granted

**Human step:** ask the client before using numbers publicly; never auto-publish client results.

---

## KPI to watch (internally)

- Report delivery on time
- Client report readability (did they understand?)
- Number of case-study-ready proof points per quarter
