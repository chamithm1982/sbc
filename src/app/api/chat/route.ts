
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // IMPORTANT: Replace this with your actual N8N Chatbot Webhook URL.
    const n8nWebhookUrl = process.env.N8N_CHAT_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook/03c30f9f-dd73-47e7-9e6e-3d62cd820960';

    // Forward the data to the webhook.
    const webhookResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // We get the body regardless of whether the call was successful
    const responseData = await webhookResponse.json();

    if (!webhookResponse.ok) {
      // Log the detailed error for debugging on the server
      console.error(`Webhook response was not ok: ${webhookResponse.status} ${webhookResponse.statusText} - Body: ${JSON.stringify(responseData)}`);
      
      // Send a structured error response back to the client
      const errorMessage = responseData.message || 'Error from webhook';
      return NextResponse.json({ error: errorMessage }, { status: webhookResponse.status });
    }
    
    // Return the successful response from the webhook to our chatbot client.
    return NextResponse.json(responseData, { status: 200 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in /api/chat route:', errorMessage);
    // Return a structured error for unexpected issues in this route
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}
