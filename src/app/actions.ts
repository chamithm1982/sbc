
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
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    service: formData.get('service'),
    preferredDate: formData.get('preferredDate'),
    message: formData.get('message'),
  };

  const validatedFields = FormSchema.safeParse({
    ...rawData,
    preferredDate: rawData.preferredDate ? new Date(rawData.preferredDate as string) : undefined,
  });

  if (!validatedFields.success) {
    console.error('Validation failed:', validatedFields.error.flatten().fieldErrors);
    return {
      message: 'There was an error with your submission. Please check the fields.',
      success: false,
    };
  }

  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook-test/e6d3f05a-3c25-4db0-ad72-6ad5c215ccd5'; 

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Webhook response was not ok: ${response.status} ${response.statusText} - ${errorText}`);
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
