
"use client";

import { useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';

// This should be your production webhook URL.
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook/87bbccd3-111d-407f-8ecc-90dac1611f61/chat';
const N8N_SCRIPT_URL = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
const N8N_STYLE_URL = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';


const N8NChatbot = () => {
  const { theme } = useTheme(); // Use the site's theme to potentially adjust styles

  useEffect(() => {
    let isMounted = true;

    const initializeChat = async () => {
      // Avoid re-initializing if it already exists
      if (document.querySelector('.n8n-chat-widget')) {
        return;
      }

      try {
        // Dynamically import the ES module
        const chatModule = await import(/* @vite-ignore */ N8N_SCRIPT_URL);
        
        if (isMounted && chatModule && typeof chatModule.createChat === 'function') {
          chatModule.createChat({
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
        } else if (isMounted) {
            console.error("N8N chat module loaded, but createChat function not found.");
        }
      } catch (error) {
        if (isMounted) {
            console.error("Failed to load or initialize N8N chat script:", error);
        }
      }
    };

    // Load the stylesheet if it doesn't exist
    if (!document.querySelector(`link[href="${N8N_STYLE_URL}"]`)) {
      const styleLink = document.createElement('link');
      styleLink.href = N8N_STYLE_URL;
      styleLink.rel = 'stylesheet';
      document.head.appendChild(styleLink);
    }
    
    // Use a small timeout to ensure theme variables are available
    const timer = setTimeout(initializeChat, 100);

    // Cleanup function on component unmount
    return () => {
      isMounted = false;
      clearTimeout(timer);
      const widget = document.querySelector('.n8n-chat-widget');
      if (widget) {
        widget.remove();
      }
    };
  }, [theme]); // Re-run if the theme changes

  return null; // This component does not render anything itself
};

export default N8NChatbot;
