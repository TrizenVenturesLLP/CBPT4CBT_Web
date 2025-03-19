
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogflowChat } from "./DialogflowChat";
import { DialogflowMessengerDirect } from "./DialogflowMessengerDirect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DIALOGFLOW_AGENTS } from "../config/agents";
import { toast } from "sonner";

interface ChatWindowProps {
  characterName: string;
  characterAvatar: string;
}

export function ChatWindow({ characterName, characterAvatar }: ChatWindowProps) {
  const [chatMode, setChatMode] = useState<"custom" | "direct">("custom");
  
  // Get agent config for the character
  const agentConfig = DIALOGFLOW_AGENTS[characterName] || null;
  
  if (!agentConfig) {
    toast.error(`Configuration missing for character: ${characterName}`);
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-black/20 rounded-lg overflow-hidden border border-white/10">
      <div className="p-4 border-b border-white/10 bg-black/30">
        <div className="flex items-center justify-between">
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
          <Tabs 
            defaultValue="custom" 
            value={chatMode}
            onValueChange={(value) => setChatMode(value as "custom" | "direct")}
          >
            <TabsList className="bg-black/30">
              <TabsTrigger value="custom">Custom UI</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        {chatMode === "custom" ? (
          <DialogflowChat 
            characterName={characterName} 
            agentId={agentConfig?.agentId || ""}
          />
        ) : (
          <DialogflowMessengerDirect characterName={characterName} />
        )}
      </div>
    </div>
  );
}
