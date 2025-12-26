exports.handler = async (event) => {
  console.log('=== FUNCTION CALLED ===');
  console.log('Method:', event.httpMethod);
  console.log('Headers:', JSON.stringify(event.headers));
  
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
    console.log('ERROR: Wrong method');
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('Body:', event.body);
    const { fullName, studioName, phone } = JSON.parse(event.body);
    console.log('Parsed data:', { fullName, studioName, phone });

    if (!fullName || !studioName || !phone) {
      console.log('ERROR: Missing fields');
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const API_KEY = process.env.VAPI_PRIVATE_API_KEY;
    const PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID;

    console.log('API_KEY exists:', !!API_KEY);
    console.log('PHONE_NUMBER_ID exists:', !!PHONE_NUMBER_ID);

    if (!API_KEY || !PHONE_NUMBER_ID) {
      console.log('ERROR: Missing environment variables');
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    let sanitizedPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (sanitizedPhone.startsWith('00')) {
      sanitizedPhone = '+' + sanitizedPhone.slice(2);
    } else if (!sanitizedPhone.startsWith('+')) {
      sanitizedPhone = '+39' + sanitizedPhone;
    }

    console.log('Sanitized phone:', sanitizedPhone);

    const payload = {
      phoneNumberId: PHONE_NUMBER_ID,
      customer: { number: sanitizedPhone, name: fullName },
      assistant: {
        firstMessage: `Buongiorno, questo è lo studio ${studioName}, sono l'assistente IA. Parlo con il Dottor ${fullName}?`,
        model: {
          provider: "openai",
          model: "gpt-4o",
          messages: [{
            role: "system",
            content: `Sei Sara. Chiami ${fullName} per demo. Breve e naturale.`
          }]
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

    console.log('Calling Vapi at: https://api.vapi.ai/call');
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const response = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log('Vapi response status:', response.status);
    const responseText = await response.text();
    console.log('Vapi response body:', responseText);

    if (!response.ok) {
      console.log('ERROR: Vapi API failed');
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: `Vapi error: ${response.status}` })
      };
    }

    const data = JSON.parse(responseText);
    console.log('SUCCESS! Call ID:', data.id);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: true, callId: data.id })
    };

  } catch (error) {
    console.log('EXCEPTION:', error.message);
    console.log('Stack:', error.stack);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  }
};