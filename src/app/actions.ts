
'use server';

import { z } from 'zod';

// Zod schema for validating form data.
// It now correctly handles the date as a string from FormData and transforms it into a Date object.
const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  preferredDate: z.string().transform((str, ctx) => {
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
  
  // Use environment variable for the webhook URL, with a fallback for local testing.
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook-test/e6d3f05a-3c25-4db0-ad72-6ad5c215ccd5'; 

  try {
    // Send the validated data to the webhook.
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    // Check if the webhook call was successful.
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Webhook response was not ok: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    // Return a success message.
    return { message: 'Thank you! Your booking request has been sent.', success: true };
  } catch (error) {
    console.error('Error submitting to N8N webhook:', error);
    return {
      message: 'Sorry, there was a problem sending your request. Please try again later.',
      success: false,
    };
  }
}
