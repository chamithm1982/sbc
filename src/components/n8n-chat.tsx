
'use client';

import { useEffect } from 'react';

// Extend the Window interface to include n8nChat
declare global {
  interface Window {
    n8nChat?: {
      createChat: (options: { webhookUrl: string }) => void;
    };
  }
}

const N8nChat = () => {
  useEffect(() => {
    // Check if the script is already added to prevent duplicates
    if (document.getElementById('n8n-chat-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'n8n-chat-script';
    script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
    script.type = 'module';
    
    // This is the crucial part: We wait for the script to load before trying to use it.
    script.onload = () => {
      if (window.n8nChat) {
        window.n8nChat.createChat({
          webhookUrl: 'https://n8n.algorankau.com/webhook/263c5ea4-dd81-4768-bc94-cc36cb641802',
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup function to remove the script if the component unmounts
    return () => {
      const existingScript = document.getElementById('n8n-chat-script');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount.

  return null; // This component does not render anything itself.
};

export default N8nChat;
