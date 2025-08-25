
'use server';

import { z } from 'zod';
import { randomUUID } from 'crypto';

// Zod schema for validating form data.
// It now correctly handles the date as a string from FormData and transforms it into a Date object.
const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  preferredDate: z.string().transform((str, ctx) => {
    // The date comes from `toISOString()`, so it's a valid format.
    const date = new Date(str);
    if (isNaN(date.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: 'Invalid date format',
      });
      return z.NEVER;
    }
    return date;
  }),
  message: z.string().optional(),
});

export type FormState = {
  message: string;
  success: boolean;
};

export async function submitBooking(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Extract raw data from the form.
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    service: formData.get('service'),
    preferredDate: formData.get('preferredDate'),
    message: formData.get('message'),
  };

  // Validate the form data against the schema.
  const validatedFields = FormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.error('Validation failed:', validatedFields.error.flatten().fieldErrors);
    return {
      message: 'There was an error with your submission. Please check the fields.',
      success: false,
    };
  }
  
  // The N8N webhook URL to send the booking data to directly.
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook-test/263c5ea4-dd81-4768-bc94-cc36cb641802';


  // Prepare the data for sending, ensuring the date is in a standard string format.
  const payload = {
    ...validatedFields.data,
    preferredDate: validatedFields.data.preferredDate.toISOString(),
  };

  try {
    // Send the validated data directly to the N8N webhook.
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    console.log(`N8N Response Status: ${response.status}`);
    const responseBody = await response.text();
    console.log(`N8N Response Body: ${responseBody}`);

    // Check if the webhook call was successful.
    if (!response.ok) {
      throw new Error(`Webhook response was not ok: ${response.status} ${response.statusText}`);
    }
    
    // Return a success message.
    return { message: 'Thank you! Your booking request has been sent.', success: true };
  } catch (error: unknown) {
    // Log the detailed error for debugging purposes.
    console.error('Error submitting to the N8N webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      message: `Sorry, there was a problem sending your request. Error: ${errorMessage}`,
      success: false,
    };
  }
}

// --- New Server Action for Custom Chat Widget ---

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
    sessionId: randomUUID(), // Generate a unique ID for the session
    action: 'sendMessage',
    chatInput: userMessage,
  };

  console.log(`Sending payload to webhook: ${n8nWebhookUrl}`);
  console.log(`Payload: ${JSON.stringify(payload)}`);

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    const responseBody = await response.text();
    console.log('Webhook Response Status:', response.status);
    console.log('Webhook Response Body:', responseBody);

    if (!response.ok) {
      return {
        message: '',
        error: `Sorry, I could not get a response from the assistant. Status: ${response.status}`,
      };
    }

    // Handle cases where the webhook responds with a 2xx status but an empty body.
    if (!responseBody.trim()) {
        console.log('Webhook returned a successful but empty response.');
        return {
            message: "Your message was sent, but the assistant didn't reply. Please try asking in a different way."
        };
    }

    try {
        const responseData = JSON.parse(responseBody);
        // The webhook returns an `output` field in the JSON response
        const botResponse = responseData.output;

        if (botResponse) {
          return { message: botResponse };
        } else {
          console.warn('Webhook response JSON is missing the "output" field.');
          return { message: "I've received your message, but I don't have a specific response right now." };
        }
        
    } catch (parseError) {
        console.error('Error parsing JSON response from webhook:', parseError);
        // If the response is not JSON, but the request was successful, treat the body itself as the message.
        return {
            message: responseBody,
        };
    }

  } catch (error) {
    console.error('Error sending chat message:', error);
    return {
      message: '',
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
