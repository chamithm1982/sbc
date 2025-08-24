
'use client';

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const N8nChat = () => {
  useEffect(() => {
    // This ensures the code is called only on the client side.
    if (typeof window !== 'undefined') {
      
      const customCss = `
        :root {
          /* Header */
          --chat--header--background: hsl(30 48% 64%);
          --chat--header--color: #ffffff;
          
          /* Toggle Button */
          --chat--toggle--background: hsl(30 48% 64%) !important;
          --chat--toggle--color: #ffffff !important;
          --chat--toggle--hover-background: hsl(30 48% 64%) !important; /* Set hover to same as default */
          --chat--toggle--active-background: hsla(30 48% 64% / 0.8) !important;

          /* User Message Bubble */
          --chat--message--user--background: hsl(30 48% 64%);
          --chat--message--user--color: #ffffff;

          /* Bot Message Bubble */
          --chat--message--bot--background: hsl(45 83% 90%);
          --chat--message--bot--color: hsl(30 48% 64%);
        }

        /* Force override for hover state on the button and any internal SVG icon */
        [data-n8n-chat-widget] [data-testid="chat-toggle"]:hover,
        [data-n8n-chat-widget] [data-testid="chat-toggle"]:hover svg {
          background: hsl(30 48% 64%) !important;
          fill: #ffffff !important;
        }
      `;

      // Create a <style> element
      const styleElement = document.createElement('style');
      styleElement.id = 'n8n-chat-custom-styles'; // Add an ID to prevent duplicates
      styleElement.innerHTML = customCss;

      // Append the <style> element to the document's <head>
      if (!document.getElementById(styleElement.id)) {
        document.head.appendChild(styleElement);
      }
      
      createChat({
        webhookUrl: "https://n8n.algorankau.com/webhook/87bbccd3-111d-407f-8ecc-90dac1611f61/chat",
        chatSession: {
          storage: 'disabled',
        },
      });
    }
  }, []);

  return null; // This component does not render any visible HTML element itself.
};

export default N8nChat;
