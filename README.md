- This template is a react starter with vite-typescript-tailwindcss-shadcn

# Table of contents <!-- omit in toc -->

- [1. Get started to use this template](#1-get-started-to-use-this-template)
- [2. Create this starter from scratch](#2-create-this-starter-from-scratch)
  - [2.1. Create a Vite + React + TypeScript Project](#21-create-a-vite--react--typescript-project)
  - [2.2. Expanding the ESLint configuration](#22-expanding-the-eslint-configuration)
  - [2.3. Install TailwindCSS](#23-install-tailwindcss)
  - [2.4. Resolve path to use '@' for './src'](#24-resolve-path-to-use--for-src)
  - [2.5. Add Shadcn UI](#25-add-shadcn-ui)
  - [2.6. Aditional clean up](#26-aditional-clean-up)
  - [2.7. Add a Shadcn theme](#27-add-a-shadcn-theme)
  - [2.8. Add dark mode with a theme toggler](#28-add-dark-mode-with-a-theme-toggler)
    - [2.8.1. Theme Provider](#281-theme-provider)
    - [2.8.2. Theme Toggler](#282-theme-toggler)
  - [2.9. Routing with React Router](#29-routing-with-react-router)

# 1. Get started to use this template

- Rename the project name
- Intall dependencies

```bash
npm install
```

- Run the react project

```bash
npm run dev
```

# 2. Create this starter from scratch

## 2.1. Create a Vite + React + TypeScript Project

- [Ref: Intallation guide](https://tailwindcss.com/docs/installation/using-vite)

```bash
npm create vite@latest my-project
cd my-project
```

- Open the project in VS Code and install dependencies

```bash
npm install
npm run dev
```

- Check if the project runs without any problems

## 2.2. Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

eslint.config.js

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## 2.3. Install TailwindCSS

```bash
npm install tailwindcss @tailwindcss/vite
```

- edit vite.config.ts

```ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite" //new

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), //new
  ],
})
```

- open `src/index.css` and replace everything with the following:

```css
@import "tailwindcss";
```

- In `src/App.tsx` replace everything with this:

```tsx
const App = () => {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>
}

export default App
```

- Check if the tailwind classes works well without any issue

## 2.4. Resolve path to use '@' for './src'

- open `tsconfig.json` and compare with following:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- Edit `tsconfig.app.json` file

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".", // probably deprecreted, don't add this
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

- Check if `@types/node` is installed (usually installed). In no, then install it.

```bash
npm install -D @types/node
```

- Edit `vite.config.ts`

```ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})
```

- Check if auto import uses '@' for use cases.

## 2.5. Add Shadcn UI

- [Ref. Shadcn Installation Guide](https://ui.shadcn.com/docs/installation/vite#existing-project)

Run the command to set up `shadcn/ui` (accept recommended defaults):

```bash
npx shadcn@latest init
```

A `button.tsx` component should be automatically created at `src/components`.
If not, run the command to add it:

```bash
npx shadcn@latest add button
```

Edit `src/App.tsx` to add shadcn buttons for testing:

```tsx
<div className="flex min-h-svh flex-col items-center justify-center">
  <Button>Click me</Button>
  <Button variant="outline">Click me</Button>
  <Button variant="destructive">Click me</Button>
</div>
```

- Check if all variant of shadcn buttons work properly

## 2.6. Aditional clean up

- remove `src/App.css` file

Commit your changes

[⬆️ Return to Table of contents](#table-of-contents)

## 2.7. Add a Shadcn theme

Visit [Shadcn Themes](https://ui.shadcn.com/create) to create a color theme, get the code to use this theme in the existing Vite project.

Sample command to add the theme in the existing Vite project:

```bash
npx shadcn@latest apply --preset b1s91W4Ke
```

## 2.8. Add dark mode with a theme toggler

(Ref: [Shadcn Dark Mode guide (Vite)](https://ui.shadcn.com/docs/dark-mode/vite))

We'll create a theme provider that reads/writes the theme to `localStorage` and toggles the `dark` class on `<html>`.

### 2.8.1. Theme Provider

First, create `src/context/theme-context.ts`:

```ts
import { createContext } from "react"

export type Theme = "dark" | "light" | "system"

export interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState)
```

Then create `src/hooks/use-theme.ts`:

```ts
import { ThemeProviderContext } from "@/context/theme-context"
import { useContext } from "react"

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
```

Finally, create `src/components/theme-provider.tsx`:

```tsx
import { useEffect, useState } from "react"
import { ThemeProviderContext, type Theme } from "@/context/theme-context"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
```

Then, wrap the app with the provider in `src/main.tsx`:

```tsx
import { ThemeProvider } from "@/components/theme-provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

### 2.8.2. Theme Toggler

Install the dropdown component needed for the toggle:

```bash
npx shadcn@latest add dropdown-menu
```

Create the toggle button in `src/components/mode-toggle.tsx`:

```tsx
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/hooks/use-theme"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

Drop `<ModeToggle />` anywhere in `App.tsx` (e.g. a top-right corner) and confirm light/dark/system all switch the shadcn theme correctly.

Commit your changes.

[⬆️ Return to Table of contents](#table-of-contents)

## 2.9. Routing with React Router

Ref: [React Router](https://reactrouter.com/start/data/installation).

We'll prefer `Data Mode` for React Router for most React projects.

First, install React Router:

```bash
npm i react-router
```

Edit `App.tsx` to create a proper site-layout using React Router's `Outlet`:

```tsx
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
```

Create a couple of pages in `src/pages`:

`src/pages/Home.tsx`

```tsx
const HomePage = () => {
  return <div>Welcome to Home!</div>
}

export default HomePage
```

and `src/pages/About.tsx`

```tsx
const AboutPage = () => {
  return <div>About us!</div>
}

export default AboutPage
```

Create routes in `src/routes.tsx`:

```tsx
import App from "@/App"
import AboutPage from "@/pages/About"
import HomePage from "@/pages/Home"
import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "about",
        Component: AboutPage,
      },
    ],
  },
])
```

Finally, edit `main.tsx` as follows:

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { ThemeProvider } from "@/components/theme-provider"
import { RouterProvider } from "react-router/dom"
import { router } from "@/routes"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
```

Note that we didn't include the `App` component here. Rather, we've included the `App` component in `src/routes.tsx` as the root component.

Commit your changes.

[⬆️ Return to Table of contents](#table-of-contents)
