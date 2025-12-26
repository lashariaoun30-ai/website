import React, { useState } from "react";
import { NeonButton } from "./ui/neon-button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Phone, CheckCircle, Loader2, AlertCircle } from "lucide-react";

export const LiveDemoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    studioName: "",
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
      // Call Netlify Function
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
      <div className="bg-card w-full max-w-md rounded-xl border p-8 shadow-md text-center animate-in fade-in zoom-in duration-300">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-[#006400]" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Chiamata in Arrivo!</h3>
        <p className="text-muted-foreground">
          Tra pochi secondi il tuo telefono suonerà. Risponderà <strong>Sara</strong>, la tua segretaria AI.
        </p>
        <div className="mt-6 p-3 bg-muted/50 rounded-lg border">
          <p className="text-sm font-medium">
            Numero: <span className="font-mono text-[#006400]">{formData.phone}</span>
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
      className="bg-card m-auto h-fit w-full max-w-md rounded-xl border p-0.5 shadow-md text-left"
    >
      <div className="p-8 pb-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Dati di contatto</h3>
          <p className="text-sm text-muted-foreground">
            Inserisci i tuoi dati per attivare la demo.
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm">
              Nome Completo
            </Label>
            <Input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Mario Rossi"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studioName" className="text-sm">
              Nome dello Studio
            </Label>
            <Input
              type="text"
              required
              name="studioName"
              id="studioName"
              placeholder="Studio Dentistico Rossi"
              value={formData.studioName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="mario@esempio.it"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm">
              Telefono
            </Label>
            <Input
              type="tel"
              required
              name="phone"
              id="phone"
              placeholder="+39 333 1234567"
              value={formData.phone}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">
              Aggiungeremo +39 se manca
            </p>
          </div>

          <NeonButton 
            type="submit"
            variant="solid" 
            className="w-full mt-4 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Invio in corso...
              </>
            ) : (
              <>
                <Phone className="mr-2 h-4 w-4" />
                Ricevi la Chiamata Demo
              </>
            )}
          </NeonButton>
        </div>
      </div>

      <div className="bg-muted rounded-b-xl border-t p-3 text-center">
        <p className="text-xs text-muted-foreground">
          Nessuna carta di credito richiesta. Test gratuito immediato.
        </p>
      </div>
    </form>
  );
};