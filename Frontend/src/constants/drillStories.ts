import { IoSunnyOutline, IoRainyOutline, IoFlameOutline } from 'react-icons/io5';
import type { DrillContent } from '../types';

export const earthquakeStory = {
  start: {
    background: "/earthquake/image_2_initial_jolt.png",
    soundEffect: "rumble",
    text: "The shaking gets stronger! The ground is moving, and things are falling from the shelves. What should you do right now?",
    choices: [
      { text: "Get under a desk", next: "hide_under_desk" },
      { text: "Run for the door", next: "run_outside" },
      { text: "Stay still", next: "freeze_in_panic" },
    ],
  },
  hide_under_desk: {
    background: "/earthquake/image_3_under_desk.png",
    soundEffect: "rumble",
    text: "You quickly get under a strong desk and hold on tight. Good choice! A big fan falls from the ceiling and lands right where you were standing. The desk protected you.",
    next: "shaking_stops",
  },
  run_outside: {
    background: "/earthquake/image_4_running_for_door.png",
    text: "You panic and run for the door. But running during an earthquake is dangerous. A heavy light falls and blocks the way. This is not a safe choice. (Game Over)",
    choices: [{ text: "Try Again", next: "start" }],
  },
  freeze_in_panic: {
    background: "/earthquake/image_2_initial_jolt.png",
    soundEffect: "rumble",
    text: "You're too scared to move. A window breaks nearby, and glass flies through the air. You're okay, but that was very close. Standing in the open is risky.",
    next: "shaking_stops",
  },
  shaking_stops: {
    background: "/earthquake/image_5_aftermath.png",
    text: "The shaking stops. The classroom is a mess. Everything is quiet now. You need to get outside to a safe, open area. What's the best way out?",
    choices: [
      { text: "Check the hallway", next: "cautious_evacuation" },
      { text: "Wait for help", next: "stay_put" },
      { text: "Shout for help", next: "shout_for_help" },
    ],
  },
  cautious_evacuation: {
    background: "/earthquake/image_6_cautious_evacuation.png",
    text: "You carefully open the door. The hallway is damaged, but you can walk through it. You see the green 'EXIT' sign far away.",
    choices: [
      { text: "Take the stairs", next: "take_stairs" },
      { text: "Use the elevator", next: "use_elevator" },
    ],
  },
  stay_put: {
    background: "/earthquake/image_7_waiting.png",
    soundEffect: "rumble",
    text: "You decide to stay and wait for help. But then, a strong aftershock begins! The damaged ceiling collapses. Waiting inside was not safe. (Game Over)",
    choices: [{ text: "Try Again", next: "start" }],
  },
  shout_for_help: {
    background: "/earthquake/image_5_aftermath.png",
    text: "You shout for help, but no one answers. In a disaster, you often have to rely on yourself to get to safety first. It's time to find a way out.",
    next: "cautious_evacuation",
  },
  use_elevator: {
    background: "/earthquake/image_8_elevator.png",
    text: "You run to the elevator. This is a big mistake. After an earthquake, the power can fail. The doors close, and the elevator stops. You are trapped in the dark. (Game Over)",
    choices: [{ text: "Try Again", next: "start" }],
  },
  take_stairs: {
    background: "/earthquake/image_9_stairs.png",
    text: "You choose the stairs. This is the correct way to exit a building during an emergency. You walk down carefully, holding the railing.",
    next: "outside_safe",
  },
  outside_safe: {
    background: "/earthquake/image_10_outside_safe.png",
    text: "You get outside to the school's open field, away from the building. Other students and teachers are already here. You are safe because you made smart choices! (You Win!)",
    choices: [{ text: "Play Again", next: "start" }],
  },
};

export const fireStory = {
  start: {
    background: "/fire/fire_background.png",
    text: "You smell smoke! The fire alarm starts ringing. What do you do?",
    choices: [
      { text: "Crawl low to the ground", next: "crawl_low" },
      { text: "Run to the door", next: "run_for_door" },
    ],
  },
};

export const cycloneStory = {
  start: {
    background: "/images/cyclone_background.png",
    text: "The weather forecast warns of an approaching cyclone. What's your first step?",
    choices: [
      { text: "Secure your home", next: "secure_home" },
      { text: "Go outside to check", next: "check_outside" },
    ],
  },
};

export const drillContent: DrillContent[] = [
  {
    title: 'Earthquake Drill',
    description: 'Practice drop, cover, and hold on.',
    icon: IoSunnyOutline,
    story: earthquakeStory,
  },
  {
    title: 'Fire Drill',
    description: 'Learn how to safely evacuate during a fire.',
    icon: IoFlameOutline,
    story: fireStory,
  },
  {
    title: 'Cyclone Prep',
    description: 'Prepare your home and family for a severe storm.',
    icon: IoRainyOutline,
    story: cycloneStory,
  },
];