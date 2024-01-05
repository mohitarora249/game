"use client";
import useMemoryGame from "../(module)/memory-game/use-memory-game";

const MemoryGame = () => {
  const { game, gameState, onCardClickHandler, filppedCardsIdx, startOver } = useMemoryGame();
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl mb-8">Memory Game</h1>
      <div className="grid grid-cols-4">
        {game.map((g, i) =>
          <Cell filppedCardsIdx={filppedCardsIdx} emoji={g} idx={i} onCardClickHandler={onCardClickHandler} />
        )}
      </div>
      <p className="text-2xl my-4 flex flex-col space-y-4">
        <button onClick={startOver}>Restart</button>
        {gameState === "over" && <span>You won!</span>}
      </p>
    </div>
  )
};

type Props = {
  idx: number;
  emoji: string;
  filppedCardsIdx: number[];
  onCardClickHandler: (idx: number) => void;
}

const Cell = ({ idx, onCardClickHandler, emoji, filppedCardsIdx }: Props) => {
  const onClick = () => {
    onCardClickHandler(idx)
  }
  if(emoji === "") return <div className="h-32 w-32 border border-gray-300 flex justify-center items-center" />
  return (
    <div onClick={onClick} key={emoji} className="h-32 w-32 border border-gray-300 flex justify-center items-center">
      {filppedCardsIdx.indexOf(idx) > -1 ? <div className="text-[6rem] flex justify-center items-center" dangerouslySetInnerHTML={{ __html: emoji }} /> : <div className="text-xl flex justify-center items-center">Flip</div>}
    </div>
  )
}

export default MemoryGame;
