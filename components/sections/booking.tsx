import React from "react";
import { NeonButton } from "../ui/neon-button";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { ScrollReveal } from "../ui/scroll-reveal";

const dayNames = ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"];

const CalendarDay: React.FC<{ day: number | string; isHeader?: boolean }> = ({
  day,
  isHeader,
}) => {
  const isHighlighted = !isHeader && typeof day === 'number' && Math.random() < 0.3;
  
  return (
    <div
      className={cn(
        "col-span-1 row-span-1 flex h-8 w-8 items-center justify-center transition-colors duration-300",
        isHeader ? "text-xs font-medium text-muted-foreground" : "rounded-full text-sm",
        isHighlighted 
          ? "bg-[#006400] text-white font-semibold shadow-sm" 
          : "text-foreground hover:bg-muted"
      )}
    >
      {day}
    </div>
  );
};

export function BookingSection() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("it-IT", { month: "long" });
  const formattedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const bookingLink = `https://app.cal.eu/savante-ai/15min`;

  const renderCalendarDays = () => {
    let days: React.ReactNode[] = [
      ...dayNames.map((day) => (
        <CalendarDay key={`header-${day}`} day={day} isHeader />
      )),
      ...Array(firstDayOfWeek).fill(null).map((_, i) => (
        <div
          key={`empty-start-${i}`}
          className="col-span-1 row-span-1 h-8 w-8"
        />
      )),
      ...Array(daysInMonth)
        .fill(null)
        .map((_, i) => <CalendarDay key={`date-${i + 1}`} day={i + 1} />),
    ];

    return days;
  };

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden border-t border-border/50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 mb-12">
            <Badge variant="brand">Booking</Badge>
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
                Vedi come funziona nel tuo studio
            </h2>
             <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Analizziamo le tue necessità in 15 minuti e ti mostriamo come rendere il flusso di lavoro più stabile.
             </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <BentoCard height="h-auto" linkTo={bookingLink}>
              <div className="flex flex-col items-center gap-10 p-6 sm:p-8 md:p-12">
                
                {/* Header Copy */}
                <div className="flex flex-col items-center text-center max-w-2xl space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      Prenota una Demo Gratuita
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Scegli un orario che preferisci. Non è richiesta nessuna preparazione tecnica. Vedrai esattamente come l'IA può rispondere alle telefonate del tuo studio.
                    </p>
                </div>

                {/* Visual Calendar */}
                <div className="relative w-full flex justify-center">
                  <div className="relative w-full max-w-md transition-all duration-500 hover:scale-[1.02]">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#006400]/20 to-emerald-500/20 rounded-[26px] blur-lg opacity-75"></div>
                    
                    <div className="relative h-full w-full rounded-[24px] border border-border bg-card p-2 shadow-xl">
                      <div
                        className="h-full rounded-2xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm"
                        style={{ boxShadow: "inset 0 0 20px rgba(0,0,0,0.02)" }}
                      >
                        <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
                          <p className="text-lg font-semibold text-foreground">
                            {formattedMonth}, {currentYear}
                          </p>
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#006400]/10 border border-[#006400]/20">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006400] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006400]"></span>
                              </span>
                              <span className="text-xs font-semibold text-[#006400] whitespace-nowrap">
                              Disponibile ora
                              </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center">
                          {renderCalendarDays()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* CTA & Supporting Lines */}
                <div className="flex flex-col items-center space-y-8 w-full max-w-2xl">
                    <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="block w-full sm:w-auto">
                      <NeonButton 
                          variant="solid"
                          size="lg" 
                          className="w-full sm:min-w-[300px] px-8 py-6 text-base shadow-lg shadow-[#006400]/20 transition-all hover:scale-105"
                      >
                          Prenota La Tua Demo Gratuita
                      </NeonButton>
                    </a>
                    
                    <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-8 gap-y-3 text-center">
                        <li className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#006400] shrink-0"></span>
                            Chiamata conoscitiva senza impegno
                        </li>
                         <li className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#006400] shrink-0"></span>
                            Strategia personalizzata sul tuo studio
                        </li>
                         <li className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#006400] shrink-0"></span>
                            Setup immediato se decidi di procedere
                        </li>
                    </ul>
                </div>

              </div>
            </BentoCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

interface BentoCardProps {
  children?: React.ReactNode;
  height?: string;
  className?: string;
  linkTo?: string;
}

export function BentoCard({
  children,
  height = "h-auto",
  className = "",
  linkTo,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md",
        height,
        className
      )}
    >
      {linkTo && (
        <div className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#006400]/10 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5 text-[#006400]" />
        </div>
      )}
      {children}
    </div>
  );
}