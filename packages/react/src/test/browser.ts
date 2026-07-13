import { setupWorker } from 'msw/browser'
import { handlers } from '@/features/cart-debug/mocks/handlers'

/**
 * MSW worker for the browser (dev). Lets the app run fully offline against
 * the same handlers the tests use. Started from main.tsx in development.
 */
export const worker = setupWorker(...handlers)
