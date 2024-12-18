export async function POST(req) {
  try {
    // Parse the incoming request body
    const body = await req.json();

    // Define the headers and request payload
    const headers = {
      Authorization: 'Bearer nxdevtest', // Replace 'your_key' with the actual API key
      'Content-Type': 'application/json',
    };

    const payload = {
      messages: [
        {
          role: 'system',
          content: "You are ChatGPT, a large language model trained by OpenAI.\nCarefully heed the user's instructions.\nRespond using Markdown.",
        },
        ...body.messages, // Include messages from the incoming request
      ],
      model: body.model || 'gpt-4o', // Default model if not provided
      stream: body.stream || true, // Optional: Allow streaming
    };

    // Make the POST request to the external API
    const response = await fetch('https://api.nexusmind.tech/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    // Parse and return the response from the external API
    if (response.ok) {
      const responseData = await response.json();
      return new Response(JSON.stringify(responseData), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    } else {
      const errorData = await response.json();
      console.error('Error from NexusMind API:', errorData);
      return new Response(JSON.stringify({ error: 'Limit Reached...', details: errorData }), {
        headers: { 'Content-Type': 'application/json' },
        status: response.status,
      });
    }
  } catch (error) {
    console.error('Internal Server Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}
