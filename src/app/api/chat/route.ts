
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // IMPORTANT: Replace this with your actual N8N Chatbot Webhook URL.
    const n8nWebhookUrl = process.env.N8N_CHAT_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook/87bbccd3-111d-407f-8ecc-90dac1611f61/chat';

    // Forward the data to the webhook.
    const webhookResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error(`Webhook response was not ok: ${webhookResponse.status} ${webhookResponse.statusText} - Body: ${errorText}`);
      // Attempt to parse the error from N8N to provide a more specific message
      try {
        const errorJson = JSON.parse(errorText);
        return NextResponse.json({ message: errorJson.message || 'Error from webhook' }, { status: webhookResponse.status });
      } catch (e) {
        return NextResponse.json({ message: 'Error from webhook', details: errorText }, { status: webhookResponse.status });
      }
    }

    const responseData = await webhookResponse.json();
    
    // Return the response from the webhook to our chatbot client.
    return NextResponse.json(responseData, { status: 200 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in /api/chat route:', errorMessage);
    return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
  }
}
