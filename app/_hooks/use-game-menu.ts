import { useRouter } from "next/navigation";
import { useState } from "react";
import useHotKey from "./common/use-hot-keys";

const GAMES = [
  { name: "Bounce Ball", slug: "bounce-ball" },
  { name: "Connect Four", slug: "connect-four" },
  { name: "Memory Game", slug: "memory-game" },
  { name: "Pong", slug: "pong" },
  { name: "Snake Game", slug: "snake-game" },
  { name: "Tetris", slug: "tetris" },
  { name: "Tic Tac Toe", slug: "tic-tac-toe" },
];

const useGameMenu = () => {
  const [selectedGameIdx, setSelectedGameIdx] = useState(0);
  const { push } = useRouter();
  const handleEnterKeyPressed = (_: KeyboardEvent) => {
    console.log("ENTER : ", GAMES[selectedGameIdx].slug);
    push(`/${GAMES[selectedGameIdx].slug}`);
  };

  const handleArrowKeyPressed = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp" && selectedGameIdx === 0) {
      setSelectedGameIdx(GAMES.length - 1);
      return;
    }
    if (event.key === "ArrowUp") {
      setSelectedGameIdx((s) => s - 1);
      return;
    }
    if (event.key === "ArrowDown" && selectedGameIdx === GAMES.length - 1) {
      setSelectedGameIdx(0);
      return;
    }
    setSelectedGameIdx((s) => s + 1);
  };

  useHotKey({ callback: handleEnterKeyPressed, key: "Enter" });
  useHotKey({ callback: handleArrowKeyPressed, key: "ArrowUp" });
  useHotKey({ callback: handleArrowKeyPressed, key: "ArrowDown" });

  return {
    selectedGameIdx,
    games: GAMES,
  };
};

export default useGameMenu;
