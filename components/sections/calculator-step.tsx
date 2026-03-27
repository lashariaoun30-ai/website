import React, { useState } from "react";
import { PhoneMissed, UserX, FileText, Calculator, Mail } from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollReveal } from "../ui/scroll-reveal";
import { Slider } from "../ui/slider";
import { CountUp } from "../ui/count-up";
import { NeonButton } from "../ui/neon-button";
import { Card, CardContent } from "../ui/card";

// Hidden calculation constants
const MISSED_CALL_RATE = 0.32;
const NEVER_CALLBACK_RATE = 0.75;
const NEW_PATIENT_RATIO = 0.30;
const FOLLOWUP_DROP_RATE = 0.40;
const AVG_QUOTE_VALUE = 800;
const WORKING_DAYS = 22;

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
  patientValue: number
): CalculationResults {
  const missedCallLoss =
    dailyCalls *
    MISSED_CALL_RATE *
    NEW_PATIENT_RATIO *
    NEVER_CALLBACK_RATE *
    patientValue *
    WORKING_DAYS;

  const noShowLoss = noShows * patientValue;

  const followupLoss =
    dailyCalls *
    NEW_PATIENT_RATIO *
    WORKING_DAYS *
    FOLLOWUP_DROP_RATE *
    (AVG_QUOTE_VALUE * 0.3);

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
  const [dailyCalls, setDailyCalls] = useState(25);
  const [hoursOpen, setHoursOpen] = useState(9);
  const [noShows, setNoShows] = useState(8);
  const [patientValue, setPatientValue] = useState(400);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    const r = calculate(dailyCalls, noShows, patientValue);
    setResults(r);
    setShowResults(true);
    onCalculate(r);

    // Scroll to results after a brief delay
    setTimeout(() => {
      document.getElementById("calc-results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const getPersonalizationText = () => {
    const lines: string[] = [];
    if (dailyCalls >= 40) {
      lines.push(`Con ${dailyCalls} chiamate al giorno, il tuo studio è nella fascia alta di volume. Ogni chiamata persa pesa di più.`);
    } else if (dailyCalls >= 20) {
      lines.push(`Con ${dailyCalls} chiamate al giorno, il tuo studio ha un volume medio. Ma anche poche chiamate perse al giorno si accumulano velocemente.`);
    }
    if (noShows >= 10) {
      lines.push(`Il tuo tasso di no-show (${noShows}/mese) è sopra la media nazionale. Qui c'è molto margine di recupero.`);
    }
    if (patientValue >= 600) {
      lines.push(`Con pazienti dal valore medio di €${patientValue}, ogni singola chiamata persa pesa di più.`);
    }
    return lines;
  };

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
            <Card className="border border-border shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#006400] to-transparent opacity-50"></div>
              <CardContent className="p-6 sm:p-8 space-y-6">
                <Slider
                  min={5}
                  max={80}
                  step={5}
                  value={dailyCalls}
                  onChange={setDailyCalls}
                  label="Quante chiamate riceve il tuo studio al giorno?"
                  formatValue={(v) => `${v} chiamate`}
                />
                <Slider
                  min={6}
                  max={12}
                  step={1}
                  value={hoursOpen}
                  onChange={setHoursOpen}
                  label="Quante ore è aperto lo studio?"
                  formatValue={(v) => `${v} ore`}
                />
                <Slider
                  min={0}
                  max={30}
                  step={1}
                  value={noShows}
                  onChange={setNoShows}
                  label="Quanti pazienti non si presentano al mese?"
                  formatValue={(v) => `${v} no-show`}
                />
                <Slider
                  min={100}
                  max={2000}
                  step={50}
                  value={patientValue}
                  onChange={setPatientValue}
                  label="Valore medio di un nuovo paziente?"
                  formatValue={(v) =>
                    new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 0,
                    }).format(v)
                  }
                />

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
                />
                <BreakdownCard
                  icon={<UserX className="h-5 w-5" />}
                  label="No-show"
                  amount={results.noShowLoss}
                />
                <BreakdownCard
                  icon={<FileText className="h-5 w-5" />}
                  label="Follow-up mancati"
                  amount={results.followupLoss}
                />
              </div>

              {/* Personalization */}
              {getPersonalizationText().length > 0 && (
                <div className="bg-muted/30 rounded-xl border border-border p-5 mb-8 space-y-2">
                  {getPersonalizationText().map((line, i) => (
                    <p key={i} className="text-sm text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {/* Validation warning */}
              {results.totalMonthly < 2000 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8 text-center">
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Il risultato sembra basso. Verifica che i dati inseriti corrispondano alla realtà del tuo studio.
                  </p>
                </div>
              )}

              {/* Email capture CTA */}
              <div className="text-center">
                <button
                  onClick={onEmailCapture}
                  className="inline-flex items-center gap-2 text-[#006400] hover:text-[#005000] font-medium transition-colors text-sm"
                >
                  <Mail className="h-4 w-4" />
                  Vuoi ricevere il report completo via email?
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
}: {
  icon: React.ReactNode;
  label: string;
  amount: number;
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
      </CardContent>
    </Card>
  );
}