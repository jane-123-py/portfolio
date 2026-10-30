import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const { error } = await supabase.from('contact_messages').insert({
      name: form.name,
      email: form.email,
      subject: form.subject || null,
      message: form.message,
    })

    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
    } else {
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    }
  }

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-cyber-magenta text-sm">05.</span>
          <h2 className="section-title text-3xl md:text-4xl text-cyber-text">
            Establish <span className="text-cyber-cyan">Connection</span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-border to-transparent" />
        </div>

        <div className="cyber-card clip-corner p-8 md:p-10">
          <div className="font-mono text-xs text-cyber-cyan/60 mb-6">
            $ ./initiate_contact.sh --user=guest
          </div>

          {status === 'success' ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="inline-flex p-4 border border-cyber-green/30 bg-cyber-green/5 mb-4">
                <CheckCircle2 className="w-12 h-12 text-cyber-green" />
              </div>
              <h3 className="font-display font-bold text-xl text-cyber-text mb-2">
                Transmission Successful
              </h3>
              <p className="font-body text-cyber-muted mb-6">
                Your message has been received. I'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="font-mono text-sm px-6 py-2 border border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors"
              >
                [ Send Another ]
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs text-cyber-cyan/70 mb-2">
                    &gt; name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-cyber-bg/50 border border-cyber-border px-4 py-3 font-body text-cyber-text placeholder-cyber-muted/40 focus:border-cyber-cyan/50 focus:outline-none focus:glow-cyan transition-all"
                    placeholder="Enter your name..."
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-cyber-cyan/70 mb-2">
                    &gt; email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-cyber-bg/50 border border-cyber-border px-4 py-3 font-body text-cyber-text placeholder-cyber-muted/40 focus:border-cyber-cyan/50 focus:outline-none focus:glow-cyan transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-cyber-cyan/70 mb-2">
                  &gt; subject <span className="text-cyber-muted/40">(optional)</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full bg-cyber-bg/50 border border-cyber-border px-4 py-3 font-body text-cyber-text placeholder-cyber-muted/40 focus:border-cyber-cyan/50 focus:outline-none focus:glow-cyan transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-cyber-cyan/70 mb-2">
                  &gt; message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-cyber-bg/50 border border-cyber-border px-4 py-3 font-body text-cyber-text placeholder-cyber-muted/40 focus:border-cyber-cyan/50 focus:outline-none focus:glow-cyan transition-all resize-none"
                  placeholder="Type your message here..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 font-mono text-sm text-cyber-magenta border border-cyber-magenta/30 bg-cyber-magenta/5 px-4 py-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errorMsg || 'Transmission failed. Please try again.'}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full font-mono text-sm px-6 py-4 bg-cyber-cyan/10 border border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/20 hover:glow-cyan transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    [ Send Transmission ]
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
