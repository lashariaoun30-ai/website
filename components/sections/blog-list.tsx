import React from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ScrollReveal } from "../ui/scroll-reveal";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
  tags?: string[];
}

interface BlogListProps {
  heading?: string;
  description?: string;
  posts?: Post[];
}

const defaultPosts: Post[] = [
  {
    id: "post-1",
    title: "Riattivare Pazienti Inattivi: Il Tesoro Nascosto",
    summary:
      "Acquisire un nuovo paziente costa molto di più che riattivarne uno esistente. Scopri perché il tuo database è il tuo asset più grande e come svegliarlo senza sforzo.",
    label: "Crescita",
    author: "Savante Team",
    published: "10 Mar 2024",
    url: "#",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    tags: ["Crescita", "Marketing"],
  },
  {
    id: "post-2",
    title: "Aumentare il Fatturato senza spendere in Ads",
    summary:
      "Il segreto non è generare più lead, ma gestirli velocemente. Rispondere entro 5 minuti può moltiplicare i tassi di conversione. Ecco come l'IA lo rende possibile.",
    label: "Strategia",
    author: "Savante Team",
    published: "05 Mar 2024",
    url: "#",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    tags: ["Strategia", "Automazione"],
  },
  {
    id: "post-3",
    title: "Eliminare Chiamate Perse e No-Show",
    summary:
      "Il 32% delle chiamate mediche non riceve risposta. I no-show costano migliaia di euro. Scopri come l'automazione copre i buchi della tua segreteria 24/7.",
    label: "Efficienza",
    author: "Savante Team",
    published: "28 Feb 2024",
    url: "#",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800",
    tags: ["Efficienza", "AI"],
  },
];

export function BlogList({
  heading = "Risorse per lo Studio Moderno",
  description = "Strategie pratiche per automatizzare, crescere e migliorare l'esperienza paziente.",
  posts = defaultPosts,
}: BlogListProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container flex flex-col items-center gap-16 mx-auto px-4">
        <ScrollReveal>
          <div className="text-center flex flex-col items-center space-y-4 max-w-3xl mx-auto">
            <Badge variant="brand">Blog</Badge>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
              {heading}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <div className="grid gap-y-12 sm:grid-cols-1 md:gap-y-16 mt-16 w-full max-w-5xl mx-auto">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group border-none shadow-none bg-transparent"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Image Column */}
                  <div className="md:col-span-5 order-last md:order-first">
                    <a href={post.url} className="block overflow-hidden rounded-2xl border border-border/50">
                      <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-muted">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </a>
                  </div>

                  {/* Text Column */}
                  <div className="md:col-span-7 flex flex-col justify-center space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.map((tag) => (
                        <span key={tag} className="text-xs font-bold uppercase tracking-wider text-[#006400]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight text-foreground group-hover:text-[#006400] transition-colors">
                      <a href={post.url}>
                        {post.title}
                      </a>
                    </h3>
                    
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-border/50 mt-4">
                      <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <span className="font-medium text-foreground">{post.author}</span>
                        <span>•</span>
                        <span>{post.published}</span>
                      </div>
                      
                      <a
                        href={post.url}
                        className="inline-flex items-center font-semibold text-[#006400] hover:translate-x-1 transition-transform"
                      >
                        <span>Leggi</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>

                </div>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
