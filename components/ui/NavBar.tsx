import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon, Sun, Moon } from "lucide-react"
import { cn } from "../../lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Theme initialization and toggle logic
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initialTheme = savedTheme || systemTheme

    setTheme(initialTheme)
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Track current route and update active tab
  useEffect(() => {
    const updateActiveTab = () => {
      const hash = window.location.hash || '#/';
      // Handle root path variations
      const currentHash = hash === '' ? '#/' : hash;
      
      const currentItem = items.find(item => item.url === currentHash);
      if (currentItem) {
        setActiveTab(currentItem.name)
      }
    }

    updateActiveTab()
    window.addEventListener('hashchange', updateActiveTab)
    // Also listen for popstate for history navigation
    window.addEventListener('popstate', updateActiveTab)
    return () => {
      window.removeEventListener('hashchange', updateActiveTab)
      window.removeEventListener('popstate', updateActiveTab)
    }
  }, [items])

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6 max-w-[95vw] sm:max-w-fit",
        className,
      )}
    >
      <div className="flex items-center gap-1 sm:gap-2 bg-white/70 dark:bg-black/70 border border-gray-200 dark:border-gray-800 backdrop-blur-xl py-2 px-2 rounded-full shadow-lg transition-all duration-300 overflow-hidden">
        
        {/* Logo Section - Visible on all devices */}
        <a href="#/" className="flex items-center pl-4 pr-2 border-r border-gray-200 dark:border-gray-800 mr-2 shrink-0">
            <span className="font-bold text-sm tracking-tight text-foreground select-none whitespace-nowrap cursor-pointer">
              SAVANTE AI
            </span>
        </a>

        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(item.url)?.scrollIntoView({ behavior: "smooth" })
                setActiveTab(item.name)
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-2 sm:px-6 py-2 rounded-full transition-colors",
                "text-gray-700 dark:text-gray-300 hover:text-[#006400]",
                isActive && "bg-gray-100 dark:bg-gray-900 text-[#006400]",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  {...({
                    layoutId: "lamp",
                    className: "absolute inset-0 w-full bg-[#006400]/5 rounded-full -z-10",
                    initial: false,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }
                  } as any)}
                >
                  {/* Tubelight glow effect - GREEN */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#006400] rounded-t-full">
                    <div className="absolute w-12 h-6 bg-[#006400]/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-[#006400]/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-[#006400]/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="relative cursor-pointer text-sm font-semibold px-2 sm:px-3 py-2 rounded-full transition-colors text-gray-700 dark:text-gray-300 hover:text-[#006400] dark:hover:text-[#006400] hover:bg-gray-100 dark:hover:bg-gray-900 shrink-0"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon size={18} strokeWidth={2.5} />
          ) : (
            <Sun size={18} strokeWidth={2.5} />
          )}
        </button>
      </div>
    </div>
  )
}
