
"use client";

import { useEffect } from 'react';

const N8N_WEBHOOK_URL = 'https://n8n.algorankau.com/webhook/87bbccd3-111d-407f-8ecc-90dac1611f61/chat';

const N8nChat = () => {
  useEffect(() => {
    // Prevent script from being added multiple times
    if (document.getElementById('n8n-chat-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'n8n-chat-script';
    script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.js';
    
    // Use data attributes for automatic initialization by the script
    script.dataset.webhookUrl = N8N_WEBHOOK_URL;
    script.dataset.position = 'bottom-right';

    script.async = true;
    script.defer = true;
    
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      const scriptElement = document.getElementById('n8n-chat-script');
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  return null; // This component does not render any visible elements itself
};

export default N8nChat;
