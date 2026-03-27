import React from "react";
import { Users, PhoneMissed, FileText } from "lucide-react";
import { GlowingEffect } from "../ui/glowing-effect";
import { Badge } from "../ui/badge";
import { ScrollReveal } from "../ui/scroll-reveal";
import { NeonButton } from "../ui/neon-button";

const causes = [
  {
    icon: <Users className="h-5 w-5 text-foreground" />,
    title: "La segretaria è sotto pressione",
    description:
      "Telefono, sportello, agenda, fatture, promemoria — tutto insieme. Quando è impegnata con un paziente, le chiamate vanno perse. Non è colpa sua: è che non può fare tutto.",
  },
  {
    icon: <PhoneMissed className="h-5 w-5 text-foreground" />,
    title: "Nessuno risponde fuori orario",
    description:
      "Il 32% delle chiamate arriva quando lo studio è chiuso. Pausa pranzo, dopo le 19, weekend. Quei pazienti non richiamano: cercano un altro studio.",
  },
  {
    icon: <FileText className="h-5 w-5 text-foreground" />,
    title: "I follow-up cadono nel vuoto",
    description:
      'Il paziente dice "ci penso". Nessuno lo ricontatta al momento giusto. Il preventivo muore in silenzio e i soldi escono dalla porta.',
  },
];

export function DiagnosisStep() {
  const scrollToSolution = () => {
    document
      .getElementById("soluzione")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden border-t border-border/50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto space-y-4">
            <Badge variant="brand">La Diagnosi</Badge>
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
              Ecco perché stai perdendo quei pazienti
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Non è un problema di qualità clinica. È un problema di gestione
              delle comunicazioni.
            </p>
          </div>

          {/* Cause Cards */}
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {causes.map((cause, i) => (
              <li key={i} className="list-none h-full min-h-[14rem]">
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3 bg-background">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                    continuous={true}
                    movementDuration={10}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-8">
                    <div className="relative flex flex-1 flex-col justify-between gap-4">
                      <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
                        {cause.icon}
                      </div>
                      <div className="space-y-3">
                        <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-tight md:text-2xl text-foreground">
                          {cause.title}
                        </h3>
                        <p className="font-sans text-base leading-relaxed text-muted-foreground">
                          {cause.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-xl md:text-2xl font-medium text-foreground mb-6">
              Ti suona familiare?
            </p>
            <NeonButton
              variant="solid"
              size="lg"
              className="px-10 py-4 text-base font-semibold shadow-lg shadow-[#006400]/20"
              onClick={scrollToSolution}
            >
              Scopri come lo risolviamo
            </NeonButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}