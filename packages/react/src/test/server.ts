import { setupServer } from 'msw/node'
import { handlers } from '@/features/cart-debug/mocks/handlers'

/**
 * Global MSW server instance (test runner / node).
 * Add feature-level handlers here as the app grows.
 */
export const server = setupServer(...handlers)
