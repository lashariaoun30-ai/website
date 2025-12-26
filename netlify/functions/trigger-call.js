exports.handler = async (event) => {
  console.log('Function called');
  
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
        body: JSON.stringify({ error: 'Missing fields' })
      };
    }

    const API_KEY = process.env.VAPI_PRIVATE_API_KEY;
    const PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID;

    if (!API_KEY || !PHONE_NUMBER_ID) {
      console.error('Missing env vars');
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Config error' })
      };
    }

    let sanitizedPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (sanitizedPhone.startsWith('00')) {
      sanitizedPhone = '+' + sanitizedPhone.slice(2);
    } else if (!sanitizedPhone.startsWith('+')) {
      sanitizedPhone = '+39' + sanitizedPhone;
    }

    // CORRECTED PAYLOAD STRUCTURE according to Vapi docs
    const payload = {
      phoneNumberId: PHONE_NUMBER_ID,
      customer: {
        number: sanitizedPhone,
        name: fullName
      },
      assistant: {
        firstMessage: `Buongiorno, questo è lo studio ${studioName}, sono l'assistente IA. Parlo con il Dottor ${fullName}?`,
        model: {
          provider: "openai",
          model: "gpt-4o",
          temperature: 0.7,
          messages: [{
            role: "system",
            content: `Sei Sara, segretaria per lo studio ${studioName}. Chiami ${fullName} per una demo. Sii breve, naturale e professionale.`
          }]
        },
        voice: {
          provider: "11labs",
          voiceId: "cgSgspJ2msm6clMCkdW9"
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "it"
        }
      }
    };

    console.log('Calling Vapi API...');
    
    const response = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log('Vapi status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vapi error:', errorText);
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: `Vapi error: ${response.status}` })
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
    console.error('Error:', error.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  }
};