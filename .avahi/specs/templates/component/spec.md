# Component: {{COMPONENT_NAME}}

**Date:** {{DATE}}
**Location:** `src/shared/components/ui/{{ComponentFile}}.tsx`

---

## Purpose

<!-- What does this component do? When should it be used vs. an existing Shadcn component? -->

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | — | Merged with `cn()` |

## Variants / states

<!-- Visual variants, size options, disabled/loading/error states. -->

## Accessibility

<!-- ARIA roles, keyboard navigation, screen reader labels. -->

## Usage example

```tsx
import { {{ComponentName}} } from '@/shared/components/ui/{{ComponentFile}}'

<{{ComponentName}} className="mt-4" />
```

---

## Checklist

- [ ] Props interface defined
- [ ] `className` accepted and merged with `cn()`
- [ ] `forwardRef` used if wrapping a DOM element or Radix primitive
- [ ] No data fetching or store access inside the component
- [ ] Accessible: correct ARIA roles, keyboard support
- [ ] `displayName` set on forwardRef components
