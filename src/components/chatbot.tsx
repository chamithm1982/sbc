
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CornerDownLeft, MessageSquare, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi 👋, how can we help?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate or retrieve a unique chat ID from session storage
    let storedChatId = sessionStorage.getItem("chatId");
    if (!storedChatId) {
      storedChatId = "chat_" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("chatId", storedChatId);
    }
    setChatId(storedChatId);
  }, []);
  
  useEffect(() => {
    // Scroll to the bottom of the chat body when new messages are added
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || !chatId || isLoading) return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: chatId,
          message: inputValue,
          route: 'general'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // If the response is not OK, display the detailed error from the API as a bot message.
        const errorMessageText = data.message || data.details || 'Sorry, an unknown error occurred.';
        const errorMessage: Message = { text: `Error: ${errorMessageText}`, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      } else {
        // If the response is OK, display the bot's message.
        const botMessage: Message = { text: data.output || "Sorry, I couldn't understand that.", sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }

    } catch (error) {
      // Catch network errors or other unexpected issues.
      const errorMessageText = error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error sending message:", errorMessageText);
      const errorMessage: Message = { text: `Sorry, something went wrong: ${errorMessageText}`, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget Container */}
      <div className={cn(
        "fixed bottom-5 right-5 z-50 w-[350px] h-[500px] bg-card border border-border rounded-xl shadow-2xl flex-col overflow-hidden",
        "transition-all duration-300 ease-in-out",
        isOpen ? "flex opacity-100 translate-y-0" : "hidden opacity-0 translate-y-4"
      )}>
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 font-bold flex justify-between items-center">
          <span className="font-headline text-lg">Salon B Curls Assistant</span>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 hover:bg-primary/80">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Body */}
        <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-4 font-body">
          {messages.map((msg, index) => (
            <div key={index} className={cn(
              "p-3 rounded-lg max-w-[85%] text-sm break-words",
              msg.sender === 'user' 
                ? 'bg-muted text-muted-foreground self-end ml-auto' 
                : 'bg-primary text-primary-foreground self-start mr-auto'
            )}>
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2">
                 <div className="p-3 rounded-lg bg-primary text-primary-foreground self-start mr-auto">
                    <Loader2 className="h-5 w-5 animate-spin" />
                 </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border flex items-center gap-2">
          <Input
            type="text"
            id="chat-widget-input"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isLoading} size="icon">
            <CornerDownLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-lg",
          "transition-all duration-300 ease-in-out",
          !isOpen ? "flex opacity-100 scale-100" : "hidden opacity-0 scale-90"
        )}
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </>
  );
};

export default Chatbot;
