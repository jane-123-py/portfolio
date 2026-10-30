import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Calendar, ArrowRight, FileText, Loader2 } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  tags: string[]
  created_at: string
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, content, tags, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setPosts(data || [])
      }
      setLoading(false)
    }
    fetchPosts()
  }, [])

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <section id="blog" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-cyber-magenta text-sm">04.</span>
          <h2 className="section-title text-3xl md:text-4xl text-cyber-text">
            Data <span className="text-cyber-cyan">Stream</span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-border to-transparent" />
        </div>

        {/* Post detail view */}
        {selectedPost && (
          <div className="cyber-card clip-corner p-8 md:p-10 mb-8 animate-fade-in">
            <button
              onClick={() => setSelectedPost(null)}
              className="font-mono text-sm text-cyber-cyan hover:text-cyber-magenta transition-colors mb-6 flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to list
            </button>
            <div className="flex items-center gap-2 font-mono text-xs text-cyber-muted mb-3">
              <Calendar className="w-3 h-3" />
              {formatDate(selectedPost.created_at)}
            </div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-cyber-text mb-4">
              {selectedPost.title}
            </h3>
            {selectedPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs px-2 py-1 border border-cyber-border text-cyber-muted">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="font-body text-cyber-text leading-relaxed whitespace-pre-wrap">
              {selectedPost.content || selectedPost.excerpt || 'No content available.'}
            </div>
          </div>
        )}

        {/* Post list */}
        {!selectedPost && (
          <>
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 text-cyber-cyan animate-spin" />
                <span className="font-mono text-cyber-muted ml-3">Loading data stream...</span>
              </div>
            ) : error ? (
              <div className="cyber-card clip-corner p-8 text-center">
                <p className="font-mono text-cyber-magenta text-sm">Error: {error}</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="cyber-card clip-corner p-12 md:p-16 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-fine opacity-30" />
                <div className="relative z-10">
                  <div className="inline-flex p-5 border border-cyber-magenta/20 bg-cyber-magenta/5 mb-6">
                    <FileText className="w-12 h-12 text-cyber-magenta" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-cyber-text mb-3">
                    No Posts Published Yet
                  </h3>
                  <p className="font-body text-cyber-muted max-w-md mx-auto mb-6">
                    New blog posts will appear here once they're published.
                    Check back soon for updates.
                  </p>
                  <div className="font-mono text-xs text-cyber-muted/50 text-left max-w-xs mx-auto space-y-1">
                    <div>$ fetch --blog-posts</div>
                    <div className="text-cyber-magenta/40">response: empty array []</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="cyber-card clip-corner p-6 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 font-mono text-xs text-cyber-muted mb-3">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.created_at)}
                    </div>
                    <h3 className="font-display font-bold text-xl text-cyber-text group-hover:text-cyber-cyan transition-colors mb-3">
                      {post.title}
                    </h3>
                    <p className="font-body text-cyber-muted leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt || 'No excerpt available.'}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="font-mono text-xs px-2 py-1 border border-cyber-border text-cyber-muted">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="font-mono text-sm text-cyber-cyan flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-4 h-4" />
                    </span>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
