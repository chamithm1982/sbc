
'use client';

import { useState, useRef, useEffect, useActionState } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { sendChatMessage, ChatState } from '@/app/actions';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" className="shrink-0" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      <span className="sr-only">Send</span>
    </Button>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Hi I am Ally how can I help you today?"
    }
  ]);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const [state, formAction] = useActionState<ChatState, FormData>(sendChatMessage, { message: '' });

  useEffect(() => {
    if (state?.message) {
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: state.message }]);
    }
    if (state?.error) {
       setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: state.error || 'An error occurred.' }]);
    }
  }, [state]);
  
  useEffect(() => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTo({
        top: scrollViewportRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleFormSubmit = (formData: FormData) => {
    const userMessage = formData.get('message') as string;
    if (userMessage.trim()) {
      setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userMessage }]);
      formAction(formData);
      formRef.current?.reset();
    }
  };

  return (
    <>
      <div className={cn(
        "fixed bottom-4 right-4 z-50 transition-all duration-300",
        isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
      )}>
        <Button
          size="icon"
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-8 w-8 text-primary-foreground" />
        </Button>
      </div>

      <div className={cn(
        "fixed bottom-4 right-4 z-50 transition-all duration-300 w-[calc(100vw-2rem)] max-w-sm",
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      )}>
        <Card className="flex flex-col h-[70vh] max-h-[600px] rounded-xl shadow-2xl bg-card">
          <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4 rounded-t-xl">
            <CardTitle className="text-lg font-headline">Chat with us</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground h-8 w-8">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-hidden">
             <ScrollArea className="h-full" viewportRef={scrollViewportRef}>
              <div className="space-y-4 pr-4">
                {messages.map((message, index) => (
                  <div key={index} className={cn("flex items-end gap-2", message.sender === 'user' ? 'justify-end' : 'justify-start')}>
                    {message.sender === 'bot' && (
                      <Avatar className="h-8 w-8 self-start">
                        <AvatarFallback><Sparkles className="h-5 w-5" /></AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn("max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-none' 
                        : 'bg-accent text-accent-foreground rounded-bl-none'
                    )}>
                      <p className="break-words">{message.text}</p>
                    </div>
                     {message.sender === 'user' && (
                      <Avatar className="h-8 w-8 self-start">
                        <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <form
              ref={formRef}
              action={handleFormSubmit}
              className="flex w-full items-center space-x-2"
            >
              <Input
                name="message"
                placeholder="Type a message..."
                autoComplete="off"
              />
              <SubmitButton />
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
