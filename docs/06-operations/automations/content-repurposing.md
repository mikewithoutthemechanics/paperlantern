# Content / Repurposing Workflows

Goal: one piece of work → many channels, without burning headcount.

**Trigger source:** internal (PaperLantern content) and client engagements (where approved).

**Principle:** AI drafts and repurposes; a human owns the facts and voice; never publish without review.

---

## Workflow 1 — From one source to multiple channels

**When:** A core piece is done (e.g., a case study, an explainer, a blog-style post, a LinkedIn post).

**Steps (n8n):**
1. Trigger: piece marked "source complete" in Nextcloud / content tool
2. AI drafts variants for channels:
   - LinkedIn post
   - X/Twitter thread
   - Email snippet
   - Short-form video script (optional)
   - Answer-engine / FAQ text
3. Write drafts to Nextcloud `Content Drafts/`
4. Notify Michael to review

**Human step:** edit drafts for voice, facts, and approval. Then publish.

---

## Workflow 2 — Client content repurposing (approved only)

**When:** Client approves a piece from a Compound engagement.

**Steps (n8n):**
1. Trigger: client-approved content marked in workspace
2. Repurpose into channel variants (same AI approach)
3. Stage for client review (Nextcloud share / doc, according to client preference)
4. Human sends client approval request
5. On approval: schedule in channel tool (or mark for manual posting)

**Human step:** client approval gate is mandatory — never publish client content without explicit sign-off.

---

## Workflow 3 — Quarterly content refresh

**When:** Every 90 days.

**Steps (n8n):**
1. Cron: pull top-performing content metrics (where tracked)
2. AI summarizes: what worked, what didn't, what's stale
3. Suggest list: republish / update / kill
4. Notify Michael with a ranked sheet

**Human step:** decide what actually gets updated vs killed.

---

## Workflow 4 — Scheduling cadence

**When:** Approved content is ready.

**Steps (n8n):**
1. Drafts approved → move to schedule queue
2. Suggest posting times based on channel + audience (or manual)
3. Keep a simple calendar in Nextcloud (or a content sheet)

**Human step:** manually confirm anything that's client-facing or sensitive.

---

## Rules

- AI draft ≠ publish-ready. Review always.
- Facts come from humans or verified data.
- Client content requires explicit approval before it goes out.
- Content must be **findable** and **redistributable** — never publish-once-and-forget.
