
'use client';

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        </ThemeProvider>
        
        {/* n8n Chatbot Scripts */}
        <script src="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.n8nChat) {
                window.n8nChat.createChat({
                  webhookUrl: 'https://n8n.algorankau.com/webhook/263c5ea4-dd81-4768-bc94-cc36cb641802',
                });
              }
            `,
          }}
        ></script>
      </body>
    </html>
  );
}
