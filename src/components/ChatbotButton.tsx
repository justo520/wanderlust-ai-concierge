
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';
import AIChat from './AIChat';

export default function ChatbotButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState('');

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setInitialPrompt(''); // Reset the initial prompt when toggling
  };

  const openChatWithPrompt = (prompt: string) => {
    setInitialPrompt(prompt);
    setIsChatOpen(true);
  };

  return (
    <>
      <Button 
        onClick={toggleChat}
        size="lg"
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg bg-wanderlust-teal hover:bg-wanderlust-teal/90 p-0 flex items-center justify-center"
      >
        {isChatOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </Button>

      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-md bg-white rounded-lg shadow-xl animate-fade-in">
          <AIChat onClose={() => setIsChatOpen(false)} initialPrompt={initialPrompt} />
        </div>
      )}
    </>
  );
}
