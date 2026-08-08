# Backup & Maintenance Workflows

Goal: nothing breaks silently; backups are tested; the stack stays current.

---

## Workflow 1 — Daily backup check

**When:** Daily, morning.

**Steps (n8n):**
1. Cron: daily
2. Check last snapshot/backup timestamp for each service (EspoCRM, Akaunting, Nextcloud, database)
3. If any older than expected → notify Michael (email / Nextcloud)
4. Log "all good" or flag issues

---

## Workflow 2 — Weekly snapshot

**When:** Weekly.

**Steps (n8n):**
1. Cron: weekly
2. Trigger provider snapshot (Contabo backup/VPS snapshot) or database dump
3. Store dump to [off-box location / encrypted] if possible
4. Notify Michael: backup complete
5. If failure → alert loudly

---

## Workflow 3 — Monthly restore test

**When:** Monthly.

**Steps (n8n):**
1. Cron: monthly
2. Instruct Michael: "restore a test copy from the latest backup and verify it opens" (or attempt automated restore into a throwaway container if configured)
3. Log result
4. If restore fails → high-priority fix, don't let it slide

---

## Workflow 4 — Health check

**When:** Daily.

**Steps (n8n):**
1. Cron: daily
2. Ping each service (EspoCRM, Akaunting, Nextcloud, n8n) health endpoint
3. Check disk space on VPS
4. If disk/CPU/memory above threshold → notify Michael
5. If service down → notify immediately

---

## Rules

- Backups are non-negotiable. Test restoring monthly.
- Disk space alerts matter more than they feel like.
- If a service is down, Michael should know before a client would.
