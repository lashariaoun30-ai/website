import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// --- HELPER: Manual Env Loader ---
function getEnvVar(key: string): string | undefined {
  if (process.env[key]) {
    return process.env[key];
  }
  try {
    const currentDir = (process as any).cwd ? (process as any).cwd() : process.env.PWD || '.';
    const localEnvPath = path.join(currentDir, 'app', 'api', 'trigger-call', '.env');
    if (fs.existsSync(localEnvPath)) {
      const fileContent = fs.readFileSync(localEnvPath, 'utf-8');
      const lines = fileContent.split('\n');
      for (const line of lines) {
        const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const fileKey = match[1];
          let fileValue = match[2] || '';
          if (fileValue.length > 0 && (fileValue.startsWith('"') || fileValue.startsWith("'"))) {
             fileValue = fileValue.substring(1, fileValue.length - 1);
          }
          if (fileKey === key) {
            return fileValue.trim();
          }
        }
      }
    }
  } catch (e) {
    console.warn("[Fallback Env] Error reading local file:", e);
  }
  return undefined;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, studioName, phone } = body;

    console.log("Incoming Call Request:", { fullName, studioName, phone });

    if (!fullName || !studioName || !phone) {
      return NextResponse.json(
        { error: 'Tutti i campi sono obbligatori' },
        { status: 400 }
      );
    }

    const VAPI_API_KEY = getEnvVar('VAPI_PRIVATE_API_KEY');
    const VAPI_PHONE_NUMBER_ID = getEnvVar('VAPI_PHONE_NUMBER_ID');

    if (!VAPI_API_KEY || !VAPI_PHONE_NUMBER_ID) {
      console.error('CRITICAL: Missing Vapi Env Vars.');
      return NextResponse.json(
        { error: 'Configurazione server incompleta (API KEY non trovata).' },
        { status: 500 }
      );
    }

    // --- PHONE SANITIZATION ---
    // E.164 Strict Format required by Vapi
    let sanitizedPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (sanitizedPhone.startsWith('00')) {
      sanitizedPhone = '+' + sanitizedPhone.slice(2);
    } else if (!sanitizedPhone.startsWith('+')) {
      sanitizedPhone = '+39' + sanitizedPhone; // Default to Italian prefix if missing
    }

    console.log("Sanitized Phone for Vapi:", sanitizedPhone);

    const systemPrompt = `
      Sei Sara, un'esperta segretaria virtuale per lo studio dentistico "${studioName}".
      
      IL TUO OBIETTIVO:
      Stai chiamando il Dottor/Dottoressa ${fullName} (il proprietario dello studio) per una dimostrazione tecnica di Savante AI. 
      Devi dimostrare di essere indistinguibile da una segretaria umana, gentile, professionale ed efficiente.

      REGOLE DI CONVERSAZIONE:
      1. Sii concisa. Non fare monologhi. Parla un italiano naturale.
      2. Se ti chiedono dettagli tecnici su come funzioni (es. "che modello usi?", "quanto costi?"), rispondi gentilmente: "Per i dettagli tecnici e commerciali, le consiglio di parlarne direttamente con i fondatori di Savante AI durante la consulenza. Io sono qui per mostrarle come gestisco i pazienti."

      FLUSSO DELLA CHIAMATA:
      1. INIZIO: Saluta con tono solare. "Buongiorno, chiamo dallo studio ${studioName}, sono l'assistente IA. Parlo con il Dottor ${fullName}?"
      2. CONFERMA: Se confermano, dì: "Piacere! Questa è la chiamata di prova che ha richiesto sul sito di Savante AI. Volevo farle sentire come accolgo i suoi pazienti. Vuole provare a simulare una prenotazione? Faccia finta di essere un paziente."
      3. SIMULAZIONE: 
         - Se l'utente accetta, gestisci la prenotazione (chiedi motivo, proponi domani alle 15:00 o alle 17:00).
         - Se l'utente prenota, conferma e chiedi se serve altro.
      4. CHIUSURA: "Spero che la demo le sia piaciuta. La lascio tornare al lavoro. Buona giornata!"
    `;

    // Construct Vapi Payload
    const payload = {
      phoneNumberId: VAPI_PHONE_NUMBER_ID,
      customer: {
        number: sanitizedPhone,
        name: fullName,
      },
      assistant: {
        name: "Savante AI Demo Assistant",
        firstMessage: `Buongiorno, chiamo dallo studio ${studioName}, sono l'assistente IA. Parlo con il Dottor ${fullName}?`,
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
          model: "eleven_turbo_v2_5", 
          language: "it",
          stability: 0.5,
          similarityBoost: 0.75
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "it"
        },
        startSpeakingPlan: {
          waitSeconds: 0.4,
        },
        analysisPlan: {
          summaryPlan: {
            enabled: true
          }
        }
      }
    };

    console.log("Sending Payload to Vapi:", JSON.stringify(payload, null, 2));

    const response = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vapi API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `Errore Vapi (${response.status}): ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Call Initiated Successfully. Call ID:", data.id);
    
    return NextResponse.json({ success: true, callId: data.id });

  } catch (error) {
    console.error('Trigger Call Exception:', error);
    return NextResponse.json(
      { error: 'Errore interno del server durante la richiesta.' },
      { status: 500 }
    );
  }
}