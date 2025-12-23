import React, { useState } from "react";
import { NeonButton } from "./ui/neon-button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Phone, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

export const LiveDemoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

    try {
      // Simulate API call to Make.com webhook
      // In production, replace with: await fetch('https://hook.eu1.make.com/your-placeholder-id', { method: 'POST', body: JSON.stringify(formData) })
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission failed", error);
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
        <h3 className="text-xl font-semibold mb-2">Richiesta Ricevuta!</h3>
        <p className="text-muted-foreground">
          Grazie {formData.fullName}! Il nostro AI ti chiamerà tra 30 secondi al numero <span className="font-semibold text-foreground">{formData.phone}</span>.
        </p>
        <p className="text-xs text-muted-foreground mt-6">
          Tieni il telefono a portata di mano.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card m-auto h-fit w-full max-w-md rounded-xl border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)] text-left"
    >
      <div className="p-8 pb-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Dati di contatto</h3>
          <p className="text-sm text-muted-foreground">
            Inserisci i tuoi dati per attivare la demo.
          </p>
        </div>

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
              required
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
