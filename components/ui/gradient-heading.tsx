import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const headingVariants = cva(
  "tracking-tight text-foreground",
  {
    variants: {
      variant: {
        default: "font-bold",
        light: "font-medium", 
        secondary: "text-muted-foreground font-medium",
      },
      size: {
        default: "text-3xl md:text-5xl",
        sm: "text-2xl md:text-3xl",
        lg: "text-4xl md:text-6xl",
        xl: "text-5xl md:text-7xl",
      },
      gradient: {
        true: "bg-clip-text text-transparent bg-gradient-to-r from-[#006400] to-emerald-600",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      gradient: false,
    },
  }
)

export type GradientHeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
  asChild?: boolean
}

export function GradientHeading({ 
  className, 
  variant, 
  size, 
  gradient, 
  asChild = false, 
  children, 
  ...props 
}: GradientHeadingProps) {
  const Comp = asChild ? Slot : 'h2'
  return (
    <Comp
      className={cn(headingVariants({ variant, size, gradient, className }))}
      {...props}
    >
      {children}
    </Comp>
  )
}