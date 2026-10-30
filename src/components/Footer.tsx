import { profile } from '../data/profile'
import { Github, Linkedin, Mail } from 'lucide-react'

const iconMap: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  //twitter: Twitter,
  mail: Mail,
}

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-cyber-border/30 relative">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-cyber-text">
              T<span className="text-cyber-cyan">.</span>J
            </span>
            <span className="font-mono text-xs text-cyber-muted">
              // {new Date().getFullYear()}
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {profile.socials.map((social) => {
              const Icon = iconMap[social.icon] || Mail
              return (
                <a
                
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 border border-cyber-border text-cyber-muted hover:text-cyber-cyan hover:border-cyber-cyan/40 hover:glow-cyan transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>

          {/* Credit */}
         <div className="font-mono text-xs text-cyber-muted">
          © {new Date().getFullYear()} T.J. All rights reserved.
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-cyber-border/20 text-center">
          <p className="font-mono text-xs text-cyber-muted/60">
            System status: <span className="text-cyber-green">● operational</span> | Uptime: 99.9%
          </p>
        </div>
      </div>
    </footer>
  )
}
