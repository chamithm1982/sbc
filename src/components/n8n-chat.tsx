
'use client';

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const N8nChat = () => {
  useEffect(() => {
    // This ensures the createChat function is called only on the client side.
    if (typeof window !== 'undefined') {
      createChat({
        webhookUrl: "https://n8n.algorankau.com/webhook/263c5ea4-dd81-4768-bc94-cc36cb641802",
        theme: {
          // These HSL values are taken directly from globals.css to ensure consistency
          // and are injected at initialization to prevent style flashing.
          colors: {
            primary: 'hsl(30 48% 64%)',
            primaryShade50: 'hsla(30 48% 64% / 0.9)',
            primaryShade100: 'hsla(30 48% 64% / 0.8)',
            secondary: 'hsl(45 83% 90%)',
            secondaryShade50: 'hsla(45 83% 90% / 0.9)',
            white: '#ffffff',
            light: 'hsl(53 83% 94%)',
            dark: 'hsl(30 20% 25%)',
          },
          header: {
            background: 'hsl(30 48% 64%)',
            color: 'hsl(0 0% 100%)',
          },
          userMessage: {
            background: 'hsl(30 48% 64%)',
            color: 'hsl(0 0% 100%)',
          },
          botMessage: {
            background: 'hsl(45 83% 90%)',
            color: 'hsl(30 48% 64%)',
          },
          toggle: {
            background: 'hsl(30 48% 64%)',
            hoverBackground: 'hsla(30 48% 64% / 0.9)',
            activeBackground: 'hsla(30 48% 64% / 0.8)',
            color: 'hsl(0 0% 100%)',
          },
        },
      });
    }
  }, []);

  return null; // This component does not render any visible HTML element itself.
};

export default N8nChat;
