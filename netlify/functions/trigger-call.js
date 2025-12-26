exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { fullName, studioName, phone } = JSON.parse(event.body);

    if (!fullName || !studioName || !phone) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const API_KEY = process.env.VAPI_PRIVATE_API_KEY;
    const PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID;

    if (!API_KEY || !PHONE_NUMBER_ID) {
      console.error('Missing environment variables');
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Sanitize phone number (exact same logic)
    let sanitizedPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (sanitizedPhone.startsWith('00')) {
      sanitizedPhone = '+' + sanitizedPhone.slice(2);
    } else if (!sanitizedPhone.startsWith('+')) {
      sanitizedPhone = '+39' + sanitizedPhone;
    }

    // System prompt (exact same)
    const systemPrompt = `
      Sei Sara, una segretaria dentale esperta e professionale che lavora per lo studio ${studioName}.

      IDENTITÀ E TONO:
      - Parla in italiano naturale, come farebbe una vera segretaria italiana
      - Usa un tono cordiale, solare e professionale
      - Sii concisa: risposte brevi (1-2 frasi max), niente monologhi
      - Parla in modo colloquiale ma rispettoso (usa "lei" formale)
      - Evita frasi robotiche o troppo formali

      CONTESTO DELLA CHIAMATA:
      Stai chiamando il Dottor/Dottoressa ${fullName} (il proprietario dello studio) per mostrargli una dimostrazione di Savante AI. Il tuo obiettivo è fargli vedere come gestisci le chiamate dei pazienti in modo naturale e professionale.

      FLUSSO DELLA CONVERSAZIONE:

      1. APERTURA (Sempre inizia così):
      "Buongiorno, questo è lo studio ${studioName}, sono l'assistente IA. Parlo con il Dottor ${fullName}?"

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

    // EXACT payload structure from working code
    const payload = {
      phoneNumberId: PHONE_NUMBER_ID,
      customer: {
        number: sanitizedPhone,
        name: fullName,
      },
      assistant: {
        firstMessage: `Buongiorno, questo è lo studio ${studioName}, sono l'assistente IA. Parlo con il Dottor ${fullName}?`,
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
          voiceId: "cgSgspJ2msm6clMCkdW9",
          model: "eleven_turbo_v2_5"
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "it"
        }
      }
    };

    console.log('Calling Vapi with payload...');

    // EXACT endpoint from working code
    const response = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Vapi response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vapi error:', errorText);
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Vapi call failed' })
      };
    }

    const data = await response.json();
    console.log('Success! Call ID:', data.id);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: true, callId: data.id })
    };

  } catch (error) {
    console.error('Handler error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  }
};