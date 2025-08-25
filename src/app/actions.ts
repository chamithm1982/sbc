
'use server';

import { z } from 'zod';
import { randomUUID } from 'crypto';

// Zod schema for validating form data from the booking form.
const BookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  // The date comes from FormData as a string, so we validate it as a string.
  preferredDate: z.string().min(1, { message: 'Please select a date.' }),
  message: z.string().optional(),
});


export type FormState = {
  message: string;
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    service?: string[];
    preferredDate?: string[];
    message?: string[];
  };
};

export async function submitBooking(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = BookingFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    service: formData.get('service'),
    preferredDate: formData.get('preferredDate'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    console.error('Validation failed:', validatedFields.error.flatten().fieldErrors);
    return {
      message: 'There was an error with your submission. Please check the fields.',
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Use the environment variable for the webhook URL.
  // Fallback to the last known production URL if not set.
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook/263c5ea4-dd81-4768-bc94-cc36cb641802';
  
  // The data is valid, prepare it for sending.
  const payload = validatedFields.data;

  console.log(`Attempting to send booking data to: ${n8nWebhookUrl}`);
  console.log('Payload:', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseBody = await response.text();
    console.log(`N8N Response Status: ${response.status}`);
    console.log(`N8N Response Body: ${responseBody}`);
    
    if (!response.ok) {
        // Check if the response body contains a JSON with a message
        try {
            const errorJson = JSON.parse(responseBody);
            if (errorJson.message) {
                throw new Error(errorJson.message);
            }
        } catch (e) {
            // Not a JSON or doesn't have a message, fall back to status text
        }
        throw new Error(`Webhook response was not ok: ${response.status} ${response.statusText}`);
    }

    return { message: 'Thank you! Your booking request has been sent.', success: true };
  } catch (error: unknown) {
    console.error('Error submitting to N8N webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      message: `Sorry, there was a problem sending your request. Error: ${errorMessage}`,
      success: false,
    };
  }
}

// --- Chat Widget Server Action ---

const ChatSchema = z.object({
  message: z.string().min(1),
});

export type ChatState = {
  message: string;
  error?: string;
};

export async function sendChatMessage(
  prevState: ChatState,
  formData: FormData
): Promise<ChatState> {
  const validatedFields = ChatSchema.safeParse({
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: '',
      error: 'Message is required.',
    };
  }
  
  const userMessage = validatedFields.data.message;
  const n8nWebhookUrl = process.env.N8N_CHAT_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook/03c30f9f-dd73-47e7-9e6e-3d62cd820960';
  
  const payload = {
    sessionId: randomUUID(),
    action: 'sendMessage',
    chatInput: userMessage,
  };

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    const responseBody = await response.text();

    if (!response.ok) {
      return { message: '', error: `Sorry, I could not get a response from the assistant. Status: ${response.status}` };
    }

    if (!responseBody.trim()) {
        return { message: "Your message was sent, but the assistant didn't reply. Please try asking in a different way." };
    }

    try {
        const responseData = JSON.parse(responseBody);
        const botResponse = responseData.output;

        if (botResponse) {
          return { message: botResponse };
        } else {
          return { message: "I've received your message, but I don't have a specific response right now." };
        }
    } catch (parseError) {
        return { message: responseBody };
    }

  } catch (error) {
    console.error('Error sending chat message:', error);
    return { message: '', error: 'An unexpected error occurred. Please try again.' };
  }
}
