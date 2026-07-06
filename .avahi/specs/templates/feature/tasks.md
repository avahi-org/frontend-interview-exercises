# Tasks: {{FEATURE_NAME}}

**Branch:** {{BRANCH}}

<!-- Work through these in order. Check off as you go. -->

## Setup
- [ ] Create `src/features/{{FEATURE_SLUG}}/` directory structure
- [ ] Define TypeScript interfaces for API response

## Data layer
- [ ] Write MSW handler in `mocks/handlers.ts`
- [ ] Implement TanStack Query hook with exported `queryKey`
- [ ] Add Zustand store if client-only state is needed (otherwise skip)

## UI
- [ ] Build leaf component(s) first, compose into the page component
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Handle empty state

## Tests
- [ ] Tests cover loading, success, and error states
- [ ] User interaction test (if applicable)
- [ ] All existing tests still pass

## Cleanup
- [ ] Export only root component from `index.ts`
- [ ] No cross-feature imports
- [ ] No unused files or variables
