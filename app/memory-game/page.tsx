"use client";
import useMemoryGame from "../(module)/memory-game/use-memory-game";

const MemoryGame = () => {
  const { game, gameState } = useMemoryGame();
  
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl mb-8">Memory Game</h1>
      <div className="grid grid-cols-4">
          {game.map(g => 
            <div key={g} className="h-32 w-32 border border-gray-300 flex justify-center items-center">
              <div className="text-[6rem] flex justify-center items-center" dangerouslySetInnerHTML={{__html: g }} />
            </div>
          )}
      </div>
    </div>
  )
};

export default MemoryGame;
