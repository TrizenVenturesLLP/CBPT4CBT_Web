import { useState } from "react";
import { CharacterCard } from "@/components/CharacterCard";
import { ChatWindow } from "@/components/ChatWindow";
import { ArrowLeft, ArrowRight, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const characters = [
  {
    id: "luffy",
    name: "Monkey D. Luffy",
    description: "The future Pirate King with the power of the Gum-Gum Fruit!",
    image: "/monkey.avif",
    followers: "207.5K"
  },
  {
    id: "tony",
    name: "Tony Stark",
    description: "Genius, billionaire, playboy, philanthropist. Also known as Iron Man.",
    image: "/tony_stark.jpg",
    followers: "156.3K"
  },
  {
    id: "peter",
    name: "Peter Parker",
    description: "Your friendly neighborhood Spider-Man!",
    image: "/peter_parker.webp",
    followers: "189.1K"
  }
];

const categories = [
  "Recommend",
  "Play & Fun",
  "Helper",
  "Original",
  "Anime & Game",
  "Fiction & Media",
  "Icon"
];

const Index = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Anime & Game");

  const handleCharacterSelect = (id: string) => {
    setSelectedCharacter(id);
  };

  const selectedChar = characters.find(c => c.id === selectedCharacter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C3E50]">
      {selectedCharacter ? (
        <div className="container mx-auto h-screen p-4">
          <div className="mb-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedCharacter(null)}
              className="text-white hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Characters
            </Button>
          </div>
          <ChatWindow
            characterName={selectedChar?.name || ""}
            characterAvatar={selectedChar?.image || ""}
          />
        </div>
      ) : (
        <div className="container mx-auto py-8 px-4">

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">For You</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-white/20 text-white hover:bg-white/30"
                      : "bg-black/20 text-gray-300 hover:bg-black/30"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                name={character.name}
                description={character.description}
                image={character.image}
                onClick={() => handleCharacterSelect(character.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
