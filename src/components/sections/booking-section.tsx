
'use client';

import { useState, useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SERVICES_DATA, SERVICE_PACKAGES_DATA } from '@/lib/constants';
import { submitBooking, FormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const allServices = [...SERVICES_DATA, ...SERVICE_PACKAGES_DATA];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      className="w-full bg-primary hover:bg-primary/90 rounded-lg text-lg"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Request Appointment
    </Button>
  );
}

export default function BookingSection() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [date, setDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const initialState: FormState = { message: '', success: false, errors: {} };
  const [state, formAction] = useActionState(submitBooking, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Request Sent!',
          description: state.message,
        });
        formRef.current?.reset();
        setDate(undefined);
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setIsCalendarOpen(false); // Close the calendar on date selection
  };

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
              <form ref={formRef} action={formAction} className="space-y-6 font-body">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="e.g. Jane Doe" required />
                  {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="e.g. jane.doe@example.com" required />
                  {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service You're Inquiring About</Label>
                  <Select name="service" required>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {allServices.map((service) => (
                        <SelectItem key={service.id} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {state.errors?.service && <p className="text-sm font-medium text-destructive">{state.errors.service[0]}</p>}
                </div>

                <div className="space-y-2">
                   <Label htmlFor="date">Preferred Date</Label>
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={'outline'}
                                className={cn(
                                    'w-full justify-start text-left font-normal',
                                    !date && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, 'PPP') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={handleDateSelect}
                                disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() - 1)) || d < new Date("1900-01-01")}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {/* The date is passed as a string because FormData stringifies it. */}
                    <input type="hidden" name="preferredDate" value={date?.toString() ?? ''} />
                    {state.errors?.preferredDate && <p className="text-sm font-medium text-destructive">{state.errors.preferredDate[0]}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Any extra details, e.g., preferred time..."
                    className="resize-none"
                  />
                   {state.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message[0]}</p>}
                </div>

                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
