import * as React from "react"
import { Link } from "react-router-dom"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import { useIsMobile } from "../hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavigationMenuDemo() {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] p-4">
              <li className="row-span-3">
                <NavigationMenuLink className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 no-underline outline-none transition-all duration-200 select-none focus:shadow-md md:p-6 border border-gray-100 dark:border-gray-700">
                  <div className="mb-2 text-lg font-bold text-blue-600 dark:text-blue-400 sm:mt-4">
                    Fare
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-tight">
                    Premium resources for Chartered Accountants and Finance Professionals.
                  </p>
                </NavigationMenuLink>
              </li>
              <ListItem href="#" title="Introduction">
                Start your journey with Fare's platform.
              </ListItem>
              <ListItem href="#" title="Resources">
                Download study materials and practice papers.
              </ListItem>
              <ListItem href="#" title="Community">
                Connect with thousands of fellow professionals.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="#" className={navigationMenuTriggerStyle()}>Docs</Link>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden lg:block">
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent className="md:left-auto md:right-0">
            <ul className="grid w-[300px] gap-4 p-4">
              <li>
                <div className="font-semibold text-sm mb-1 px-3 dark:text-gray-200">Quick Links</div>
                <NavigationMenuLink className="hover:bg-blue-50 dark:hover:bg-blue-900/40 py-2">
                  <Link to="#" className="block">
                    <div className="font-medium text-sm dark:text-gray-100">Mentorship</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs text-balance">Get guided by industry experts.</div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink className="hover:bg-blue-50 dark:hover:bg-blue-900/40 py-2">
                  <Link to="#" className="block">
                    <div className="font-medium text-sm dark:text-gray-100">Course Library</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs text-balance">Learn new skills at your own pace.</div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden xl:block">
          <NavigationMenuTrigger>Support</NavigationMenuTrigger>
          <NavigationMenuContent className="md:left-auto md:right-0">
            <ul className="grid w-[200px] gap-2 p-3">
              <li>
                <NavigationMenuLink className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/40">
                  <Link to="#" className="flex items-center gap-2 w-full">
                    <CircleHelpIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Help Center</span>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/40">
                  <Link to="#" className="flex items-center gap-2 w-full">
                    <CircleIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Contact Us</span>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/40">
                  <Link to="#" className="flex items-center gap-2 w-full">
                    <CircleCheckIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Feedback</span>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string, title: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink className="hover:bg-blue-50 dark:hover:bg-blue-900/30">
        <Link to={href} className="block select-none space-y-1 no-underline outline-none transition-colors">
          <div className="text-sm font-bold leading-none text-gray-900 dark:text-gray-100">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
