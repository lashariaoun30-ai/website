import React from "react";
import { FaqAccordion } from "../ui/faq-chat-accordion";
import { ShieldCheck, Briefcase, Bot, Users, Building2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollReveal } from "../ui/scroll-reveal";

export function FaqSection() {
  const faqData = [
    {
      id: 1,
      question: "È conforme al GDPR?",
      answer: "Sì. I dati vengono gestiti secondo le normative GDPR e rimangono sotto il controllo dello studio. Il sistema utilizza solo le informazioni necessarie alla gestione delle richieste e degli appuntamenti.",
      icon: <ShieldCheck className="w-5 h-5 text-[#006400]" />,
      iconPosition: "left" as const,
    },
    {
      id: 2,
      question: "Devo cambiare il modo in cui lavora la segreteria?",
      answer: "No. Il sistema supporta la segreteria, non la sostituisce. Riduce le attività ripetitive e aiuta a non perdere richieste, appuntamenti e follow-up.",
      icon: <Briefcase className="w-5 h-5 text-[#006400]" />,
      iconPosition: "right" as const,
    },
    {
      id: 3,
      question: "È un altro software da imparare?",
      answer: "No. Il sistema lavora in modo automatico e si adatta ai processi dello studio. Niente piattaforme complesse, niente formazione lunga.",
      icon: <Bot className="w-5 h-5 text-[#006400]" />,
      iconPosition: "left" as const,
    },
    {
      id: 4,
      question: "Rischio che sembri impersonale per i pazienti?",
      answer: "No. Le comunicazioni sono chiare, naturali e coerenti con lo stile dello studio. Il paziente percepisce ordine e attenzione, non automazione.",
      icon: <Users className="w-5 h-5 text-[#006400]" />,
      iconPosition: "right" as const,
    },
    {
      id: 5,
      question: "È adatto anche a studi piccoli?",
      answer: "Sì. Anche pochi contatti persi o una mancata presentazione a settimana fanno la differenza nel tempo. Il sistema serve proprio a evitare sprechi quotidiani.",
      icon: <Building2 className="w-5 h-5 text-[#006400]" />,
      iconPosition: "left" as const,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-zinc-900/30 border-t border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <Badge variant="brand">FAQ</Badge>
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
              Domande Frequenti
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Tutto quello che devi sapere per iniziare senza dubbi.
            </p>
          </div>
          
          <FaqAccordion
            data={faqData}
            className="w-full mx-auto"
            timestamp=""
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
