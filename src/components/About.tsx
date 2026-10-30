import { profile } from '../data/profile'
import { MapPin, Mail, User } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-cyber-magenta text-sm">01.</span>
          <h2 className="section-title text-3xl md:text-4xl text-cyber-text">
            About <span className="text-cyber-cyan">Me</span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-border to-transparent" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Avatar / terminal card */}
          <div className="cyber-card clip-corner p-6 flex flex-col items-center justify-center">
            <div className="w-32 h-32 mb-4 relative">
              <div className="absolute inset-0 border-2 border-cyber-cyan/30 rounded-sm rotate-45" />
              <div className="absolute inset-2 border-2 border-cyber-magenta/30 rounded-sm rotate-45" />
              <div className="absolute inset-0">
                
                <img
                  src="/bolt.jpg"
                  alt="Jane's pic"
                  className="w-full h-full object-cover"
                  style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}
                  />
              </div>
            </div>
            <div className="font-mono text-xs text-cyber-muted text-center space-y-1">
              <div className="flex items-center gap-1 justify-center">
                <span className="text-cyber-green">●</span> ONLINE
              </div>
              <div className="flex items-center gap-1 justify-center">
                <MapPin className="w-3 h-3" /> {profile.location}
              </div>
              <div className="flex items-center gap-1 justify-center">
                <Mail className="w-3 h-3" /> {profile.email}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2 cyber-card clip-corner p-8">
            <div className="font-mono text-xs text-cyber-cyan/60 mb-4">
              $ cat about.md
            </div>
            <p className="font-body text-lg text-cyber-text leading-relaxed mb-4">
              {profile.bio}
            </p>
            <p className="font-body text-base text-cyber-muted leading-relaxed">
              When I'm not at school or coding, I enjoy watching hacking documentaries and spending some time with my 
              brothers.I also like to explore the world of CTFs and try to wrap my head around solving wargames and
              researching about the effects of AI in tech today. 
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Open Source', 'Web Dev', 'DevOps', 'UI/UX', 'Automation'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1 border border-cyber-border text-cyber-muted hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
