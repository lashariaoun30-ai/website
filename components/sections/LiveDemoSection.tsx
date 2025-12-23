import React from "react";
import { DemoForm } from "./demo-form";
import { Badge } from "../ui/badge";
import { ScrollReveal } from "../ui/scroll-reveal";

export function LiveDemoSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-zinc-900/30 border-y border-border">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-12">
            
            {/* Header - Centered */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
              <Badge variant="brand">Demo Dal Vivo</Badge>
              <h2 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
                Prova l’Agente Telefonico
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Compila i campi qui sotto. Verrai richiamato in tempo reale dalla nostra IA per simulare una conversazione paziente-segreteria.
              </p>
            </div>

            {/* Form Container */}
            <div className="w-full flex justify-center">
              <DemoForm />
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}