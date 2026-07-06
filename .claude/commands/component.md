---
description: Create a new shared component spec in .avahi/specs/
---

Create a new component spec instance in `.avahi/specs/`.

**Arguments:** $ARGUMENTS (the component name, e.g. "data table")

Follow these steps exactly:

1. **Derive names from $ARGUMENTS:**
   - `COMPONENT_NAME` = title-cased label (e.g. "Data Table")
   - `ComponentName` = PascalCase (e.g. "DataTable")
   - `ComponentFile` = kebab-case (e.g. "data-table")
   - `DATE` = today's date in YYYY-MM-DD format

2. **Determine the next spec number:**
   - List directories in `.avahi/specs/` matching the pattern `NNN-*`
   - Find the highest existing number; next number = highest + 1, zero-padded to 3 digits
   - If no specs exist yet, start at `001`

3. **Create the spec directory:**
   ```
   .avahi/specs/NNN-component-ComponentFile/
   ```

4. **Read the template at `.avahi/specs/templates/component/spec.md`** and copy it to the new directory as `spec.md`, replacing:
   - `{{COMPONENT_NAME}}` → title-cased component name
   - `{{ComponentName}}` → PascalCase component name
   - `{{ComponentFile}}` → kebab-case filename
   - `{{DATE}}` → today's date

5. **Report to the user:**
   - The full path to the created `spec.md`
   - Ask them to fill in the Props table and variants before you write any code
   - Remind them: no business logic inside shared components; data fetching belongs in the feature
