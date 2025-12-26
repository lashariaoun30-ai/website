import React from "react";
import { PhoneIncoming, CalendarCheck, FileText, RefreshCcw } from "lucide-react";
import { Badge } from "../ui/badge";
import { NeonButton } from "../ui/neon-button";
import { ScrollReveal } from "../ui/scroll-reveal";
import { GlowingEffect } from "../ui/glowing-effect";
import { cn } from "../../lib/utils";

const SolutionCard = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3 bg-background", className)}>
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
      <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-xl border-[0.75px] bg-gray-50 dark:bg-zinc-900/50 p-6 shadow-sm md:p-8">
        {children}
      </div>
    </div>
  );
};

export function SolutionsSection() {
  return (
    <div className="w-full py-16 md:py-24 bg-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col gap-16">
            {/* Header - Centered */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
              <Badge variant="brand">Soluzioni</Badge>
              <h2 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
                Come risolviamo queste situazioni
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Con sistemi semplici che lavorano ogni giorno, al posto tuo, garantendo che nulla vada perso.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* Card 1: Wide */}
              <SolutionCard className="lg:col-span-2">
                <div className="flex flex-col gap-6 h-full justify-between">
                  <div className="flex flex-col gap-6">
                    <div className="w-14 h-14 rounded-xl bg-[#006400]/10 flex items-center justify-center">
                       <PhoneIncoming className="w-7 h-7 text-[#006400]" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">Ogni richiesta gestita subito</h3>
                      <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
                        Con Agente Telefonico e Agente WhatsApp, ogni richiesta viene accolta e gestita appena arriva, anche quando la segreteria è occupata o lo studio è chiuso.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/50 pt-6">
                     <span className="text-sm font-medium text-[#006400]">Più prime visite reali.</span>
                     <NeonButton onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                       Richiedi la tua demo
                     </NeonButton>
                  </div>
                </div>
              </SolutionCard>

              {/* Card 2: Square */}
              <SolutionCard>
                 <div className="flex flex-col gap-6 h-full justify-between">
                  <div className="flex flex-col gap-6">
                    <div className="w-14 h-14 rounded-xl bg-[#006400]/10 flex items-center justify-center">
                       <CalendarCheck className="w-7 h-7 text-[#006400]" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">Agenda più stabile</h3>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        Con Agente Promemoria, il paziente viene seguito proattivamente per ridurre drasticamente i no-show.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 border-t border-border/50 pt-6">
                     <span className="text-sm font-medium text-[#006400]">Meno mancate presentazioni.</span>
                     <NeonButton onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                       Richiedi la tua demo
                     </NeonButton>
                  </div>
                </div>
              </SolutionCard>

              {/* Card 3: Square */}
              <SolutionCard>
                 <div className="flex flex-col gap-6 h-full justify-between">
                  <div className="flex flex-col gap-6">
                    <div className="w-14 h-14 rounded-xl bg-[#006400]/10 flex items-center justify-center">
                       <FileText className="w-7 h-7 text-[#006400]" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">Preventivi recuperati</h3>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        Con Agente Follow-up, il paziente viene ricontattato nei momenti giusti dopo la visita, senza inseguimenti manuali.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 border-t border-border/50 pt-6">
                     <span className="text-sm font-medium text-[#006400]">Più preventivi accettati.</span>
                      <NeonButton onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                       Richiedi la tua demo
                     </NeonButton>
                  </div>
                </div>
              </SolutionCard>

              {/* Card 4: Wide */}
              <SolutionCard className="lg:col-span-2">
                <div className="flex flex-col gap-6 h-full justify-between">
                  <div className="flex flex-col gap-6">
                    <div className="w-14 h-14 rounded-xl bg-[#006400]/10 flex items-center justify-center">
                       <RefreshCcw className="w-7 h-7 text-[#006400]" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">La segreteria lavora meglio</h3>
                      <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
                        Con Reattivazione dei Pazienti, le attività ripetitive vengono gestite in modo automatico. Lo staff può concentrarsi sull'accoglienza e sulla cura del paziente in studio.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/50 pt-6">
                     <span className="text-sm font-medium text-[#006400]">Meno pressione quotidiana.</span>
                     <NeonButton onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                       Richiedi la tua demo
                     </NeonButton>
                  </div>
                </div>
              </SolutionCard>
            </div>

            {/* Transition Footer */}
            <div className="text-center max-w-3xl mx-auto mt-4">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Il risultato non è fare di più. È far funzionare meglio quello che già succede nello studio.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}