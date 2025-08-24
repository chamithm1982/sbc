
"use client";

import { useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';

// This should be your production webhook URL.
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook/87bbccd3-111d-407f-8ecc-90dac1611f61/chat';
const N8N_SCRIPT_URL = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
const N8N_STYLE_URL = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';

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
    let scriptElement: HTMLScriptElement | null = null;
    let styleLinkElement: HTMLLinkElement | null = null;

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
        // This might run if the script is still loading, so we can add a small delay and retry
        setTimeout(initializeChat, 100);
      }
    };

    // Load stylesheet
    if (!document.querySelector(`link[href="${N8N_STYLE_URL}"]`)) {
      styleLinkElement = document.createElement('link');
      styleLinkElement.href = N8N_STYLE_URL;
      styleLinkElement.rel = 'stylesheet';
      document.head.appendChild(styleLinkElement);
    }

    // Load script
    if (!document.querySelector(`script[src="${N8N_SCRIPT_URL}"]`)) {
      scriptElement = document.createElement('script');
      scriptElement.src = N8N_SCRIPT_URL;
      scriptElement.type = 'module';
      scriptElement.async = true;
      scriptElement.onload = initializeChat; // Initialize after script loads
      scriptElement.onerror = () => {
        if (isMounted) {
          console.error("Failed to load N8N chat script.");
        }
      };
      document.body.appendChild(scriptElement);
    } else {
      // If script is already on the page, just initialize
      initializeChat();
    }

    // Cleanup function
    return () => {
      isMounted = false;
      // It's generally better not to remove the script/style on unmount
      // as it can cause issues if the component re-mounts quickly.
      // The widget itself can be removed if necessary.
      const widget = document.querySelector('.n8n-chat-widget');
      if (widget) {
         // The N8N widget might not have a simple remove function,
         // but if it does, it would be called here.
         // For now, we'll rely on the check at the top of initializeChat
         // to prevent re-creation.
      }
    };
  }, [theme]); // Re-run if the theme changes to re-apply styles

  return null; // This component does not render anything itself
};

export default N8NChatbot;
