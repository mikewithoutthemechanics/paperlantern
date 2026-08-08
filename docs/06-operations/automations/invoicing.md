# Invoice Workflows

Goal: invoices go out on time, reminders happen automatically, no revenue leaks.

**Trigger source:** Akaunting (and/or EspoCRM engagement data).

---

## Workflow 1 — Create invoice

**When:** An engagement starts / renews / milestone reached.

**Steps (n8n):**
1. Trigger: engagement milestone in EspoCRM (or repeating monthly for Compound)
2. Pull engagement terms (client, amount, currency, description)
3. Create invoice in Akaunting
4. Attach engagement/scope reference line
5. Save a copy to Nextcloud `Invoices/` folder
6. Notify Michael: "Invoice PL-xxxx ready"

**Human step:** review amount + terms before it goes out (or at least spot-check periodically).

---

## Workflow 2 — Send invoice

**When:** Invoice status is "approved/ready".

**Steps (n8n):**
1. Trigger: Akaunting invoice marked ready/approved
2. Send invoice email to client (from Akaunting or via PaperLantern email)
3. Log "sent" status + date
4. Add follow-up task: payment due date
5. Notify Michael if send fails

**Human step:** if a client needs a custom payment note, write it before sending.

---

## Workflow 3 — Overdue reminder

**When:** Invoice is overdue.

**Steps (n8n):**
1. Daily cron: check Akaunting for overdue invoices
2. Day 0 (due) → send reminder #1 ("payment due today")
3. Day 3 overdue → send friendly reminder #2
4. Day 7 overdue → send more direct reminder #3 + notify Michael
5. Day 14 overdue → notify Michael (escalate to a personal conversation)

**Human step:** for key clients or tricky payment situations, pick up the phone.

---

## Workflow 4 — Payment received

**When:** Invoice is marked paid.

**Steps (n8n):**
1. Trigger: Akaunting invoice marked paid
2. Send thank-you confirmation (can be automated, but keep it short/personal-ish)
3. Update cased-study/proof log if relevant
4. File receipt/copy in Nextcloud
5. Update revenue tracker

**Human step:** note whether the client is a good case-study / referral candidate.

---

## KPI to watch

- Time-to-pay (median)
- % invoices paid on time
- Overdue count and total value
- Any client with repeated late payment → risk flag
