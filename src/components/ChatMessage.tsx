import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Volume2 } from "lucide-react";
import { Button } from "./ui/button";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  avatar?: string;
  name: string;
  onSpeak?: () => void;
}

export function ChatMessage({ content, isUser, avatar, name, onSpeak }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full gap-4 animate-message-fade-in opacity-0",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatar} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 max-w-[70%]">
        <span className="text-sm text-muted-foreground">{name}</span>
        <div
          className={cn(
            "rounded-lg p-4 flex gap-2 items-start",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-[#D3E3FD] text-[#000000]"
          )}
        >
          <p className="text-sm">{content}</p>
          {!isUser && onSpeak && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0 hover:bg-secondary/20"
              onClick={onSpeak}
            >
              <Volume2 size={14} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}