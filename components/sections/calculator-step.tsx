import React, { useState } from "react";
import { PhoneMissed, UserX, FileText, Calculator, Mail, Info, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollReveal } from "../ui/scroll-reveal";
import { CountUp } from "../ui/count-up";
import { NeonButton } from "../ui/neon-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";

// Conservative calculation constants
const MISSED_CALL_RATE = 0.20; // 20% — conservative (studies show 30-35%)
const NEVER_CALLBACK_RATE = 0.75; // 75% never call back (studies show up to 85%)
const NEW_PATIENT_RATIO = 0.30; // 30% of calls are new patients
const FOLLOWUP_DROP_RATE = 0.40; // 40% of quotes never get followed up
const FOLLOWUP_CONVERSION = 0.30; // 30% of dropped follow-ups would have converted
const WORKING_DAYS = 22;

const bookingLink = "https://app.cal.eu/savante-ai/15min";

export interface CalculationResults {
  missedCallLoss: number;
  noShowLoss: number;
  followupLoss: number;
  totalMonthly: number;
  totalAnnual: number;
  dailyLoss: number;
}

function calculate(
  dailyCalls: number,
  noShows: number,
  patientValue: number,
  preventiviPerMonth: number
): CalculationResults {
  // Missed calls: dailyCalls × 20% missed × 30% new patients × 75% never call back × value × 22 days
  const missedCallLoss =
    dailyCalls *
    MISSED_CALL_RATE *
    NEW_PATIENT_RATIO *
    NEVER_CALLBACK_RATE *
    patientValue *
    WORKING_DAYS;

  // No-show: each no-show is a booked appointment worth patientValue
  const noShowLoss = noShows * patientValue;

  // Follow-up: user's preventivi × 40% not followed up × 30% would have converted × patientValue
  const followupLoss =
    preventiviPerMonth *
    FOLLOWUP_DROP_RATE *
    FOLLOWUP_CONVERSION *
    patientValue;

  const rawTotal = missedCallLoss + noShowLoss + followupLoss;
  const totalMonthly = Math.round(rawTotal / 10) * 10;
  const totalAnnual = totalMonthly * 12;
  const dailyLoss = Math.round(totalMonthly / WORKING_DAYS / 10) * 10;

  return {
    missedCallLoss: Math.round(missedCallLoss / 10) * 10,
    noShowLoss: Math.round(noShowLoss / 10) * 10,
    followupLoss: Math.round(followupLoss / 10) * 10,
    totalMonthly,
    totalAnnual,
    dailyLoss,
  };
}

interface CalculatorStepProps {
  onCalculate: (results: CalculationResults) => void;
  onEmailCapture: () => void;
}

export function CalculatorStep({ onCalculate, onEmailCapture }: CalculatorStepProps) {
  const [dailyCalls, setDailyCalls] = useState("25");
  const [noShows, setNoShows] = useState("8");
  const [patientValue, setPatientValue] = useState("400");
  const [preventivi, setPreventivi] = useState("20");
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    const calls = parseInt(dailyCalls) || 0;
    const ns = parseInt(noShows) || 0;
    const pv = parseInt(patientValue) || 0;
    const prev = parseInt(preventivi) || 0;

    if (calls <= 0 || pv <= 0) return;

    const r = calculate(calls, ns, pv, prev);
    setResults(r);
    setShowResults(true);
    onCalculate(r);

    setTimeout(() => {
      document.getElementById("calc-results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Pre-calculate intermediate numbers for display
  const callsNum = parseInt(dailyCalls) || 0;
  const missedPerDay = Math.round(callsNum * MISSED_CALL_RATE);
  const newPatientMissed = +(callsNum * MISSED_CALL_RATE * NEW_PATIENT_RATIO).toFixed(1);
  const lostForever = +(callsNum * MISSED_CALL_RATE * NEW_PATIENT_RATIO * NEVER_CALLBACK_RATE).toFixed(1);
  const prevNum = parseInt(preventivi) || 0;
  const droppedPrev = Math.round(prevNum * FOLLOWUP_DROP_RATE);
  const wouldConvert = +(prevNum * FOLLOWUP_DROP_RATE * FOLLOWUP_CONVERSION).toFixed(1);

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto space-y-4">
            <Badge variant="brand">Calcolatore Gratuito</Badge>
            <h1 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
              Quanto fatturato perde il tuo studio ogni mese?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Il 35% degli studi non lo sa. In 30 secondi te lo diciamo.
            </p>
          </div>

          {/* Calculator Card */}
          <div className="max-w-xl mx-auto">
            <Card className="border border-border shadow-xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#006400] to-transparent opacity-50"></div>
              <CardContent className="p-6 sm:p-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="dailyCalls" className="text-sm font-medium">
                    Quante chiamate riceve il tuo studio al giorno?
                  </Label>
                  <Input
                    type="number"
                    id="dailyCalls"
                    min={1}
                    max={200}
                    placeholder="Es. 25"
                    value={dailyCalls}
                    onChange={(e) => setDailyCalls(e.target.value)}
                    className="h-11 bg-muted/30 focus:bg-background transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="noShows" className="text-sm font-medium">
                    Quanti appuntamenti saltano al mese? (no-show)
                  </Label>
                  <Input
                    type="number"
                    id="noShows"
                    min={0}
                    max={100}
                    placeholder="Es. 8"
                    value={noShows}
                    onChange={(e) => setNoShows(e.target.value)}
                    className="h-11 bg-muted/30 focus:bg-background transition-colors"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Appuntamenti confermati dove il paziente non si presenta
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preventivi" className="text-sm font-medium">
                    Quanti preventivi consegni al mese?
                  </Label>
                  <Input
                    type="number"
                    id="preventivi"
                    min={0}
                    max={200}
                    placeholder="Es. 20"
                    value={preventivi}
                    onChange={(e) => setPreventivi(e.target.value)}
                    className="h-11 bg-muted/30 focus:bg-background transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patientValue" className="text-sm font-medium">
                    Valore medio di un trattamento? (€)
                  </Label>
                  <Input
                    type="number"
                    id="patientValue"
                    min={50}
                    max={10000}
                    placeholder="Es. 400"
                    value={patientValue}
                    onChange={(e) => setPatientValue(e.target.value)}
                    className="h-11 bg-muted/30 focus:bg-background transition-colors"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Prima visita + trattamento medio
                  </p>
                </div>

                <NeonButton
                  variant="solid"
                  size="lg"
                  className="w-full mt-4 h-14 text-base font-semibold shadow-lg shadow-[#006400]/20 flex items-center justify-center gap-2"
                  onClick={handleCalculate}
                >
                  <Calculator className="h-5 w-5" />
                  Calcola il Fatturato Perso
                </NeonButton>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>

        {/* Results */}
        {showResults && results && (
          <div id="calc-results" className="mt-16 max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center space-y-3 mb-10">
                <p className="text-lg text-muted-foreground">
                  Il tuo studio perde circa
                </p>
                <div className="text-4xl md:text-6xl font-bold text-red-500">
                  <CountUp
                    to={Math.min(results.totalMonthly, 50000)}
                    currency
                    duration={2}
                  />
                  <span className="text-2xl md:text-3xl text-red-400 font-medium">
                    {" "}/ mese
                  </span>
                </div>
                <p className="text-xl md:text-2xl text-muted-foreground">
                  <CountUp to={Math.min(results.totalAnnual, 600000)} currency duration={2.5} />
                  <span className="text-base"> / anno</span>
                </p>
                <p className="text-base text-muted-foreground mt-2">
                  Sono circa <strong className="text-foreground">€{results.dailyLoss}</strong> al giorno che escono dalla porta
                </p>
              </div>

              {/* Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <BreakdownCard
                  icon={<PhoneMissed className="h-5 w-5" />}
                  label="Chiamate perse"
                  amount={results.missedCallLoss}
                  detail={`${missedPerDay} chiamate perse/giorno → ${newPatientMissed} nuovi pazienti persi → ${lostForever} non richiamano mai × €${patientValue} × 22 giorni`}
                />
                <BreakdownCard
                  icon={<UserX className="h-5 w-5" />}
                  label="No-show"
                  amount={results.noShowLoss}
                  detail={`${noShows} appuntamenti confermati saltati × €${patientValue} per trattamento`}
                />
                <BreakdownCard
                  icon={<FileText className="h-5 w-5" />}
                  label="Follow-up mancati"
                  amount={results.followupLoss}
                  detail={`${preventivi} preventivi → ${droppedPrev} non seguiti → ${wouldConvert} si sarebbero convertiti × €${patientValue}`}
                />
              </div>

              {/* Methodology */}
              <div className="bg-muted/30 rounded-xl border border-border p-5 mb-8">
                <div className="flex items-start gap-3 mb-3">
                  <Info className="h-5 w-5 text-[#006400] shrink-0 mt-0.5" />
                  <h4 className="text-sm font-semibold text-foreground">
                    Come calcoliamo questi numeri
                  </h4>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed pl-8">
                  <p>
                    <strong className="text-foreground">Chiamate perse (20%):</strong> Secondo studi di settore, gli studi dentistici perdono tra il 30% e il 35% delle chiamate in entrata
                    (<a href="https://www.getreach.co/blog/32-of-dental-calls-go-unanswered-how-to-fix-it" target="_blank" rel="noopener noreferrer" className="text-[#006400] underline hover:text-[#005000]">Reach</a>,
                    {" "}<a href="https://www.resonateapp.com/resources/missed-calls-dental-practices-statistics" target="_blank" rel="noopener noreferrer" className="text-[#006400] underline hover:text-[#005000]">Resonate</a>).
                    Noi usiamo un valore conservativo del <strong className="text-foreground">20%</strong>. Di queste, il 30% sono nuovi pazienti e il 75% di chi non trova risposta non richiama mai
                    (<a href="https://www.peerlogic.com/post/turning-missed-dental-phone-calls-into-profit" target="_blank" rel="noopener noreferrer" className="text-[#006400] underline hover:text-[#005000]">Peerlogic</a> riporta fino all'85% — noi usiamo il 75%).
                  </p>
                  <p>
                    <strong className="text-foreground">No-show:</strong> Ogni no-show è un appuntamento confermato dove il paziente non si presenta — una poltrona vuota e tempo clinico perso. Calcolato direttamente dai tuoi dati: {noShows} appuntamenti saltati × €{patientValue} di valore medio per trattamento.
                  </p>
                  <p>
                    <strong className="text-foreground">Follow-up mancati:</strong> Dei {preventivi} preventivi che consegni al mese, circa il 40% non viene mai seguito con un ricontatto
                    (<a href="https://www.dentemax.com/dentists/blog-articles/2025/Why_missed_phone_calls_are_dental_offices_largest_revenue_loss" target="_blank" rel="noopener noreferrer" className="text-[#006400] underline hover:text-[#005000]">DenteMax</a>).
                    Di questi {droppedPrev} preventivi abbandonati, stimiamo che il 30% ({wouldConvert}) si sarebbe convertito con un follow-up al momento giusto.
                  </p>
                  <p className="text-xs italic text-muted-foreground/70 pt-1">
                    Nota: Queste stime sono conservative rispetto alle medie di settore. I numeri reali potrebbero essere più alti.
                  </p>
                </div>
              </div>

              {/* Validation warning */}
              {results.totalMonthly < 2000 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8 text-center">
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Il risultato sembra basso. Verifica che i dati inseriti corrispondano alla realtà del tuo studio.
                  </p>
                </div>
              )}

              {/* CTA: Book a call */}
              <div className="text-center space-y-4">
                <a
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full sm:w-auto sm:inline-block"
                >
                  <NeonButton
                    variant="solid"
                    size="lg"
                    className="w-full sm:min-w-[320px] px-8 py-5 text-base font-semibold shadow-lg shadow-[#006400]/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    Scopri come recuperare questi soldi
                    <ArrowRight className="h-5 w-5" />
                  </NeonButton>
                </a>
                <p className="text-sm text-muted-foreground">
                  Consulenza gratuita di 10 minuti — nessun impegno
                </p>
              </div>

              {/* Email capture link */}
              <div className="text-center mt-6">
                <button
                  onClick={onEmailCapture}
                  className="inline-flex items-center gap-2 text-[#006400] hover:text-[#005000] font-medium transition-colors text-sm"
                >
                  <Mail className="h-4 w-4" />
                  Oppure ricevi il report completo via email
                </button>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </section>
  );
}

function BreakdownCard({
  icon,
  label,
  amount,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  amount: number;
  detail: string;
}) {
  return (
    <Card className="border border-border">
      <CardContent className="p-5 flex flex-col items-center text-center space-y-2">
        <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
          {icon}
        </div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="text-xl font-bold text-foreground">
          <CountUp to={amount} currency duration={1.5} />
          <span className="text-sm font-normal text-muted-foreground">/mese</span>
        </p>
        <p className="text-xs text-muted-foreground/70 leading-snug">{detail}</p>
      </CardContent>
    </Card>
  );
}