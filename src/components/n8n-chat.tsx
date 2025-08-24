
'use client';

import { useEffect } from 'react';

const N8nChat = () => {
  useEffect(() => {
    // Check if the script is already added to prevent duplicates
    if (document.getElementById('n8n-chat-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'n8n-chat-script';
    script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
    script.async = true;
    script.type = 'module';

    // A more reliable way to initialize is to use the script's own mechanism.
    // We can add data-attributes that the script will automatically read on load.
    script.dataset.webhookUrl = 'https://n8n.algorankau.com/webhook/263c5ea4-dd81-4768-bc94-cc36cb641802';
    script.dataset.chatInputKey = 'chatInput';

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
