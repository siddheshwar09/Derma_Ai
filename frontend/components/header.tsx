"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo + Brand */}
        <a
          href="#top"
          className="group flex items-center gap-3 transition-transform duration-200 hover:scale-105"
        >
          {/* Skin / Shield icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Derma<span className="text-primary">Scan</span>{" "}
            <span className="font-light text-muted-foreground">AI</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {[
            { label: "Upload", href: "#upload" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "About", href: "#about" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#upload"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="glass border-t border-border px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {[
              { label: "Upload", href: "#upload" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "About", href: "#about" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#upload"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-md"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
