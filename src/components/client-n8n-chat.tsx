
'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { createChat } from '@n8n/chat';

// Dynamically import the base chat component without server-side rendering
const N8nChat = dynamic(() => import('@/components/n8n-chat'), {
  ssr: false,
});

const ClientN8nChat = () => {
  useEffect(() => {
    // This entire block now runs only on the client side.
    if (typeof window !== 'undefined') {
      
      const customCss = `
        :root {
          /* Header */
          --chat--header--background: hsl(30 48% 64%);
          --chat--header--color: #ffffff;
          
          /* User Message Bubble */
          --chat--message--user--background: hsl(30 48% 64%);
          --chat--message--user--color: #ffffff;

          /* Bot Message Bubble */
          --chat--message--bot--background: hsl(45 83% 90%);
          --chat--message--bot--color: hsl(30 48% 64%);
        }
      `;

      // Create a <style> element for the parts that work (chat window)
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

      // --- JAVASCRIPT-BASED SOLUTION FOR HOVER ---
      // This is the most robust way to control the style when CSS fails.
      const interval = setInterval(() => {
        const chatHost = document.querySelector('n8n-chat');
        if (chatHost && chatHost.shadowRoot) {
          const toggleButton = chatHost.shadowRoot.querySelector('button[part="toggle"]');
          
          if (toggleButton) {
            clearInterval(interval);
            
            const baseColor = 'hsl(30 48% 64%)';
            
            // Set initial color
            (toggleButton as HTMLElement).style.backgroundColor = baseColor;

            // Force color on mouse enter
            toggleButton.addEventListener('mouseenter', () => {
              (toggleButton as HTMLElement).style.backgroundColor = baseColor;
            });

            // Force color on mouse leave
            toggleButton.addEventListener('mouseleave', () => {
              (toggleButton as HTMLElement).style.backgroundColor = baseColor;
            });
          }
        }
      }, 100);

      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, []);

  return <N8nChat />;
};

export default ClientN8nChat;
