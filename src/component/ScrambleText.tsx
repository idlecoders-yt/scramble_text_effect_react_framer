"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

// Symbols to use in the scramble effect
const CHARS = "!@#$%^&*():{};|,.<>/?";

type Props = {
  children: string;
  CYCLE_PER_LETTER?: number;
  SHUFFLE_TIME?: number;
};

export const ScrambleText: React.FC<Props> = ({
  children,
  CYCLE_PER_LETTER,
  SHUFFLE_TIME,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const cyclePerLetter = CYCLE_PER_LETTER ? CYCLE_PER_LETTER : 2;
  const shuffle_time = SHUFFLE_TIME ? SHUFFLE_TIME : 50; //milisec

  const TARGET_TEXT = children;
  const [text, setText] = useState(TARGET_TEXT);

  // Start Animation
  const scrumble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrumbled = TARGET_TEXT.split("")
        .map((chars, index) => {
          if (pos / cyclePerLetter > index) {
            return chars;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      // increase the pos
      setText(scrumbled);
      pos++;

      if (pos >= TARGET_TEXT.length * cyclePerLetter) {
        stopScramble(); //we will create later
      }
    }, shuffle_time);
  };
  // Stop ANimation
  const stopScramble = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setText(TARGET_TEXT);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onViewportEnter={scrumble}
      onViewportLeave={stopScramble}
      onMouseEnter={scrumble}
      onMouseLeave={stopScramble}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <span>{text}</span>
      </div>
    </motion.div>
  );
};
