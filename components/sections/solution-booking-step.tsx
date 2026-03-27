import React from "react";
import {
  CheckCircle,
  Shield,
  ArrowUpRight,
  Phone,
  CalendarCheck,
  MessageSquare,
  Clock,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollReveal } from "../ui/scroll-reveal";
import { NeonButton } from "../ui/neon-button";
import { CountUp } from "../ui/count-up";
import { cn } from "../../lib/utils";

const bookingLink = "https://app.cal.eu/savante-ai/15min";

const features = [
  {
    icon: <Phone className="h-5 w-5 text-[#006400]" />,
    text: "Risponde a ogni chiamata in automatico, anche quando la segretaria è impegnata",
  },
  {
    icon: <CalendarCheck className="h-5 w-5 text-[#006400]" />,
    text: "Conferma gli appuntamenti e riduce i no-show automaticamente",
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-[#006400]" />,
    text: "Ricontatta i pazienti con preventivi in sospeso al momento giusto",
  },
  {
    icon: <Clock className="h-5 w-5 text-[#006400]" />,
    text: "Funziona 24/7 — pausa pranzo, sera, weekend, Ferragosto",
  },
];

const stats = [
  { value: 14, suffix: " studi attivi", label: "in produzione" },
  { value: 500, suffix: "+", label: "chiamate gestite a settimana" },
  { value: 23, suffix: " appuntamenti", label: "recuperati al mese per studio" },
];

export function SolutionBookingStep() {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden border-t border-border/50">
      <div className="container mx-auto px-4">
        {/* Solution Section */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto space-y-4">
            <Badge variant="brand">La Soluzione</Badge>
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
              Come lo risolviamo per 14 studi in Italia
            </h2>
          </div>

          {/* Feature List */}
          <div className="max-w-2xl mx-auto mb-16 space-y-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/50"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#006400]/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <p className="text-base text-foreground leading-relaxed pt-2">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Social Proof Stats */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8 rounded-2xl bg-muted/30 border border-border">
              {stats.map((stat, i) => (
                <div key={i} className="text-center space-y-1">
                  <div className="text-3xl md:text-4xl font-bold text-[#006400]">
                    <CountUp to={stat.value} duration={1.5} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Guarantee + Booking */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            {/* Guarantee */}
            <div className="flex items-center gap-4 p-5 mb-8 rounded-xl bg-[#006400]/5 border border-[#006400]/20">
              <div className="shrink-0 w-12 h-12 rounded-full bg-[#006400]/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-[#006400]" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Garanzia: 15 appuntamenti in più nel primo mese
                </p>
                <p className="text-sm text-muted-foreground">
                  Se non li raggiungi, non paghi il canone mensile.
                </p>
              </div>
            </div>

            {/* Booking Card */}
            <div
              className={cn(
                "group relative flex flex-col rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md"
              )}
            >
              <div className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#006400]/10 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5 text-[#006400]" />
              </div>

              <div className="flex flex-col items-center gap-8 p-6 sm:p-8 md:p-12">
                <div className="flex flex-col items-center text-center max-w-2xl space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    Prenota una Call di 10 Minuti
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Ti facciamo sentire come funziona il sistema e ti mostriamo i
                    numeri del tuo studio. Nessun impegno.
                  </p>
                </div>

                <a
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full sm:w-auto"
                >
                  <NeonButton
                    variant="solid"
                    size="lg"
                    className="w-full sm:min-w-[300px] px-8 py-6 text-base shadow-lg shadow-[#006400]/20 transition-all hover:scale-105"
                  >
                    Prenota la Tua Consulenza Gratuita
                  </NeonButton>
                </a>

                <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-8 gap-y-3 text-center">
                  <li className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#006400] shrink-0"></span>
                    Solo 10 minuti, senza impegno
                  </li>
                  <li className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#006400] shrink-0"></span>
                    Analisi personalizzata sul tuo studio
                  </li>
                  <li className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#006400] shrink-0"></span>
                    Ti facciamo sentire il sistema in azione
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}