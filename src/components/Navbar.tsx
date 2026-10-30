import { useState, useEffect } from 'react'
import { Menu, X, Terminal } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cyber-bg/90 backdrop-blur-md border-b border-cyber-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Terminal className="w-6 h-6 text-cyber-cyan group-hover:text-cyber-magenta transition-colors" />
          <span className="font-display font-bold text-lg text-cyber-text group-hover:text-glow-cyan transition-all">
            T<span className="text-cyber-cyan">.</span>J
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-cyber-muted hover:text-cyber-cyan transition-colors relative group"
            >
              <span className="text-cyber-magenta/60">&lt;</span>
              {link.label}
              <span className="text-cyber-magenta/60">/&gt;</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyber-cyan group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-cyber-cyan"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cyber-bg/95 backdrop-blur-md border-b border-cyber-border/50">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm text-cyber-muted hover:text-cyber-cyan transition-colors"
              >
                <span className="text-cyber-magenta/60">&lt;</span>
                {link.label}
                <span className="text-cyber-magenta/60">/&gt;</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
