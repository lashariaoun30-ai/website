exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { fullName, studioName, phone } = JSON.parse(event.body);

    if (!fullName || !studioName || !phone) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Tutti i campi sono obbligatori' }) };
    }

    // SECURE: Keys from environment variables
    const API_KEY = process.env.VAPI_PRIVATE_API_KEY;
    const PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID;

    if (!API_KEY || !PHONE_NUMBER_ID) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error' }) };
    }

    // Sanitize phone
    let sanitizedPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (sanitizedPhone.startsWith('00')) {
      sanitizedPhone = '+' + sanitizedPhone.slice(2);
    } else if (!sanitizedPhone.startsWith('+')) {
      sanitizedPhone = '+39' + sanitizedPhone;
    }

    // Validate phone format
    if (!/^\+\d{10,15}$/.test(sanitizedPhone)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Numero di telefono non valido' }) };
    }

    const systemPrompt = `Sei Sara, una segretaria dentale esperta e professionale che lavora per lo studio ${studioName}.

IDENTITÀ E TONO:
- Parla in italiano naturale, come farebbe una vera segretaria italiana
- Usa un tono cordiale, solare e professionale
- Sii concisa: risposte brevi (1-2 frasi max), niente monologhi
- Parla in modo colloquiale ma rispettoso (usa "lei" formale)

CONTESTO DELLA CHIAMATA:
Stai chiamando il Dottor/Dottoressa ${fullName} per mostrargli una dimostrazione di Savante AI.

FLUSSO:
1. APERTURA: "Buongiorno, questo è lo studio ${studioName}, sono l'assistente IA. Parlo con il Dottor ${fullName}?"
2. DOPO CONFERMA: "Piacere! Questa è una chiamata di prova da Savante AI. Volevo mostrarti come gestisco le chiamate. Vuoi provare a simulare una prenotazione?"
3. GESTIONE PRENOTAZIONE: Chiedi motivo, proponi orari (domani 15:00 o giovedì 17:00)
4. CHIUSURA: "Spero che la demo ti sia piaciuta. Ti lascio tornare al lavoro. Buona giornata!"

GESTIONE DOMANDE TECNICHE:
Se chiede prezzi/dettagli: "Per i dettagli commerciali, ti consiglio di parlare con il team Savante. Io sono qui solo per mostrarti come lavoro."

REGOLE:
✅ Risposte brevi (max 2 frasi)
✅ Tono naturale
❌ Mai monologhi
❌ Mai inventare prezzi`;

    const payload = {
      phoneNumberId: PHONE_NUMBER_ID,
      customer: { number: sanitizedPhone, name: fullName },
      assistant: {
        firstMessage: `Buongiorno, questo è lo studio ${studioName}, sono l'assistente IA. Parlo con il Dottor ${fullName}?`,
        model: {
          provider: "openai",
          model: "gpt-4o",
          temperature: 0.7,
          messages: [{ role: "system", content: systemPrompt }]
        },
        voice: {
          provider: "11labs",
          voiceId: "cgSgspJ2msm6clMCkdW9",
          model: "eleven_turbo_v2_5",
          stability: 0.6,
          similarityBoost: 0.8
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "it",
          smartFormat: true
        },
        responseDelaySeconds: 0.4,
        maxDurationSeconds: 300
      }
    };

    const response = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vapi Error:', errorText);
      return { statusCode: response.status, body: JSON.stringify({ error: 'Errore chiamata' }) };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true, callId: data.id })
    };

  } catch (error) {
    console.error('Handler Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Errore del server' }) };
  }
};