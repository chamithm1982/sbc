
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
    // Function to initialize the chat widget
    const initializeChat = () => {
      // Avoid re-initializing if it already exists
      if (document.querySelector('.n8n-chat-widget')) {
        return;
      }

      // Check if the createChat function is available on the window object
      if ((window as any).n8nChat && typeof (window as any).n8nChat.createChat === 'function') {
        (window as any).n8nChat.createChat({
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
      } else {
        console.error("N8N chat script loaded, but createChat function not found.");
      }
    };

    // Load the stylesheet if it doesn't exist
    if (!document.querySelector(`link[href="${N8N_STYLE_URL}"]`)) {
      const styleLink = document.createElement('link');
      styleLink.href = N8N_STYLE_URL;
      styleLink.rel = 'stylesheet';
      document.head.appendChild(styleLink);
    }

    // Load the script if it doesn't exist
    if (!document.querySelector(`script[src="${N8N_SCRIPT_URL}"]`)) {
        const script = document.createElement('script');
        script.src = N8N_SCRIPT_URL;
        script.type = 'module';
        script.async = true;
        // Initialize chat after the script has loaded
        script.onload = () => setTimeout(initializeChat, 100); // Small delay for theme vars
        script.onerror = () => console.error("Failed to load N8N chat script.");
        document.body.appendChild(script);
    } else {
        // If script is already present, just initialize
        setTimeout(initializeChat, 100);
    }
    
    // Cleanup function on component unmount
    return () => {
      const widget = document.querySelector('.n8n-chat-widget');
      if (widget) {
        widget.remove();
      }
      // Note: We don't remove the script/style tags as they might be needed by other instances
      // and removing them can be complex. The widget itself is removed.
    };
  }, [theme]); // Re-run if the theme changes

  return null; // This component does not render anything itself
};

export default N8NChatbot;
