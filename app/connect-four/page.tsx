"use client";

import { useId } from "react";
import { PlayerType } from "../(module)/connect-four/type";
import useConnectFour from "../(module)/connect-four/use-connect-four";
import { cn } from "../(utils)";

const ConnectFour = () => {

  const { board, currentPlayer, gameState, startOver, updateGame, winner, onMouseOverHandler } = useConnectFour();

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl mb-8">Connect Four</h1>
      <div className="relative">
        {/* <div className="h-16 w-16 absolute top-[-32px] ml-1">
          <div className={cn("rounded-full h-5/6 w-5/6", currentPlayer === "X" ? "bg-blue-400" : "bg-red-400")} />
        </div> */}
        {board.map((b, idx) => (
          <div key={useId()} className="flex">
            {b.map((r, i) => <Cell key={useId()} row={idx} col={i} onMouseClickHandler={updateGame} onMouseOverHandler={onMouseOverHandler} data={r} />)}
          </div>
        ))}
      </div>
      <p className="text-2xl my-4 flex flex-col space-y-4">
        {gameState === "inprogress" && (
          <span>Player {currentPlayer} to play</span>
        )}
        <button onClick={startOver}>Restart</button>
        {gameState === "tied" && <span>Game tied!</span>}
        {winner && <span>Palyer {winner} wins!</span>}
      </p>
    </div>
  )
};

type Props = {
  data: PlayerType | null;
  onMouseOverHandler: ({row, col}: {row: number, col: number}) => void;
  onMouseClickHandler: ({row, col}: {row: number, col: number}) => void;
  row: number;
  col: number;
}

const Cell = ({ row, col, data, onMouseOverHandler, onMouseClickHandler }: Props) => {

  const onMouseOver = () => {
    onMouseOverHandler({col,row});
  }
  const onClick = () => {
    onMouseClickHandler({col,row});
  }

  return (
    <div onMouseOver={onMouseOver} onClick={onClick} className={cn("h-16 w-16 border border-gray-300 bg-gray-200 flex justify-center items-center")}>
      <div className={cn("rounded-full h-5/6 w-5/6", data === null && "bg-white", data === "X" && "bg-blue-400", data === "O" && "bg-red-400")} />
    </div>
  )
}


export default ConnectFour;
