import { skills } from '../data/profile'
import { Cpu, Code, Server, Wrench } from 'lucide-react'

const icons = [Code, Cpu, Server, Wrench]

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-cyber-magenta text-sm">02.</span>
          <h2 className="section-title text-3xl md:text-4xl text-cyber-text">
            Skill <span className="text-cyber-cyan">Matrix</span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-border to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div
                key={skill.category}
                className="cyber-card clip-corner p-6 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 border border-cyber-cyan/30 bg-cyber-cyan/5 group-hover:bg-cyber-cyan/10 transition-colors">
                    <Icon className="w-5 h-5 text-cyber-cyan" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-cyber-text">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-sm px-3 py-1.5 bg-cyber-surface/50 border border-cyber-border text-cyber-text hover:border-cyber-cyan/50 hover:text-cyber-cyan hover:bg-cyber-cyan/5 transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
