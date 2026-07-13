import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { queryClient } from '@/lib/query-client'
import { router } from '@/app/router'

import './index.css'

/**
 * In development, serve the API from the MSW worker so the app runs offline.
 * Skipped in production builds.
 */
async function enableMocking() {
  if (import.meta.env.PROD) {
    return
  }
  const { worker } = await import('@/test/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  )
})
