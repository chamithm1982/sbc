"use client";

import { useEffect } from 'react';

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook/87bbccd3-111d-407f-8ecc-90dac1611f61/chat';

const N8NChatbot = () => {
  useEffect(() => {
    // Check if the script is already added to avoid duplicates
    if (document.getElementById('n8n-chat-script')) {
      return;
    }

    const styleLink = document.createElement('link');
    styleLink.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    styleLink.rel = 'stylesheet';
    document.head.appendChild(styleLink);

    const script = document.createElement('script');
    script.id = 'n8n-chat-script';
    script.type = 'module';
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

      // Check if a chat instance already exists to prevent re-initialization on hot reloads
      if (!window.n8nChat) {
        window.n8nChat = createChat({
          webhookUrl: '${N8N_WEBHOOK_URL}',
        });
      }
    `;
    
    document.body.appendChild(script);

    return () => {
      // Cleanup on component unmount
      document.head.removeChild(styleLink);
      document.body.removeChild(script);
      // Also remove the chat widget from the DOM
      const widget = document.querySelector('.n8n-chat-widget');
      if (widget) {
        widget.remove();
      }
      delete (window as any).n8nChat;
    };
  }, []);

  return null; // This component doesn't render anything itself
};

export default N8NChatbot;
