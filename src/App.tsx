import { NavLink, Outlet } from "react-router"
import { ModeToggle } from "@/components/mode-toggle"

const App = () => {
  return (
    <>
      <header className="border-b">
        <nav className="container mx-auto flex items-center gap-4 px-4 h-14">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <ModeToggle />
        </nav>
      </header>

      <main className="container mx-auto py-8">
        <Outlet />
      </main>
    </>
  )
}

export default App
