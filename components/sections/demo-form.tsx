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

    // Hardcoded credentials as requested for the demo
    const API_KEY = "153f1281-e9f8-469e-b2e8-46617797093b";
    // Updated to paid number ID
    const PHONE_NUMBER_ID = "8da055de-9b6f-4b10-b188-e49b74740b75";

    // 2. Sanitize Phone Number (Ensure E.164 format for Vapi)
    let sanitizedPhone = formData.phone.replace(/[\s\-\(\)]/g, '');
    
    // Logic for prefixing
    if (sanitizedPhone.startsWith('00')) {
      sanitizedPhone = '+' + sanitizedPhone.slice(2);
    } else if (!sanitizedPhone.startsWith('+')) {
      // Default to +39 only if it looks like a mobile number or user didn't specify country
      sanitizedPhone = '+39' + sanitizedPhone; 
    }

    // 3. Construct System Prompt & Payload
    const systemPrompt = `
      Sei Sara, una segretaria dentale esperta e professionale che lavora per lo studio ${formData.studioName}.

      IDENTITÀ E TONO:
      - Parla in italiano naturale, come farebbe una vera segretaria italiana
      - Usa un tono cordiale, solare e professionale
      - Sii concisa: risposte brevi (1-2 frasi max), niente monologhi
      - Parla in modo colloquiale ma rispettoso (usa "lei" formale)
      - Evita frasi robotiche o troppo formali

      CONTESTO DELLA CHIAMATA:
      Stai chiamando il Dottor/Dottoressa ${formData.fullName} (il proprietario dello studio) per mostrargli una dimostrazione di Savante AI. Il tuo obiettivo è fargli vedere come gestisci le chiamate dei pazienti in modo naturale e professionale.

      FLUSSO DELLA CONVERSAZIONE:

      1. APERTURA (Sempre inizia così):
      "Buongiorno, questo è lo studio ${formData.studioName}, sono l'assistente IA. Parlo con il Dottor ${formData.fullName}?"

      2. DOPO CONFERMA (Se dicono "sì" o confermano):
      "Piacere! Questa è una chiamata di prova da Savante AI. Volevo mostrarti come gestisco le chiamate. Vuoi provare a simulare una prenotazione? Puoi fare finta di essere un paziente."

      3. GESTIONE PRENOTAZIONE (Se accettano di simulare):
      - Chiedi: "Perfetto! Per quale motivo vorrebbe prenotare? Visita di controllo o qualcosa di specifico?"
      - Dopo la risposta: "Capito. Le va bene domani alle 15:00 oppure preferisce giovedì alle 17:00?"
      - Quando scelgono: "Perfetto, segno [giorno] alle [ora]. Le serve altro?"
      - Se dicono no: Vai alla chiusura

      4. CHIUSURA (Sempre finisci così):
      "Spero che la demo ti sia piaciata. Ti lascio tornare al lavoro. Buona giornata!"

      GESTIONE DOMANDE TECNICHE/COMMERCIALI:
      Se il dottore chiede dettagli tecnici o commerciali (es. "Quanto costa?", "Come funziona tecnicamente?", "Che modello usi?"), rispondi:
      "Per i dettagli tecnici e commerciali, ti consiglio di parlarne direttamente con i fondatori di Savante AI durante una consulenza gratuita. Io sono qui solo per mostrarti come accolgo i pazienti. Vuoi che ti passi il link per prenotare?"

      REGOLE COMPORTAMENTALI:

      ✅ SEMPRE:
      - Rispondi con frasi brevi e naturali (max 2 frasi)
      - Usa pause naturali quando parli
      - Se l'utente ti interrompe, adattati e segui il nuovo flusso
      - Sii paziente e sorridente
      - Conferma sempre ciò che l'utente dice prima di procedere

      ❌ MAI:
      - Fare lunghi monologhi o spiegazioni complesse
      - Ripetere informazioni già dette
      - Usare linguaggio robotico o troppo formale
      - Inventare dettagli su prezzi, funzionalità o contratti
      - Insistere se l'utente vuole chiudere la chiamata

      OBIETTIVO: Far sentire il dottore come se stesse parlando con una vera segretaria professionale, non con un robot. Mantieni la conversazione fluida, naturale e breve.
    `;

    const payload = {
      phoneNumberId: PHONE_NUMBER_ID,
      customer: {
        number: sanitizedPhone,
        name: formData.fullName,
      },
      assistant: {
        firstMessage: `Buongiorno, questo è lo studio ${formData.studioName}, sono l'assistente IA. Parlo con il Dottor ${formData.fullName}?`,
        model: {
          provider: "openai",
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: systemPrompt
            }
          ]
        },
        voice: {
          provider: "11labs", 
          voiceId: "cgSgspJ2msm6clMCkdW9", // Jessica
          model: "eleven_turbo_v2_5"
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "it"
        }
      }
    };

    try {
      // 4. Send Request directly to Vapi (Client-Side)
      const response = await fetch('https://api.vapi.ai/call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Parse error carefully
        let errorMsg = `Errore HTTP ${response.status}`;
        try {
            const errorData = await response.json();
            // Handle specific Vapi error regarding free tier international calls
            if (errorData.message && errorData.message.includes("international calls")) {
                errorMsg = "Il piano gratuito Vapi non supporta chiamate verso l'Italia (+39). Usa un numero USA o aggiorna il piano su vapi.ai.";
            } else {
                errorMsg = errorData.message || JSON.stringify(errorData);
            }
        } catch (e) {
            errorMsg = await response.text();
        }
        throw new Error(errorMsg);
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