- This template is a react starter with vite-typescript-tailwindcss-shadcn

# Get started to use this template

- Rename the project name
- Intall dependencies

```bash
npm install
```

- Run the react project

```bash
npm run dev
```

# Create this starter from scratch

## Create a Vite + React + TypeScript Project

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

## Expanding the ESLint configuration

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

## Install TailwindCSS

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

- open index.css and replace everything with the following:

```css
@import "tailwindcss";
```

- In src/App.tsx replace everything with this:

```tsx
const App = () => {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>
}

export default App
```

- Check if the tailwind classes works well without any issue

## Resolve path to use '@' for './src'

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

- Check if @types/node is installed (usually installed). In no, then install it.

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
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

- Check if auto import uses '@' for use cases.

## Add Shadcn UI

- [Ref. Shadcn Installation Guide](https://ui.shadcn.com/docs/installation/vite#existing-project)

- Run thecommand to set up shadcn/ui:

```bash
npx shadcn@latest init
```

- A button.tsx component should be automatically created at src/components
- If not, run the command to add it

```bash
npx shadcn@latest add button
```

- Edit src/App.tsx to add shadcn buttons

```tsx
<div className="flex min-h-svh flex-col items-center justify-center">
  <Button>Click me</Button>
  <Button variant="outline">Click me</Button>
  <Button variant="destructive">Click me</Button>
</div>
```

- Check if all variant of shadcn buttons work properly
