import { useState } from "react";
import { GameType, PlayerType } from "./type";

const useConnectFour = () => {
    const [board, setBoard] = useState<GameType>(Array(6).fill(Array(7).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>("X");
    const [winner, setWinner] = useState<PlayerType | null>(null);
    const [gameState, setGameState] = useState<"new" | "inprogress" | "tied" | "over">("new");

    const startGameClickHandler = () => {
        setGameState("inprogress");
        setCurrentPlayer("X");
        setWinner(null);
    };

    const checkWinner = ({row, column, player}: {row: number, column: number, player: PlayerType}) => {
        try {
            if (board[row + 1][column] === player) {
                if (board[row + 2][column] === player) {
                    if (board[row + 3][column] === player) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row + 1][column + 1] === player) {
                if (board[row + 2][column + 2] === player) {
                    if (board[row + 3][column + 3] === player) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row + 1][column - 1] === player) {
                if (board[row + 2][column - 2] === player) {
                    if (board[row + 3][column - 3] === player) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row][column + 1] === player) {
                if (board[row][column + 2] === player) {
                    if (board[row][column + 3] === player) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row][column - 1] === player) {
                if (board[row][column - 2] === player) {
                    if (board[row][column - 3] === player) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row - 1][column - 1] === player) {
                if (board[row - 2][column - 2] === player) {
                    if (board[row - 3][column - 3] === player) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }

        try {
            if (board[row - 1][column + 1] === player) {
                if (board[row - 2][column + 2] === player) {
                    if (board[row - 3][column + 3] === player) {
                        return true;
                    }
                }
            }
        } catch (e) { console.log(e) }
    };

    const updateGame = ({row, column, player}: {row: number, column: number, player: PlayerType}) => {
        setBoard(prev => {
            const boardCopy = [...prev];
            boardCopy[row][column] = player;
            return boardCopy;
        });
        if (checkWinner({row, column, player})) {
            setGameState("over");
            setWinner(player);
            return;
        }
        setCurrentPlayer(() => player === "X" ? "O" : "X");
    };

    return {
        board,
        currentPlayer,
        gameState,
        winner,
        startGameClickHandler,
        updateGame
    }
};

export default useConnectFour;
