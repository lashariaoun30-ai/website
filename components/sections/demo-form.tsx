import React, { useState } from "react";
import { NeonButton } from "../ui/neon-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Phone, CheckCircle, Loader2, AlertCircle } from "lucide-react";

export const DemoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    studioName: "",
    phone: "",
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
      // Call Netlify Function (SECURE - no exposed keys!)
      const response = await fetch('/.netlify/functions/trigger-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          studioName: formData.studioName,
          phone: formData.phone
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore durante la chiamata');
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Vapi Call Error:", err);
      setError(err.message || "Impossibile avviare la chiamata. Verifica il numero e riprova.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-card w-full max-w-md rounded-xl border border-[#006400]/20 p-6 sm:p-8 shadow-2xl shadow-[#006400]/10 text-center animate-in fade-in zoom-in duration-300">
        <div className="mx-auto w-20 h-20 bg-[#006400]/10 rounded-full flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-[#006400]/20 rounded-full flex items-center justify-center animate-pulse">
             <CheckCircle className="w-8 h-8 text-[#006400]" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3">Chiamata in Arrivo!</h3>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Tra pochi secondi il tuo telefono suonerà. <br/>
          Risponderà <strong>Sara</strong>, la tua nuova segretaria AI.
        </p>
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border/50">
            <p className="text-sm font-medium text-foreground">
              Numero in chiamata: <span className="font-mono text-[#006400]">{formData.phone}</span>
            </p>
        </div>
        <NeonButton 
            variant="ghost" 
            className="mt-6 w-full"
            onClick={() => setIsSuccess(false)}
          >
            Fai un'altra prova
        </NeonButton>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card m-auto h-fit w-full max-w-md rounded-xl border border-border p-1 shadow-xl text-left relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#006400] to-transparent opacity-50"></div>
      
      <div className="p-6 sm:p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2 tracking-tight">Inserisci i tuoi dati</h3>
          <p className="text-muted-foreground">
            L'IA personalizzerà la conversazione in base al nome del tuo studio.
          </p>
        </div>

        {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg flex items-start gap-3 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="flex-1 break-words font-medium">
                  {error}
                </div>
            </div>
        )}

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Il tuo Nome
            </Label>
            <Input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Es. Dott. Mario Rossi"
              value={formData.fullName}
              onChange={handleChange}
              className="h-11 bg-muted/30 focus:bg-background transition-colors"
            />
          </div>

          <div className="space-y-2">
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

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Numero di Cellulare
            </Label>
            <Input
              type="tel"
              required
              name="phone"
              id="phone"
              placeholder="+39 333 1234567"
              value={formData.phone}
              onChange={handleChange}
               className="h-11 bg-muted/30 focus:bg-background transition-colors"
            />
            <p className="text-[11px] text-muted-foreground">
              Inserisci il numero completo. Aggiungeremo +39 se manca.
            </p>
          </div>

          <NeonButton 
            type="submit"
            variant="solid" 
            className="w-full mt-6 h-14 text-base font-semibold shadow-lg shadow-[#006400]/20 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Avvio chiamata in corso...
              </>
            ) : (
              <>
                <Phone className="h-5 w-5" />
                Ricevi la Chiamata (Gratis)
              </>
            )}
          </NeonButton>
        </div>
      </div>

      <div className="bg-muted/50 border-t border-border/50 p-4 text-center">
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
          <CheckCircle className="w-3 h-3 text-[#006400]" />
          Nessuna carta di credito richiesta. Test immediato.
        </p>
      </div>
    </form>
  );
};