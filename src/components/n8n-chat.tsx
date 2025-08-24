"use client";

import { useEffect } from 'react';

const N8nChat = () => {
  useEffect(() => {
    // Dynamically import the createChat function from the CDN
    import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js')
      .then((module) => {
        // Once the module is loaded, call createChat
        module.createChat({
          webhookUrl: 'https://n8n.algorankau.com/webhook/263c5ea4-dd81-4768-bc94-cc36cb641802',
        });
      })
      .catch((error) => {
        console.error('Failed to load n8n chat widget:', error);
      });
  }, []); // The empty dependency array ensures this runs only once on mount

  return null; // This component does not render any visible element itself
};

export default N8nChat;
