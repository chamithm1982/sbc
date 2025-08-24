"use client";

import { useEffect } from 'react';

// This component uses the n8n chat embed script directly from a CDN 
// to avoid the previous npm installation issues.

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook/87bbccd3-111d-407f-8ecc-90dac1611f61/chat';

declare global {
  interface Window {
    n8nChat: {
      createChat: (config: any) => void;
    };
  }
}

const N8nChat = () => {
  useEffect(() => {
    // Check if the script is already on the page to avoid duplicates
    if (document.getElementById('n8n-chat-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'n8n-chat-script';
    script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // Once the script is loaded, the `n8nChat` object is available on the window
      if (window.n8nChat) {
        window.n8nChat.createChat({
          webhookUrl: N8N_WEBHOOK_URL,
          chatContainer: {
            position: 'bottom-right',
            width: '400px',
            height: '600px',
          },
          // Custom styles are applied via CSS variables in globals.css
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      const scriptElement = document.getElementById('n8n-chat-script');
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  return null; // This component doesn't render any visible elements itself
};

export default N8nChat;