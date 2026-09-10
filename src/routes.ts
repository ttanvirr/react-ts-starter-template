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
