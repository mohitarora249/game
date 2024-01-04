import { useState } from "react";

const useMemoryGame = () => {
    const [game, setGame] = useState<string[][] | null>(null);
    const [gameState, setGameState] = useState<"new" | "inprogress" | "tied" | "over">("inprogress");

    const startOver = () => {
        setGameState("inprogress");
        setGame(() => null);
    };

    return {
        game,
        gameState,
        startOver
    }
};

export default useMemoryGame;
