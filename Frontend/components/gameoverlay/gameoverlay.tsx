import React, { useEffect } from "react";
import "./VisualNovel.css";

interface Props {
  onClose: () => void;
}

const GameOverlay: React.FC<Props> = ({ onClose }) => {
  useEffect(() => {
    // --- DOM ELEMENTS ---
    const gameContainer = document.getElementById("game-container")!;
    const backgroundImage = document.getElementById("background-image") as HTMLImageElement;
    const dialogueText = document.getElementById("dialogue-text")!;
    const choicesContainer = document.getElementById("choices-container")!;
    const startScreen = document.getElementById("start-screen")!;
    const startButton = document.getElementById("start-button")!;

    // --- STORY DATA ---
    const story: Record<string, any> = {
      start: {
        background: "/images/image_2_initial_jolt.png",
        soundEffect: "rumble",
        text: "The shaking gets stronger! The ground is moving, and things are falling from the shelves. What should you do right now?",
        choices: [
          { text: "Get under a desk", next: "hide_under_desk" },
          { text: "Run for the door", next: "run_outside" },
          { text: "Stay still", next: "freeze_in_panic" },
        ],
      },
      hide_under_desk: {
        background: "/images/image_3_under_desk.png",
        soundEffect: "rumble",
        text: "You quickly get under a strong desk and hold on tight. Good choice! A big fan falls from the ceiling and lands right where you were standing. The desk protected you.",
        next: "shaking_stops",
      },
      run_outside: {
        background: "/images/image_4_running_for_door.png",
        text: "You panic and run for the door. But running during an earthquake is dangerous. A heavy light falls and blocks the way. This is not a safe choice. (Game Over)",
        choices: [{ text: "Try Again", next: "start" }],
      },
      freeze_in_panic: {
        background: "/images/image_2_initial_jolt.png",
        soundEffect: "rumble",
        text: "You're too scared to move. A window breaks nearby, and glass flies through the air. You're okay, but that was very close. Standing in the open is risky.",
        next: "shaking_stops",
      },
      shaking_stops: {
        background: "/images/image_5_aftermath.png",
        text: "The shaking stops. The classroom is a mess. Everything is quiet now. You need to get outside to a safe, open area. What's the best way out?",
        choices: [
          { text: "Check the hallway", next: "cautious_evacuation" },
          { text: "Wait for help", next: "stay_put" },
          { text: "Shout for help", next: "shout_for_help" },
        ],
      },
      cautious_evacuation: {
        background: "/images/image_6_cautious_evacuation.png",
        text: "You carefully open the door. The hallway is damaged, but you can walk through it. You see the green 'EXIT' sign far away.",
        choices: [
          { text: "Take the stairs", next: "take_stairs" },
          { text: "Use the elevator", next: "use_elevator" },
        ],
      },
      stay_put: {
        background: "/images/image_7_waiting.png",
        soundEffect: "rumble",
        text: "You decide to stay and wait for help. But then, a strong aftershock begins! The damaged ceiling collapses. Waiting inside was not safe. (Game Over)",
        choices: [{ text: "Try Again", next: "start" }],
      },
      shout_for_help: {
        background: "/images/image_5_aftermath.png",
        text: "You shout for help, but no one answers. In a disaster, you often have to rely on yourself to get to safety first. It's time to find a way out.",
        next: "cautious_evacuation",
      },
      use_elevator: {
        background: "/images/image_8_elevator.png",
        text: "You run to the elevator. This is a big mistake. After an earthquake, the power can fail. The doors close, and the elevator stops. You are trapped in the dark. (Game Over)",
        choices: [{ text: "Try Again", next: "start" }],
      },
      take_stairs: {
        background: "/images/image_9_stairs.png",
        text: "You choose the stairs. This is the correct way to exit a building during an emergency. You walk down carefully, holding the railing.",
        next: "outside_safe",
      },
      outside_safe: {
        background: "/images/image_10_outside_safe.png",
        text: "You get outside to the school's open field, away from the building. Other students and teachers are already here. You are safe because you made smart choices! (You Win!)",
        choices: [{ text: "Play Again", next: "start" }],
      },
    };

    let currentSceneId = "start";
    let isTyping = false;

    function typeWriter(text: string, i = 0) {
      isTyping = true;
      if (i < text.length) {
        dialogueText.innerHTML =
          text.substring(0, i + 1) + '<span class="animate-ping">|</span>';
        setTimeout(() => typeWriter(text, i + 1), 30);
      } else {
        dialogueText.innerHTML = text;
        isTyping = false;
        displayChoices(story[currentSceneId]);
      }
    }

    function displayChoices(scene: any) {
      choicesContainer.innerHTML = "";
      if (scene.choices) {
        scene.choices.forEach((choice: any) => {
          const button = document.createElement("button");
          button.innerText = choice.text;
          button.className =
            "choice-button bg-black bg-opacity-70 text-white font-bold py-2 px-6 rounded-lg hover:bg-violet-700 text-lg shadow-md w-full sm:w-auto";
          button.onclick = () => showScene(choice.next);
          choicesContainer.appendChild(button);
        });
      } else if (scene.next) {
        const button = document.createElement("button");
        button.innerText = "Next →";
        button.className =
          "choice-button bg-black bg-opacity-70 text-white font-bold py-2 px-6 rounded-lg hover:bg-violet-700 text-lg shadow-md w-full sm:w-auto";
        button.onclick = () => showScene(scene.next);
        choicesContainer.appendChild(button);
      }
    }

    function showScene(sceneId: string) {
      if (!story[sceneId] || isTyping) return;

      currentSceneId = sceneId;
      const scene = story[sceneId];

      if (scene.soundEffect === "rumble") {
        gameContainer.classList.add("rumble-effect");
      } else {
        gameContainer.classList.remove("rumble-effect");
      }

      if (backgroundImage.src !== scene.background) {
        backgroundImage.style.opacity = "0";
        setTimeout(() => {
          backgroundImage.src = scene.background;
          backgroundImage.style.opacity = "1";
        }, 700);
      }

      choicesContainer.innerHTML = "";
      typeWriter(scene.text);
    }

    function startGame() {
      startScreen.style.transition = "opacity 0.5s";
      startScreen.style.opacity = "0";
      setTimeout(() => {
        startScreen.style.display = "none";
        showScene("start");
      }, 500);
    }

    startButton.addEventListener("click", startGame);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div
        id="game-container"
        className="relative w-full max-w-5xl aspect-[16/9] bg-black rounded-lg overflow-hidden shadow-2xl border-4 border-gray-700"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-500"
        >
          ✕
        </button>

        {/* Background Image */}
        <img
          id="background-image"
          src="/images/image_1_calm_before.png"
          alt="Game Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Character Container */}
        <div
          id="character-container"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-3/5 flex items-end justify-center"
        >
          <img
            id="character-sprite"
            src=""
            alt="Character"
            className="h-full object-contain drop-shadow-2xl"
            style={{ opacity: 0 }}
          />
        </div>

        {/* UI */}
        <div
          id="ui-container"
          className="absolute bottom-0 left-0 w-full p-4 sm:p-6 text-shadow"
        >
          <div className="bg-black bg-opacity-40 rounded-xl p-4 sm:p-6 text-white backdrop-blur-sm border border-white/20">
            <p
              id="dialogue-text"
              className="text-lg sm:text-sm md:text-xl h-14 sm:h-18 md:h-22"
            ></p>
          </div>
          <div
            id="choices-container"
            className="flex flex-col sm:flex-row justify-end gap-4 mt-4"
          ></div>
        </div>

        {/* Start Screen */}
        <div
          id="start-screen"
          className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-40 text-center p-4"
        >
          <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4">
            The Tremor
          </h1>
          <p className="text-gray-300 mb-6 sm:mb-8 max-w-2xl">
            It's just after 4 PM at your school in Guwahati. You're finishing up
            some homework when the room starts to shake. It's an earthquake!
          </p>
          <button
            id="start-button"
            className="choice-button bg-violet-700 text-white font-bold py-3 px-6 text-lg sm:text-xl sm:px-8 rounded-lg hover:bg-violet-600 shadow-lg"
          >
            Begin
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverlay;
