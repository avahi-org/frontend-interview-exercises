import { Link, Outlet } from 'react-router-dom'

export function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center gap-6 px-4 py-4">
          <Link to="/" className="text-xl font-semibold">Take Home Excercise</Link>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/cart-debug" className="hover:text-foreground">Cart</Link>
            <Link to="/board" className="hover:text-foreground">Board</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
