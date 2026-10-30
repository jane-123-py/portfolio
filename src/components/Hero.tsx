import { useEffect, useState } from 'react'

const phrases = [
  'Cybersecurity Enthusiast',
  'Creative Technologist',
  'Problem Solver',
  'Lifelong Learner',
]

export function Hero() {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1))
        if (text === current) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setText(current.substring(0, text.length - 1))
        if (text === '') {
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % phrases.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, phraseIndex])

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6">
      <div className="text-center max-w-4xl mx-auto">
        <div className="animate-fade-in mb-6">
          <span className="font-mono text-cyber-cyan text-sm md:text-base tracking-widest uppercase">
            // Welcome to the grid
          </span>
        </div>

        <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl mb-4 animate-slide-up">
          <span className="gradient-text">Ts'episo Jane</span>
        </h1>

        <div className="h-10 md:h-12 mb-8 flex items-center justify-center">
          <span className="font-mono text-xl md:text-3xl text-cyber-text">
            <span className="text-cyber-magenta">&gt;_</span>{' '}
            <span className="text-cyber-cyan text-glow-cyan">{text}</span>
            <span className="animate-pulse text-cyber-cyan">|</span>
          </span>
        </div>

        <p className="font-body text-lg md:text-xl text-cyber-muted max-w-2xl mx-auto leading-relaxed mb-10 animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          Exploring the world of tech, hardware, coding and cybersecurity to build safe systems.
          Explore my world of cybersecurity with me. 
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <a
            href="#about"
            className="font-mono text-sm px-8 py-3 bg-cyber-cyan/10 border border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/20 hover:glow-cyan transition-all clip-corner"
          >
            [ Enter System ]
          </a>
          <a
            href="#contact"
            className="font-mono text-sm px-8 py-3 bg-transparent border border-cyber-magenta/40 text-cyber-magenta hover:bg-cyber-magenta/10 hover:glow-magenta transition-all clip-corner"
          >
            [ Establish Link ]
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-xs text-cyber-muted animate-pulse">scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-cyber-cyan to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
