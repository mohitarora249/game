import { useState } from "react";
import { GameType, PlayerType } from "./type";
import { deepClone2DArray } from "@/app/(utils)";

const useConnectFour = () => {
    const [board, setBoard] = useState<GameType>(Array(6).fill(Array(7).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>("X");
    const [winner, setWinner] = useState<PlayerType | null>(null);
    const [gameState, setGameState] = useState<"new" | "inprogress" | "tied" | "over">("inprogress");

    const startOver = () => {
        setGameState("inprogress");
        setCurrentPlayer("X");
        setWinner(null);
        setBoard(() => Array(6).fill(Array(7).fill(null)));
    };

    const checkWinner = ({ row, column, player }: { row: number, column: number, player: PlayerType }) => {
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

    // const checkGameTied = () => {
    //     return !board.some(b => b.some(((s) => s === null)))
    // }

    const updateGame = ({ row, col }: { row: number, col: number }) => {
        if (gameState === "over" || gameState === "tied") return;
        let rowToBeUpdated = board.findIndex((rowArr, index) => {
            // Find the first row that is occupied or at the bottom of the board
            if (rowArr[col] !== null || index === board.length - 1) return index;
        });
        // Only go up one row if the slot is NOT at the bottom
        if (rowToBeUpdated !== (board.length - 1)) rowToBeUpdated -= 1;
        if (board[rowToBeUpdated][col] !== null) rowToBeUpdated -= 1;
        if (rowToBeUpdated > -1) {
            setBoard(prev => {
                const boardCopy = deepClone2DArray(prev);
                boardCopy[rowToBeUpdated][col] = currentPlayer;
                console.table(boardCopy)
                return boardCopy;
            });
            if (checkWinner({ row: rowToBeUpdated, column: col, player: currentPlayer })) {
                setGameState("over");
                setWinner(currentPlayer);
                return;
            }
            // if (checkGameTied()) {
            //     console.log("check game tied")
            //     setGameState("tied");
            //     return;
            // }
            setCurrentPlayer(() => currentPlayer === "X" ? "O" : "X");
        }
    };

    const onMouseOverHandler = ({ row, col }: { row: number, col: number }) => {
        // console.log("onMouseOverHandler : ", { row, col });
    }

    return {
        board,
        currentPlayer,
        gameState,
        winner,
        startOver,
        updateGame,
        onMouseOverHandler
    }
};

export default useConnectFour;
