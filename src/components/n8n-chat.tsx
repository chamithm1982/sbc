
'use client';

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const N8nChat = () => {
  useEffect(() => {
    // This ensures the createChat function is called only on the client side.
    if (typeof window !== 'undefined') {
      createChat({
        webhookUrl: "https://n8n.algorankau.com/webhook/87bbccd3-111d-407f-8ecc-90dac1611f61/chat",
      });
    }
  }, []);

  return null; // This component does not render any visible HTML element itself.
};

export default N8nChat;
