import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";

interface CharacterCardProps {
  name: string;
  description: string;
  image: string;
  onClick: () => void;
}

export function CharacterCard({ name, description, image, onClick }: CharacterCardProps) {
  return (
    <Card className="w-full bg-black/20 border-none text-white hover:bg-black/30 transition-all duration-300 hover:scale-105">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16 ring-2 ring-primary/50">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl mb-1">{name}</CardTitle>
          <CardDescription className="line-clamp-2 text-gray-400">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button
          onClick={onClick}
          className="flex-1 bg-primary/20 hover:bg-primary/30 text-primary-foreground gap-2"
        >
          <MessageCircle size={18} />
          Chat Now
        </Button>
        <Button variant="ghost" className="px-3 text-gray-400 hover:text-white hover:bg-white/10">
          <Heart size={18} />
        </Button>
      </CardContent>
    </Card>
  );
}