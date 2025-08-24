
"use client";

import { useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';

// This should be your production webhook URL.
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook/87bbccd3-111d-407f-8ecc-90dac1611f61/chat';

const N8NChatbot = () => {
  const { theme } = useTheme(); // Use the site's theme to potentially adjust styles

  useEffect(() => {
    // Function to initialize the chat widget
    const initializeChat = () => {
      // Avoid re-initializing if it already exists
      if ((window as any).n8nChat) {
        return;
      }

      // Dynamically load the chat bundle
      import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js')
        .then(({ createChat }) => {
          (window as any).n8nChat = createChat({
            webhookUrl: N8N_WEBHOOK_URL,
            // --- Customization Options ---
            title: "Salon B Curls Assistant",
            headerBackgroundColor: 'hsl(var(--primary))', // #D4A373
            headerTextColor: 'hsl(var(--primary-foreground))', // White
            userMessageBackgroundColor: 'hsl(var(--primary))', // #D4A373
            userMessageTextColor: 'hsl(var(--primary-foreground))',
            botMessageBackgroundColor: 'hsl(var(--accent))', // #FAEDCD
            botMessageTextColor: 'hsl(var(--accent-foreground))', // #D4A373
            chatBackgroundColor: 'hsl(var(--background))', // #FEFAE0
            bubbleBackgroundColor: 'hsl(var(--primary))',
            bubbleTextColor: 'hsl(var(--primary-foreground))',
            fontFamily: 'Montserrat, sans-serif',
            // Custom messages
            welcomeMessage: 'Hello! How can I help you with booking an appointment or answering your questions today?',
            inputPlaceholder: 'Type your message...',
            // Other settings
            showWelcomeMessage: true,
            showCloseButton: true,
          });
        })
        .catch(err => console.error("Failed to load N8N chat script:", err));
    };

    // Load the stylesheet
    if (!document.querySelector('link[href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css"]')) {
      const styleLink = document.createElement('link');
      styleLink.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
      styleLink.rel = 'stylesheet';
      document.head.appendChild(styleLink);
    }

    // Initialize the chat. We add a small delay to ensure theme variables are loaded.
    const timer = setTimeout(initializeChat, 100);

    // Cleanup function on component unmount
    return () => {
      clearTimeout(timer);
      const widget = document.querySelector('.n8n-chat-widget');
      if (widget) {
        widget.remove();
      }
      delete (window as any).n8nChat;
    };
  }, [theme]); // Re-run if the theme changes

  return null; // This component does not render anything itself
};

export default N8NChatbot;
