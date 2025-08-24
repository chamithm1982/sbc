
'use client';

import dynamic from 'next/dynamic';

const N8nChat = dynamic(() => import('@/components/n8n-chat'), {
  ssr: false,
});

const ClientN8nChat = () => {
  return <N8nChat />;
};

export default ClientN8nChat;
