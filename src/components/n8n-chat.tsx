
'use client';

import { useEffect } from 'react';

const N8nChat = () => {
  useEffect(() => {
    if (document.getElementById('n8n-chat-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'n8n-chat-script';
    script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
    script.async = true;

    // Use data-attributes for reliable, declarative initialization
    script.dataset.webhookUrl = 'https://n8n.algorankau.com/webhook/263c5ea4-dd81-4768-bc94-cc36cb641802';
    script.dataset.chatInputKey = 'chatInput';
    
    // Customization via data-attributes
    script.dataset.i18n = JSON.stringify({
      en: {
        title: 'Welcome to Salon B Curls!',
        subtitle: "How can we help you today?",
        inputPlaceholder: 'Type your message...',
      },
    });

    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById('n8n-chat-script');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []); // Empty dependency array ensures this runs only once.

  return null; // This component doesn't render anything itself.
};

export default N8nChat;
