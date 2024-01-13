"use client";
import { deepClone2DArray } from "@/app/_utils/index";
import { useState } from "react";
import { GameType } from "./types";

const useTickTacToe = () => {
  const [game, setGame] = useState<GameType>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [gameState, setGameState] = useState<
    "new" | "inprogress" | "tied" | "over"
  >("new");
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  const startGameClickHandler = () => {
    setGameState("inprogress");
    setGame([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setCurrentPlayer(1);
    setWinner(null);
  };

  function checkWinner(board: GameType) {
    const size = board.length;

    // Check rows
    for (let i = 0; i < size; i++) {
      if (board[i][0] !== null) {
        let winner = true;
        for (let j = 1; j < size; j++) {
          if (board[i][j] !== board[i][0]) {
            winner = false;
            break;
          }
        }
        if (winner) {
          setWinner(board[i][0]);
          return "over";
        }
      }
    }

    // Check columns
    for (let j = 0; j < size; j++) {
      if (board[0][j] !== null) {
        let winner = true;
        for (let i = 1; i < size; i++) {
          if (board[i][j] !== board[0][j]) {
            winner = false;
            break;
          }
        }
        if (winner) {
          setWinner(board[0][j]);
          return "over";
        }
      }
    }

    // Check diagonals
    if (board[0][0] !== null) {
      let winner = true;
      for (let i = 1; i < size; i++) {
        if (board[i][i] !== board[0][0]) {
          winner = false;
          break;
        }
      }
      if (winner) {
        setWinner(board[0][0]);
        return "over";
      }
    }

    if (board[0][size - 1] !== null) {
      let winner = true;
      for (let i = 1; i < size; i++) {
        if (board[i][size - 1 - i] !== board[0][size - 1]) {
          winner = false;
          break;
        }
      }
      if (winner) {
        setWinner(board[0][size - 1]);
        return "over";
      }
    }

    // If no winner, check for a draw
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] === null) return "inprogress";
      }
    }
    return "tied";
  }

  const onCellClickHandler = (row: number, col: number) => {
    // do nothing if game is over or tied or new
    if (gameState === "over" || gameState === "tied" || gameState === "new")
      return;
    //  do nothing if slot is already taken
    if (game[row][col] !== null) return;

    // update the game
    const gameCopy = deepClone2DArray(game);
    gameCopy[row][col] = currentPlayer;
    setGame(gameCopy);

    // check for gameover
    const state = checkWinner(gameCopy);
    setGameState(state);

    // set player
    if (currentPlayer === 1) setCurrentPlayer(2);
    else setCurrentPlayer(1);
  };

  return {
    checkWinner,
    currentPlayer,
    game,
    gameState,
    onCellClickHandler,
    startGameClickHandler,
    winner,
  };
};

export default useTickTacToe;
