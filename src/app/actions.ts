
'use server';

import { z } from 'zod';

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  preferredDate: z.date({ required_error: 'A date is required.' }),
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
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    service: formData.get('service'),
    preferredDate: new Date(formData.get('preferredDate') as string),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'There was an error with your submission.',
      success: false,
    };
  }

  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'https://n8n.example.com/webhook/your-id'; // IMPORTANT: Replace with your actual N8N webhook URL or set it as an environment variable.

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      throw new Error(`Webhook response was not ok: ${response.statusText}`);
    }
    
    return { message: 'Thank you! Your booking request has been sent.', success: true };
  } catch (error) {
    console.error('Error submitting to N8N webhook:', error);
    return {
      message: 'Sorry, there was a problem sending your request. Please try again later.',
      success: false,
    };
  }
}
