"use client";
import { Check, X } from "lucide-react";
import useTickTacToe from "../(module)/tic-tac-toe/use-tick-tac-toe";

const TicTacToe = () => {
  const {
    currentPlayer,
    game,
    gameState,
    onCellClickHandler,
    startGameClickHandler,
    winner,
  } = useTickTacToe();
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl mb-8">Tic Tac Toe</h1>
      <div className="grid gird-cols-3 border">
        {game.map((row, i) => (
          <div key={`row-${i}`} className="flex">
            {row.map((cell, j) => (
              <Cell
                key={`cell-${i}-${j}`}
                val={cell}
                row={i}
                col={j}
                onClick={onCellClickHandler}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="text-2xl my-4 flex flex-col space-y-4">
        {gameState === "inprogress" && (
          <span>Player {currentPlayer} to play</span>
        )}
        {(gameState === "over" ||
          gameState === "new" ||
          gameState === "tied") && (
          <button onClick={startGameClickHandler} className="">
            Start
          </button>
        )}
        {gameState === "tied" && <span>Game tied!</span>}
        {winner && <span>Palyer {winner} wins!</span>}
      </p>
    </div>
  );
};

export default TicTacToe;

type CellProps = {
  val: number | null;
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
};

const Cell = ({ row, col, onClick, val }: CellProps) => {
  const onClickHandler = () => onClick(row, col);
  return (
    <div
      onClick={onClickHandler}
      className="w-24 h-24 border text-gray-600 flex justify-center items-center font-semibold text-2xl"
    >
      {!!val && val === 1 && <Check className="h-12 w-12" />}
      {!!val && val === 2 && <X className="h-12 w-12" />}
    </div>
  );
};
