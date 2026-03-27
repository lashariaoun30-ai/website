import React, { useState, useEffect } from "react";
import { CalculatorStep, type CalculationResults } from "./sections/calculator-step";
import { EmailCaptureModal } from "./sections/email-capture-modal";
import { DiagnosisStep } from "./sections/diagnosis-step";
import { SolutionBookingStep } from "./sections/solution-booking-step";

export default function CalcolatorePage() {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  useEffect(() => {
    document.title =
      "Calcolatore Fatturato Perso — Studio Dentistico | Savant-e";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Scopri quanto fatturato perde il tuo studio dentistico dalle chiamate senza risposta. Calcolatore gratuito in 30 secondi."
      );
    }
  }, []);

  const handleCalculate = (r: CalculationResults) => {
    setResults(r);
  };

  const handleEmailCapture = () => {
    setShowEmailCapture(true);
  };

  const handleEmailClose = () => {
    setShowEmailCapture(false);
    scrollToDiagnosis();
  };

  const handleEmailSuccess = () => {
    setShowEmailCapture(false);
    scrollToDiagnosis();
  };

  const scrollToDiagnosis = () => {
    setTimeout(() => {
      document
        .getElementById("diagnosi")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="relative font-sans antialiased selection:bg-[#006400] selection:text-white">
      <section id="calcola">
        <CalculatorStep
          onCalculate={handleCalculate}
          onEmailCapture={handleEmailCapture}
        />
      </section>

      <section id="diagnosi">
        <DiagnosisStep />
      </section>

      <section id="soluzione">
        <SolutionBookingStep />
      </section>

      {showEmailCapture && results && (
        <EmailCaptureModal
          results={results}
          onClose={handleEmailClose}
          onSuccess={handleEmailSuccess}
        />
      )}
    </div>
  );
}