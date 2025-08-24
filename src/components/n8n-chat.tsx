
"use client";

import { useEffect } from 'react';

const N8nChat = () => {
  useEffect(() => {
    // Check if the script has already been added to avoid duplicates.
    if (document.getElementById('n8n-chat-script')) {
      return;
    }

    // Create a new script element.
    const script = document.createElement('script');
    script.id = 'n8n-chat-script';
    script.type = 'module';

    // The n8n chat script is designed to automatically initialize
    // when it finds its configuration in data attributes.
    // This is a more reliable method than calling createChat manually.
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      createChat({
        webhookUrl: 'https://n8n.algorankau.com/webhook/263c5ea4-dd81-4768-bc94-cc36cb641802',
      });
    `;

    // Append the script to the body to load and execute it.
    document.body.appendChild(script);

    // Optional: Cleanup function to remove the script when the component unmounts.
    return () => {
      const existingScript = document.getElementById('n8n-chat-script');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount.

  return null; // This component does not render any visible element itself.
};

export default N8nChat;
