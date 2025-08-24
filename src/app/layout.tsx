
'use client';

import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
// We are removing the N8nChat component and handling it here directly.
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Check if the script has already been added to avoid duplicates.
    if (document.getElementById('n8n-chat-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'n8n-chat-script';
    script.type = 'module';
    script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
    
    // This is the crucial part: we wait for the script to load, THEN initialize.
    script.onload = () => {
      if (window.n8nChat) {
        window.n8nChat.createChat({
          webhookUrl: 'https://n8n.algorankau.com/webhook/263c5ea4-dd81-4768-bc94-cc36cb641802',
          // We pass customization options here directly via JavaScript
          // This is a more reliable way to override the default styles.
          i18n: {
            en: {
              title: 'Welcome to Salon B Curls!',
              subtitle: "How can we help you today?",
              inputPlaceholder: 'Type your message...',
            },
          },
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      const existingScript = document.getElementById('n8n-chat-script');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount.

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Salon B Curls - Hair & Beauty Salon in Dandenong, Victoria</title>
        <meta name="description" content="Discover your radiance at Salon B Curls. We offer premium hair styling and rejuvenating skin treatments in Dandenong, Victoria. Book your transformation today!" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
          {/* The chat is now initialized via the useEffect hook above */}
        </ThemeProvider>
      </body>
    </html>
  );
}

// We need to declare n8nChat on the window object for TypeScript
declare global {
  interface Window {
    n8nChat: {
      createChat: (options: any) => void;
    };
  }
}
