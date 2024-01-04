import { useEffect, useState } from "react";

const CARDS = ["&#x1F60A;", "&#x1F604;", "&#x1F600;", "&#x1F603;", "&#x1F601;", "&#x1F60D;"]

const useMemoryGame = () => {
    const [game, setGame] = useState<string[]>([]);
    const [gameState, setGameState] = useState<"new" | "inprogress" | "tied" | "over">("inprogress");

    useEffect(() => {
        shuffleCards();
    }, [])

    const shuffleCards = () => {
        const cards = [...CARDS, ...CARDS].sort(() => Math.random() - 0.5);
        setGame(cards);
    }

    const startOver = () => {
        setGameState("inprogress");
        shuffleCards();
    };

    return {
        game,
        gameState,
        startOver
    }
};

export default useMemoryGame;
