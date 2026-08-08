# Leads & Follow-up Workflows

Goal: no lead goes cold, no follow-up is forgotten.

**Trigger source:** EspoCRM (leads, contacts, opportunities) + inbound email.

---

## Workflow 1 — New lead captured

**When:** A new lead is added to EspoCRM (or arrives via form/email).

**Steps (n8n):**
1. Trigger: new EspoCRM lead / form submission / email
2. Check for duplicate email/phone
3. Create/update EspoCRM contact + lead
4. Create a follow-up task: first contact within 1 business day
5. Notify Michael (email/Nextcloud notification)
6. Log the action to the lead timeline

**Human step:** first outreach or reply uses judgment — pick the right template, personalize.

---

## Workflow 2 — 10-minute chat booked

**When:** A chat/meeting is scheduled (calendar event detected).

**Steps (n8n):**
1. Trigger: calendar event created by lead
2. Look up lead in EspoCRM
3. Send confirmation email with context (who we are, what to bring, 10-min promise)
4. Add prep task to internal todo (review lead notes)

**Human step:** during the call, qualify fit and decide next step.

---

## Workflow 3 — No reply follow-up sequence

**When:** Outreach sent, no reply.

**Steps (n8n):**
1. Trigger: outreach email sent (or manual mark)
2. If no reply after 3 days → send follow-up #1 (see `outreach-emails.md`)
3. If still no reply after 7 days → send follow-up #2 (last bump)
4. If still no reply after 14 days → move lead to Nurture / close, log outcome
5. Update EspoCRM status at each step

**Human step:** review list weekly; decide who deserves a fresh personalized touch before auto-close.

---

## Workflow 4 — Slack/Nextcloud reminder

**When:** Tasks due today, or stale leads (no update in 5+ days).

**Steps (n8n):**
1. Daily cron: query EspoCRM for tasks due today / stale leads
2. Send a summary to Michael (Nextcloud talk / email / Telegram — pick one)
3. Include: who, what stage, what's needed

**Human step:** act on the list; don't just clear notifications.

---

## KPI to watch

- Response time to leads: target < 1 business day
- % of leads that get at least one follow-up
- Show rate (10-min chats / leads)
- Conversion to Exposure Audit
