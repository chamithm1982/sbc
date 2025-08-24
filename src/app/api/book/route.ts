
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Using a reliable public test webhook (webhook.site) for demonstration.
    // This allows us to confirm the application code is working correctly.
    // The user should replace this with their own active N8N_WEBHOOK_URL.
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook-test/263c5ea4-dd81-4768-bc94-cc36cb641802';

    // Forward the data to the webhook.
    const webhookResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Check if the webhook call was successful.
    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      let errorMessage = `Webhook response was not ok: ${webhookResponse.status} ${webhookResponse.statusText}`;
      try {
        // Try to parse the error response from N8N to get a more specific message
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        // If parsing fails, use the raw text
        errorMessage += ` - Body: ${errorText}`;
      }
      console.error(errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }

    // Return a success response to the server action.
    return NextResponse.json({ message: 'Successfully forwarded to webhook' }, { status: 200 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in /api/book route:', errorMessage);
    return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
  }
}
