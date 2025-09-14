import React, { useEffect, useState, useRef } from "react";
import "./VisualNovel.css";

interface StoryScene {
  background: string;
  text: string;
  soundEffect?: string;
  choices?: { text: string; next: string }[];
  next?: string;
}

interface VisualNovelProps {
  story: Record<string, StoryScene>;
  onClose: () => void;
}

const VisualNovel: React.FC<VisualNovelProps> = ({ story, onClose }) => {
  const [currentSceneId, setCurrentSceneId] = useState("start");
  const [dialogueText, setDialogueText] = useState("");
  const [choices, setChoices] = useState<StoryScene['choices'] | undefined>([]);
  const [showGame, setShowGame] = useState(false);
  
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const currentScene = story[currentSceneId];

  useEffect(() => {
    if (!showGame || !currentScene) return;

    if (gameContainerRef.current) {
      if (currentScene.soundEffect === "rumble") {
        gameContainerRef.current.classList.add("rumble-effect");
      } else {
        gameContainerRef.current.classList.remove("rumble-effect");
      }
    }

    // This is the key change: render the entire text at once
    const renderTimeout = setTimeout(() => {
      setDialogueText(currentScene.text);
      setChoices(currentScene.choices);
      if (!currentScene.choices && currentScene.next) {
        setTimeout(() => showScene(currentScene.next!), 1500);
      }
    }, 50); // A small delay ensures the component has rendered

    return () => clearTimeout(renderTimeout);
  }, [currentSceneId, showGame]);

  const showScene = (sceneId: string) => {
    if (!story[sceneId]) return;
    setCurrentSceneId(sceneId);
  };
  
  const handleChoiceClick = (nextSceneId: string) => {
    showScene(nextSceneId);
  };

  const startGame = () => {
    setShowGame(true);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div 
        id="game-container" 
        ref={gameContainerRef} 
        className="relative w-full max-w-5xl aspect-[16/9] bg-black rounded-lg overflow-hidden shadow-2xl border-4 border-gray-700"
      >
        <button onClick={onClose} className="absolute top-3 right-3 z-50 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-500">✕</button>
        
        {!showGame && (
          <div id="start-screen" className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-40 text-center p-4">
            <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4">The Tremor</h1>
            <p className="text-gray-300 mb-6 sm:mb-8 max-w-2xl">
              It's just after 4 PM at your school in Guwahati. You're finishing up
              some homework when the room starts to shake. It's an earthquake!
            </p>
            <button onClick={startGame} className="choice-button bg-violet-700 text-white font-bold py-3 px-6 text-lg sm:text-xl sm:px-8 rounded-lg hover:bg-violet-600 shadow-lg">
              Begin
            </button>
          </div>
        )}

        {showGame && (
          <>
            <img 
              src={currentScene?.background} 
              alt="Game Background" 
              className="absolute top-0 left-0 w-full h-full object-cover" 
            />
            
            <div id="ui-container" className="absolute bottom-0 left-0 w-full p-4 sm:p-6 text-shadow">
              <div className="bg-black bg-opacity-40 rounded-xl p-4 sm:p-6 text-white backdrop-blur-sm border border-white/20">
                <p id="dialogue-text" className="text-lg sm:text-sm md:text-xl h-14 sm:h-18 md:h-22 pl-2">
                  {dialogueText}
                </p>
              </div>
              <div id="choices-container" className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
                {choices && choices.map((choice, index) => (
                  <button key={index} onClick={() => handleChoiceClick(choice.next)} className="choice-button bg-black bg-opacity-70 text-white font-bold py-2 px-6 rounded-lg hover:bg-violet-700 text-lg shadow-md w-full sm:w-auto">
                    {choice.text}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VisualNovel;