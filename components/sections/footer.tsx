"use client"

import * as React from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { Linkedin, Send } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    
    // Function to handle the actual scrolling
    const scrollToElement = () => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }

    // If we are already on the home page, just scroll
    if (location.pathname === "/" || location.pathname === "") {
      scrollToElement()
    } else {
      // If on another page, navigate to home first, then scroll
      navigate("/")
      // Small timeout to allow the home page to mount
      setTimeout(scrollToElement, 100)
    }
  }

  return (
    <footer className="relative bg-black text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <a href="#/"><h2 className="mb-4 text-3xl font-bold tracking-tight hover:text-zinc-300 transition-colors">Savante AI</h2></a>
            <p className="mb-6 text-zinc-400">
              Iscriviti alla nostra newsletter per le ultime novità sull'IA dentale.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="La tua email"
                className="pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-offset-0 focus-visible:ring-white/50"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-white text-black hover:bg-white/90 transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Iscriviti</span>
              </Button>
            </form>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Link Rapidi</h3>
            <nav className="space-y-2 text-sm text-zinc-400">
              <a 
                href="#hero" 
                onClick={(e) => handleNavClick(e, "hero")}
                className="block transition-colors hover:text-white hover:underline underline-offset-4 cursor-pointer"
              >
                Home
              </a>
              <a 
                href="#solution" 
                onClick={(e) => handleNavClick(e, "solution")}
                className="block transition-colors hover:text-white hover:underline underline-offset-4 cursor-pointer"
              >
                Soluzioni
              </a>
              <a 
                href="#blog" 
                onClick={(e) => handleNavClick(e, "blog")}
                className="block transition-colors hover:text-white hover:underline underline-offset-4 cursor-pointer"
              >
                Blog
              </a>
              <a 
                href="#booking" 
                onClick={(e) => handleNavClick(e, "booking")}
                className="block transition-colors hover:text-white hover:underline underline-offset-4 cursor-pointer"
              >
                Prenota Demo
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contatti</h3>
            <address className="space-y-2 text-sm not-italic text-zinc-400">
              <p>Via Guglielmo Marconi 129</p>
              <p>60125 Ancona (AN), Italia</p>
              <p>P. IVA 03031620424</p>
              {/* <p>Email: lashariaoun30@gmail.com</p> */}
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Seguici</h3>
            <div className="flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://www.linkedin.com/in/aoun-muhammad-424363263/" target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 hover:text-white text-zinc-400">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connettiti su LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 text-center md:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Savante AI. Tutti i diritti riservati.
          </p>
          <nav className="flex gap-4 text-sm text-zinc-400">
            <a href="#/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Termini di Servizio
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}