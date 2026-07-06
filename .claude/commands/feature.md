---
description: Create a new per-feature spec in .avahi/specs/
---

Create a new feature spec instance in `.avahi/specs/`.

**Arguments:** $ARGUMENTS (the feature name, e.g. "user authentication")

Follow these steps exactly:

1. **Derive names from $ARGUMENTS:**
   - `FEATURE_NAME` = title-cased label (e.g. "User Authentication")
   - `FEATURE_SLUG` = kebab-case (e.g. "user-authentication")
   - `FEATURE_HOOK` = PascalCase (e.g. "UserAuthentication") for hook/component names
   - `DATE` = today's date in YYYY-MM-DD format
   - `BRANCH` = run `git branch --show-current` to get the current branch name

2. **Determine the next spec number:**
   - List directories in `.avahi/specs/` matching the pattern `NNN-*`
   - Find the highest existing number; next number = highest + 1, zero-padded to 3 digits
   - If no specs exist yet, start at `001`

3. **Create the spec directory:**
   ```
   .avahi/specs/NNN-FEATURE_SLUG/
   ```

4. **Read each template from `.avahi/specs/templates/feature/`** and copy it to the new directory, replacing:
   - `{{FEATURE_NAME}}` → the title-cased feature name
   - `{{FEATURE_SLUG}}` → kebab-case slug
   - `{{FeatureComponent}}` → PascalCase component name
   - `{{FeatureHook}}` → PascalCase hook name
   - `{{featureSlug}}` → camelCase slug
   - `{{FeatureEntity}}` → PascalCase entity name (same as component)
   - `{{DATE}}` → today's date
   - `{{BRANCH}}` → current git branch

5. **Report to the user:**
   - The full path to the created directory
   - Tell them to fill in `spec.md` before you write any code
   - Ask: "Should I read the spec and create an implementation plan in plan.md, or do you want to fill in the requirements first?"
