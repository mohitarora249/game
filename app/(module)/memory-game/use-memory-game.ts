import { useEffect, useState } from "react";

const CARDS = ["&#x1F60A;", "&#x1F604;", "&#x1F600;", "&#x1F603;", "&#x1F601;", "&#x1F60D;"]

const useMemoryGame = () => {
    const [game, setGame] = useState<string[]>([]);
    const [gameState, setGameState] = useState<"new" | "inprogress" | "tied" | "over">("inprogress");
    const [filppedCardsIdx, setFilppedCardsIdx] = useState<number[]>([]);
    
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
        setFilppedCardsIdx([]);
    };

    const isGameOver = (cards: string[]) => cards.every(g => g === "");

    const onCardClickHandler = (idx: number) => {
        if (gameState === "over") return;
        if (filppedCardsIdx.length === 0) setFilppedCardsIdx([idx]);
        else if(filppedCardsIdx.length === 1) {
            setFilppedCardsIdx([...filppedCardsIdx, idx]);
            if (game[filppedCardsIdx[0]] === game[idx]) {
                const cards = [...game];
                cards[filppedCardsIdx[0]] = "";
                cards[idx] = "";
                setTimeout(() => { setGame(cards) }, 600);
                if (isGameOver(cards))  setGameState("over");
            } else {
                setTimeout(() => { setFilppedCardsIdx([]) }, 600);
            }
        } else setFilppedCardsIdx([idx]);
    }

    return {
        game,
        gameState,
        startOver,
        filppedCardsIdx,
        onCardClickHandler
    }
};

export default useMemoryGame;
