import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug, blogPosts } from "../lib/blog-data";
import { Badge } from "./ui/badge";
import { ScrollReveal } from "./ui/scroll-reveal";
import { NeonButton } from "./ui/neon-button";
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = post.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", post.metaDescription);
    }
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Articolo non trovato</h1>
        <Link to="/blog">
          <NeonButton variant="solid">Torna al Blog</NeonButton>
        </Link>
      </div>
    );
  }

  // Find related posts (other posts, max 2)
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          {/* Back link */}
          <div className="max-w-3xl mx-auto mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#006400] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna al Blog
            </Link>
          </div>

          {/* Header */}
          <header className="max-w-3xl mx-auto mb-10 space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="brand">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {post.summary}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border/50">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.published}
              </span>
            </div>
          </header>

          {/* Hero image */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="aspect-[21/9] overflow-hidden rounded-2xl border border-border/50">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Article body */}
          <style>{`
            .article-body h2 {
              font-size: 1.75rem;
              font-weight: 700;
              letter-spacing: -0.025em;
              color: hsl(var(--foreground));
              margin-top: 2.5rem;
              margin-bottom: 1rem;
              line-height: 1.3;
            }
            .article-body h3 {
              font-size: 1.35rem;
              font-weight: 700;
              letter-spacing: -0.025em;
              color: hsl(var(--foreground));
              margin-top: 2rem;
              margin-bottom: 0.75rem;
              line-height: 1.3;
            }
            .article-body p {
              color: hsl(var(--muted-foreground));
              line-height: 1.8;
              margin-bottom: 1.25rem;
            }
            .article-body strong {
              color: hsl(var(--foreground));
              font-weight: 600;
            }
            .article-body a {
              color: #006400;
              text-decoration: underline;
              text-underline-offset: 2px;
            }
            .article-body a:hover {
              color: #005000;
            }
            .article-body ul, .article-body ol {
              margin: 1rem 0 1.5rem 0;
              padding-left: 1.5rem;
            }
            .article-body ul {
              list-style-type: disc;
            }
            .article-body ol {
              list-style-type: decimal;
            }
            .article-body li {
              color: hsl(var(--muted-foreground));
              line-height: 1.75;
              margin-bottom: 0.5rem;
            }
            .article-body li strong {
              color: hsl(var(--foreground));
            }
            @media (min-width: 768px) {
              .article-body h2 { font-size: 2rem; }
              .article-body h3 { font-size: 1.5rem; }
            }
          `}</style>
          <div
            className="article-body max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Bottom CTA */}
          <div className="max-w-3xl mx-auto mt-16 p-8 rounded-2xl bg-muted/30 border border-border text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              Vuoi sapere quanto perde il tuo studio?
            </h3>
            <p className="text-muted-foreground">
              Il nostro calcolatore gratuito te lo dice in 30 secondi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/calcolatore">
                <NeonButton
                  variant="solid"
                  size="lg"
                  className="px-8 py-4 text-base font-semibold shadow-lg shadow-[#006400]/20 flex items-center gap-2"
                >
                  Prova il Calcolatore
                  <ArrowRight className="h-5 w-5" />
                </NeonButton>
              </Link>
              <a
                href="https://app.cal.eu/savante-ai/15min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <NeonButton
                  variant="default"
                  size="lg"
                  className="px-8 py-4 text-base font-semibold"
                >
                  Prenota una Call Gratuita
                </NeonButton>
              </a>
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="max-w-3xl mx-auto mt-16">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Articoli correlati
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="group block p-5 rounded-xl border border-border hover:border-[#006400]/30 transition-colors"
                  >
                    <div className="flex flex-wrap gap-2 mb-2">
                      {r.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-bold uppercase tracking-wider text-[#006400]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-semibold text-foreground group-hover:text-[#006400] transition-colors line-clamp-2">
                      {r.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {r.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </ScrollReveal>
      </div>
    </article>
  );
}