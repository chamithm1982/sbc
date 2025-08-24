
"use client";

import { useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';

// This should be your production webhook URL.
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook/87bbccd3-111d-407f-8ecc-90dac1611f61/chat';
const N8N_SCRIPT_URL = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

// Define the shape of the N8N chat module for TypeScript
declare global {
  interface Window {
    n8nChat: {
      createChat: (config: any) => void;
    };
  }
}

const N8NChatbot = () => {
  const { theme } = useTheme();

  useEffect(() => {
    let isMounted = true;

    const initializeChat = () => {
      // Check if the createChat function is available on the window object
      if (isMounted && window.n8nChat && typeof window.n8nChat.createChat === 'function') {
        // Avoid re-initializing if the widget already exists
        if (document.querySelector('.n8n-chat-widget')) {
          return;
        }

        window.n8nChat.createChat({
          webhookUrl: N8N_WEBHOOK_URL,
          title: "Salon B Curls Assistant",
          headerBackgroundColor: 'hsl(var(--primary))',
          headerTextColor: 'hsl(var(--primary-foreground))',
          userMessageBackgroundColor: 'hsl(var(--primary))',
          userMessageTextColor: 'hsl(var(--primary-foreground))',
          botMessageBackgroundColor: 'hsl(var(--accent))',
          botMessageTextColor: 'hsl(var(--accent-foreground))',
          chatBackgroundColor: 'hsl(var(--background))',
          bubbleBackgroundColor: 'hsl(var(--primary))',
          bubbleTextColor: 'hsl(var(--primary-foreground))',
          fontFamily: 'Montserrat, sans-serif',
          welcomeMessage: 'Hello! How can I help you with booking an appointment or answering your questions today?',
          inputPlaceholder: 'Type your message...',
          showWelcomeMessage: true,
          showCloseButton: true,
        });
      } else if (isMounted) {
        // If the script is still loading, retry after a short delay
        setTimeout(initializeChat, 100);
      }
    };

    // Load script tag
    const script = document.createElement('script');
    script.src = N8N_SCRIPT_URL;
    script.type = 'module';
    script.async = true;
    script.onload = initializeChat;
    document.body.appendChild(script);

    return () => {
      isMounted = false;
      // It's better not to remove the script itself on unmount
      // as it can interfere with quick re-mounts.
      // The `initializeChat` function already prevents re-creation.
    };
  }, [theme]); // Re-run if the theme changes to re-apply styles

  return null; // This component does not render anything itself
};

export default N8NChatbot;
