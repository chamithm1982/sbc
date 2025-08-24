
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
          
          /* Toggle Button Defaults (will be enforced by JS) */
          --chat--toggle--background: hsl(30 48% 64%);
          --chat--toggle--color: #ffffff;

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

      // --- NEW JAVASCRIPT-BASED SOLUTION ---
      // This is a more robust way to control the style when CSS fails.
      const interval = setInterval(() => {
        // The chat widget is inside a shadow DOM, so we need to query for it specifically.
        const chatHost = document.querySelector('n8n-chat');
        if (chatHost && chatHost.shadowRoot) {
          const toggleButton = chatHost.shadowRoot.querySelector('button[part="toggle"]');
          
          if (toggleButton) {
            // We found the button, so we can stop checking.
            clearInterval(interval);
            
            const baseColor = 'hsl(30 48% 64%)';
            
            // Set the initial style to be sure.
            (toggleButton as HTMLElement).style.backgroundColor = baseColor;

            // Add event listeners to force the color to stay the same on hover.
            toggleButton.addEventListener('mouseenter', () => {
              (toggleButton as HTMLElement).style.backgroundColor = baseColor;
            });
            toggleButton.addEventListener('mouseleave', () => {
              (toggleButton as HTMLElement).style.backgroundColor = baseColor;
            });
          }
        }
      }, 100); // Check every 100ms until the button is found.

      // Cleanup the interval if the component unmounts.
      return () => clearInterval(interval);
    }
  }, []);

  return null; // This component does not render any visible HTML element itself.
};

export default N8nChat;
