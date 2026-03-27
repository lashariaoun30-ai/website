import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { NeonButton } from "../ui/neon-button";
import { Mail, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import type { CalculationResults } from "./calculator-step";

interface EmailCaptureModalProps {
  results: CalculationResults;
  onClose: () => void;
  onSuccess: () => void;
}

export function EmailCaptureModal({
  results,
  onClose,
  onSuccess,
}: EmailCaptureModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    studioName: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/.netlify/functions/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          results,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore durante l'invio");
      }

      onSuccess();
    } catch (err: any) {
      console.error("Email capture error:", err);
      setError(err.message || "Impossibile inviare. Riprova.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card w-full max-w-md rounded-xl border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#006400]/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-[#006400]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Ricevi il report completo
              </h3>
              <p className="text-sm text-muted-foreground">
                I numeri del tuo studio, le cause e la soluzione.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg flex items-start gap-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
                placeholder="dottore@studio.it"
                value={formData.email}
                onChange={handleChange}
                className="h-11 bg-muted/30 focus:bg-background transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium">
                Nome
              </Label>
              <Input
                type="text"
                required
                name="name"
                id="name"
                placeholder="Es. Dott. Mario Rossi"
                value={formData.name}
                onChange={handleChange}
                className="h-11 bg-muted/30 focus:bg-background transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="studioName" className="text-sm font-medium">
                Nome dello Studio
              </Label>
              <Input
                type="text"
                required
                name="studioName"
                id="studioName"
                placeholder="Es. Studio Dentistico Rossi"
                value={formData.studioName}
                onChange={handleChange}
                className="h-11 bg-muted/30 focus:bg-background transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city" className="text-sm font-medium">
                Città
              </Label>
              <Input
                type="text"
                required
                name="city"
                id="city"
                placeholder="Es. Milano"
                value={formData.city}
                onChange={handleChange}
                className="h-11 bg-muted/30 focus:bg-background transition-colors"
              />
            </div>

            <NeonButton
              type="submit"
              variant="solid"
              size="lg"
              className="w-full h-12 text-base font-semibold shadow-lg shadow-[#006400]/20 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Invio in corso...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Invia il Report
                </>
              )}
            </NeonButton>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-4 text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            No grazie, continua senza
          </button>
        </form>
      </div>
    </div>
  );
}