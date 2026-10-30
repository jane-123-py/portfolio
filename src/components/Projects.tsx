import { useState, useEffect } from 'react'
import { FolderGit2, Zap, ExternalLink, Github } from 'lucide-react'
import { supabase } from '../lib/supabase' // Adjust path if your client is elsewhere

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  image_url?: string
  live_url?: string
  github_url?: string
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        if (data) setProjects(data)
      } catch (err) {
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-cyber-magenta text-sm">03.</span>
          <h2 className="section-title text-3xl md:text-4xl text-cyber-text">
            Project <span className="text-cyber-cyan">Archive</span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-border to-transparent" />
        </div>

        {loading ? (
          <div className="text-center py-12 font-mono text-cyber-muted">Loading project archive...</div>
        ) : projects.length === 0 ? (
          /* Empty state */
          <div className="cyber-card clip-corner p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-fine opacity-30" />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15), transparent 70%)',
              }}
            />

            <div className="relative z-10">
              <div className="inline-flex p-5 border border-cyber-cyan/20 bg-cyber-cyan/5 mb-6 animate-glow-pulse">
                <FolderGit2 className="w-12 h-12 text-cyber-cyan" />
              </div>

              <h3 className="font-display font-bold text-xl md:text-2xl text-cyber-text mb-3">
                No Projects Deployed Yet
              </h3>

              <p className="font-body text-cyber-muted max-w-md mx-auto mb-8 leading-relaxed">
                The project archive is currently empty. New projects will appear here
                once they're initialized and ready for deployment.
              </p>

              <div className="inline-flex items-center gap-2 font-mono text-sm text-cyber-cyan/60 border border-cyber-cyan/20 px-4 py-2">
                <Zap className="w-4 h-4" />
                Awaiting data injection...
              </div>

              <div className="mt-8 font-mono text-xs text-cyber-muted/50 space-y-1 text-left max-w-xs mx-auto">
                <div>$ ls projects/</div>
                <div className="text-cyber-magenta/40">total 0 — directory empty</div>
                <div>$ _ <span className="animate-pulse">|</span></div>
              </div>
            </div>
          </div>
        ) : (
          /* Populated Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="cyber-card clip-corner p-6 flex flex-col justify-between">
                <div>
                  {project.image_url && (
                    <img 
                      src={project.image_url} 
                      alt={project.title} 
                      className="w-full h-48 object-cover mb-4 border border-cyber-border"
                    />
                  )}
                  <h3 className="font-display font-bold text-xl text-cyber-text mb-2">{project.title}</h3>
                  <p className="font-body text-cyber-muted text-sm mb-4 leading-relaxed">{project.description}</p>
                  
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="font-mono text-xs px-2.5 py-1 bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-cyber-border/50">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-mono text-cyber-muted hover:text-cyber-cyan transition-colors">
                      <Github className="w-4 h-4" /> Code
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-mono text-cyber-muted hover:text-cyber-cyan transition-colors">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}