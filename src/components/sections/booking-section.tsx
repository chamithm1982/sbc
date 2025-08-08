
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { SERVICES_DATA, SERVICE_PACKAGES_DATA } from '@/lib/constants';
import { useFormStatus } from 'react-dom';
import { submitBooking, FormState } from '@/app/actions';
import { useEffect, useRef, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  preferredDate: z.date({
    required_error: 'A preferred date is required.',
  }),
  message: z.string().optional(),
});

const allServices = [...SERVICES_DATA, ...SERVICE_PACKAGES_DATA];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      size="lg" 
      className="w-full bg-primary hover:bg-primary/90 rounded-lg text-lg"
      disabled={pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Request Appointment
    </Button>
  );
}


export default function BookingSection() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      service: '',
      message: '',
    },
  });

  const [state, formAction] = useActionState<FormState, FormData>(submitBooking, {
    message: '',
    success: false,
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Request Sent!',
          description: state.message,
        });
        form.reset();
        formRef.current?.reset();
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, form, toast]);
  
  return (
    <section id="book" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="rounded-xl shadow-2xl border-2 border-primary/10">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-4xl md:text-5xl font-bold text-primary mb-2">
                Book An Appointment
              </CardTitle>
              <p className="font-body text-lg text-foreground/80">
                Fill out the form below to request your appointment.
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  ref={formRef}
                  action={formAction}
                  className="space-y-6 font-body"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. jane.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service You're Inquiring About</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} name={field.name}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {allServices.map((service) => (
                              <SelectItem key={service.id} value={service.name}>
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Preferred Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        {/* Hidden input to pass date to server action */}
                        <input type="hidden" name={field.name} value={field.value?.toISOString()} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any extra details, e.g., preferred time..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <SubmitButton />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
