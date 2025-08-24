
'use client';

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const N8nChat = () => {
  useEffect(() => {
    // This ensures the createChat function is called only on the client side.
    if (typeof window !== 'undefined') {
      
      const customStyles = `
        :root {
          --chat--color-primary: hsl(30 48% 64%); /* Muted Brown */
          --chat--color-primary-shade-50: hsla(30 48% 64% / 0.9);
          --chat--color-primary-shade-100: hsla(30 48% 64% / 0.8);
          
          --chat--color-secondary: hsl(45 83% 90%); /* Pale Yellow */
          --chat--color-secondary-shade-50: hsla(45 83% 90% / 0.9);

          --chat--color-white: #ffffff;
          --chat--color-light: hsl(53 83% 94%); /* Light Yellow BG */
          --chat--color-dark: hsl(30 20% 25%); /* Dark Brown Text */

          /* Header & Toggle Button */
          --chat--header--background: var(--chat--color-primary);
          --chat--header--color: var(--chat--color-white);
          --chat--toggle--background: var(--chat--color-primary);
          --chat--toggle--color: var(--chat--color-white);
          --chat--toggle--hover-background: var(--chat--color-primary-shade-50);
          --chat--toggle--active-background: var(--chat--color-primary-shade-100);

          /* User Message Bubble */
          --chat--message--user--background: var(--chat--color-primary);
          --chat--message--user--color: var(--chat--color-white);

          /* Bot Message Bubble */
          --chat--message--bot--background: var(--chat--color-secondary);
          --chat--message--bot--color: var(--chat--color-primary);
        }
      `;
      
      createChat({
        webhookUrl: "https://n8n.algorankau.com/webhook/87bbccd3-111d-407f-8ecc-90dac1611f61/chat",
        style: customStyles,
      });
    }
  }, []);

  return null; // This component does not render any visible HTML element itself.
};

export default N8nChat;
