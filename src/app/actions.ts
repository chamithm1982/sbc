
'use server';

import { z } from 'zod';

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
  
  // This should be the absolute URL of your deployed application.
  // Using a relative URL will work for client-side, but server-side actions need the full URL.
  // We determine the host based on the VERCEL_URL or a fallback for local development.
  const host = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:9002';
  const apiUrl = `${host}/api/book`;

  try {
    // Send the validated data to our own API route.
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    // Check if the API route call was successful.
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API route response was not ok: ${response.status}`);
    }
    
    // Return a success message.
    return { message: 'Thank you! Your booking request has been sent.', success: true };
  } catch (error: unknown) {
    // Log the detailed error for debugging purposes.
    console.error('Error submitting to the /api/book route:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      message: `Sorry, there was a problem sending your request. Error: ${errorMessage}`,
      success: false,
    };
  }
}
