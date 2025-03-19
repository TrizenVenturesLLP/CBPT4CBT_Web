import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DialogflowMessenger from "./DialogflowMessenger";

interface ChatWindowProps {
  characterName: string;
  characterAvatar: string;
}

export function ChatWindow({ characterName, characterAvatar }: ChatWindowProps) {
  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-black/20 rounded-lg overflow-hidden border border-white/10">
      <div className="p-4 border-b border-white/10 bg-black/30">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/50">
            <AvatarImage src={characterAvatar} alt={characterName} />
            <AvatarFallback>{characterName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-white">{characterName}</h2>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        {/* Use DialogflowMessenger component */}
        <DialogflowMessenger />
      </div>
    </div>
  );
}


