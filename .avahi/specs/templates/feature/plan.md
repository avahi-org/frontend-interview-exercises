# Plan: {{FEATURE_NAME}}

**Date:** {{DATE}}
**Branch:** {{BRANCH}}

---

## Approach

<!-- High-level technical strategy. One paragraph. -->

## Files to create

```
src/features/{{FEATURE_SLUG}}/
├── index.ts
├── {{FeatureComponent}}.tsx
├── use{{FeatureHook}}.ts
├── {{featureSlug}}.store.ts   # omit if useState is sufficient
├── {{FeatureComponent}}.test.tsx
└── mocks/
    └── handlers.ts
```

## Files to modify

<!-- List existing files that need changes. -->

## Data shape

<!-- TypeScript interfaces for API responses and store state. -->

```ts
interface {{FeatureEntity}} {

}
```

## API / query keys

```ts
export const {{featureSlug}}Keys = {
  all: ['{{featureSlug}}'] as const,
  list: () => [...{{featureSlug}}Keys.all, 'list'] as const,
  detail: (id: string) => [...{{featureSlug}}Keys.all, 'detail', id] as const,
}
```

## Edge cases

<!-- Loading states, error states, empty states, permission scenarios. -->
- Loading:
- Error:
- Empty:

## Test plan

<!-- What to test and at what level. -->
- [ ] Loading state renders correctly
- [ ] Success state renders data
- [ ] Error state shows error message
- [ ] User interaction: (describe action and expected outcome)
