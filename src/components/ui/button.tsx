import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'ghost_blue' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"

    const variants = {
      default: "bg-[#000842] text-white shadow hover:bg-opacity-90",
      ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium",
      outline: "border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium",
      secondary: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 font-medium",
      ghost_blue: "hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium",
      link: "text-blue-600 underline-offset-4 hover:underline p-0 h-auto font-medium",
    }

    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
      "icon-sm": "h-8 w-8",
    }

    const variantStyles = variants[variant] || variants.default
    const sizeStyles = sizes[size] || sizes.default

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className || ""}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
