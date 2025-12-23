"use client";

import React from "react";
import { PhoneMissed, Users, UserX, FileQuestion } from "lucide-react";
import { GlowingEffect } from "../ui/glowing-effect";
import { Badge } from "../ui/badge";
import { ScrollReveal } from "../ui/scroll-reveal";

export function ProblemSection() {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          {/* Title Section */}
          <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto space-y-4">
            <Badge variant="brand">Il Problema</Badge>
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
              Ogni titolare di studio riconosce queste situazioni
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Se gestisci uno studio dentistico, sai che non puoi evitarle del tutto senza aiuto.
            </p>
          </div>

          {/* Grid Section */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <GridItem
              icon={<PhoneMissed className="h-5 w-5 text-foreground" />}
              title="Le richieste non vengono gestite subito"
              description="Tra visite, telefono che squilla e segreteria occupata, alcune richieste arrivano… e restano in attesa. Il paziente si raffredda."
            />
            <GridItem
              icon={<UserX className="h-5 w-5 text-foreground" />}
              title="Appuntamenti confermati, poi buchi"
              description="Tutto sembra a posto. Poi il paziente non arriva. Sedie vuote, tempo clinico perso, agenda che salta all'ultimo minuto."
            />
            <GridItem
              icon={<FileQuestion className="h-5 w-5 text-foreground" />}
              title="Preventivi lasciati in sospeso"
              description="La visita va bene. Il preventivo è corretto. Il paziente dice “ci penso”… e sparisce perché nessuno lo richiama al momento giusto."
            />
            <GridItem
              icon={<Users className="h-5 w-5 text-foreground" />}
              title="Segreteria sempre sotto pressione"
              description="Telefonate, messaggi, conferme, richiami. Tutto insieme, tutti i giorni. Quando il carico aumenta, le opportunità si perdono."
            />
          </ul>

          {/* Transition Text */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Queste situazioni non dipendono dalla qualità clinica.
              <br className="hidden md:block" />
              Dipendono da come vengono gestite le comunicazioni ogni giorno.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ icon, title, description }: GridItemProps) => {
  return (
    <li className="list-none h-full min-h-[14rem]">
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
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-tight md:text-2xl text-foreground">
                {title}
              </h3>
              <p className="font-sans text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
