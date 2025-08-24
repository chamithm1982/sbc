import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Salon B Curls - Hair & Beauty Salon in Dandenong, Victoria',
  description: 'Discover your radiance at Salon B Curls. We offer premium hair styling and rejuvenating skin treatments in Dandenong, Victoria. Book your transformation today!',
};

const N8N_STYLE_URL = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
const N8N_SCRIPT_URL = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL || 'https://n8n.algorankau.com/webhook/87bbccd3-111d-407f-8ecc-90dac1611f61/chat';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link href={N8N_STYLE_URL} rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
        <Script id="n8n-chat-script" strategy="lazyOnload">
          {`
            (function() {
              if (window.n8nChat) return;
              const script = document.createElement('script');
              script.type = 'module';
              script.src = "${N8N_SCRIPT_URL}";
              script.onload = () => {
                const chatConfig = {
                  webhookUrl: "${N8N_WEBHOOK_URL}",
                  title: "Salon B Curls Assistant",
                  headerBackgroundColor: 'hsl(30 48% 64%)',
                  headerTextColor: 'hsl(0 0% 100%)',
                  userMessageBackgroundColor: 'hsl(30 48% 64%)',
                  userMessageTextColor: 'hsl(0 0% 100%)',
                  botMessageBackgroundColor: 'hsl(45 83% 90%)',
                  botMessageTextColor: 'hsl(30 48% 64%)',
                  chatBackgroundColor: 'hsl(53 83% 94%)',
                  bubbleBackgroundColor: 'hsl(30 48% 64%)',
                  bubbleTextColor: 'hsl(0 0% 100%)',
                  fontFamily: 'Montserrat, sans-serif',
                  welcomeMessage: 'Hello! How can I help you with booking an appointment or answering your questions today?',
                  inputPlaceholder: 'Type your message...',
                  showWelcomeMessage: true,
                  showCloseButton: true,
                };
                if (document.documentElement.classList.contains('dark')) {
                    chatConfig.headerBackgroundColor = 'hsl(30 55% 70%)';
                    chatConfig.headerTextColor = 'hsl(220 10% 10%)';
                    chatConfig.userMessageBackgroundColor = 'hsl(30 55% 70%)';
                    chatConfig.userMessageTextColor = 'hsl(220 10% 10%)';
                    chatConfig.botMessageBackgroundColor = 'hsl(45 60% 80%)';
                    chatConfig.botMessageTextColor = 'hsl(220 10% 10%)';
                    chatConfig.chatBackgroundColor = 'hsl(220 10% 10%)';
                    chatConfig.bubbleBackgroundColor = 'hsl(30 55% 70%)';
                    chatConfig.bubbleTextColor = 'hsl(220 10% 10%)';
                }
                
                window.n8nChat = { createChat: () => {} }; // Mock to prevent errors on fast re-renders
                
                import('${N8N_SCRIPT_URL}').then((module) => {
                  if (document.querySelector('.n8n-chat-widget')) return;
                  module.createChat(chatConfig);
                });
              };
              document.body.appendChild(script);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
