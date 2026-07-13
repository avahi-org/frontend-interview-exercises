import { createBrowserRouter } from 'react-router-dom'

import { App } from './App'
import { Home } from './Home'
import { CartDebug } from '@/features/cart-debug'
import { Board } from '@/features/board'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'cart-debug',
        element: <CartDebug />,
      },
      {
        path: 'board',
        element: <Board />,
      },
    ],
  },
])
