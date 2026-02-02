import * as React from "react"
import { ChevronDown } from "lucide-react"

const NavigationMenu = ({ children, className }: { children: React.ReactNode, className?: string, viewport?: boolean }) => {
  return (
    <nav className={`relative z-10 flex max-w-max flex-1 items-center justify-center ${className || ""}`}>
      {children}
    </nav>
  )
}

const NavigationMenuList = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <ul className={`flex flex-1 list-none items-center justify-center space-x-1 ${className || ""}`}>
      {children}
    </ul>
  )
}

const NavigationMenuItem = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <li className={`relative group ${className || ""}`}>{children}</li>
}

const navigationMenuTriggerStyle = () => {
  return "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors text-gray-900 dark:text-gray-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 focus:bg-blue-50/50 dark:focus:bg-blue-900/20 focus:text-blue-600 dark:focus:text-blue-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
}

const NavigationMenuTrigger = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <button
      className={`${navigationMenuTriggerStyle()} group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 ${className || ""}`}
    >
      {children}{" "}
      <ChevronDown
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-hover:rotate-180"
        aria-hidden="true"
      />
    </button>
  )
}

const NavigationMenuContent = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`absolute left-0 top-full z-50 mt-2 w-max origin-top-left rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-lg dark:text-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${className || ""}`}>
      {children}
    </div>
  )
}

const NavigationMenuLink = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 focus:bg-blue-50/50 dark:focus:bg-blue-900/20 ${className || ""}`}>
      {children}
    </div>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
}
