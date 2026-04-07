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
          <div
            className="max-w-3xl mx-auto prose prose-lg
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-li:text-muted-foreground prose-li:leading-relaxed
              prose-strong:text-foreground
              prose-a:text-[#006400] prose-a:underline hover:prose-a:text-[#005000]
              prose-ul:my-4 prose-ul:space-y-1
              dark:prose-invert"
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