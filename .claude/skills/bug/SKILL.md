---
description: Create a new bug investigation spec in .avahi/specs/
---

Create a new bug spec instance in `.avahi/specs/`.

**Arguments:** $ARGUMENTS (a short description of the bug, e.g. "cart total shows NaN on empty cart")

Follow these steps exactly:

1. **Derive names from $ARGUMENTS:**
   - `BUG_TITLE` = the argument as-is, title-cased (e.g. "Cart Total Shows NaN On Empty Cart")
   - `BUG_SLUG` = kebab-case (e.g. "cart-total-nan-empty-cart")
   - `DATE` = today's date in YYYY-MM-DD format
   - `BRANCH` = run `git branch --show-current` to get the current branch name

2. **Determine the next spec number:**
   - List directories in `.avahi/specs/` matching the pattern `NNN-*`
   - Find the highest existing number; next number = highest + 1, zero-padded to 3 digits
   - If no specs exist yet, start at `001`

3. **Create the spec directory:**
   ```
   .avahi/specs/NNN-bug-BUG_SLUG/
   ```

4. **Read the template at `.avahi/specs/templates/bug/spec.md`** and copy it to the new directory as `spec.md`, replacing:
   - `{{BUG_TITLE}}` → the title-cased bug description
   - `{{DATE}}` → today's date
   - `{{BRANCH}}` → current git branch

5. **Do NOT attempt to investigate or fix the bug yet.** Report to the user:
   - The full path to the created `spec.md`
   - Ask them to fill in "Steps to reproduce" and "Expected / Actual" before you begin investigation
   - Once the reproduction steps are filled in, you will read the relevant feature folder and fill in "Root cause" before proposing any fix
