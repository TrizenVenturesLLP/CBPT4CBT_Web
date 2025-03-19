
import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { sendMessageToDialogflow } from '../services/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface DialogflowChatProps {
  characterName: string;
  agentId: string;
}

interface Message {
  content: string;
  isUser: boolean;
}

export function DialogflowChat({ characterName, agentId }: DialogflowChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(localStorage.getItem(`chat_session_${characterName}`) || uuidv4());
  const [isLoading, setIsLoading] = useState(false);

  // Get character avatar based on name
  const getCharacterAvatar = (name: string) => {
    switch (name) {
      case "Monkey D. Luffy":
        return "/lovable-uploads/c78a849a-a375-44d9-be29-7b46c9a7ddc0.png";
      case "Tony Stark":
        return "/tony_stark.jpg";
      case "Peter Parker":
        return "/peter_parker.webp";
      default:
        return "/placeholder.svg";
    }
  };

  // Store session ID in localStorage
  useEffect(() => {
    localStorage.setItem(`chat_session_${characterName}`, sessionIdRef.current);
  }, [characterName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Add user message to chat
    setMessages(prev => [...prev, {
      content: inputMessage,
      isUser: true
    }]);
    
    setIsLoading(true);

    try {
      // Get response from Dialogflow service
      const response = await sendMessageToDialogflow(
        inputMessage, 
        characterName,
        sessionIdRef.current
      );
      
      // Add bot response to chat
      setMessages(prev => [...prev, {
        content: response,
        isUser: false
      }]);
    } catch (error) {
      console.error('Error getting response:', error);
      // Show error toast
      toast.error("Failed to get a response. Please try again.");
      // Add error message to chat
      setMessages(prev => [...prev, {
        content: "Sorry, I couldn't process your message. Please try again.",
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <p>Start a conversation with {characterName}!</p>
          </div>
        )}
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            content={message.content}
            isUser={message.isUser}
            avatar={message.isUser ? undefined : getCharacterAvatar(characterName)}
            name={message.isUser ? "You" : characterName}
          />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-black/20 border-white/10 text-white placeholder:text-gray-400"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-primary hover:bg-primary/80"
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
