"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import useGameMenu from "./_hooks/use-game-menu";

export default function Home() {
  const { selectedGameIdx, games } = useGameMenu();
  return (
    <main className="flex h-screen w-screen relative flex-col items-center">
      <h1 className="my-8">10 in 1 Games</h1>
      <ol>
        {games.map((game) => (
          <li key={game.slug} className="flex relative items-center">
            {games[selectedGameIdx].slug === game.slug && (
              <ArrowRight
                size={20}
                className="absolute animate-bounce -left-6 font-extrabold text-2xl"
              />
            )}
            <Link href={game.slug}>{game.name}</Link>
          </li>
        ))}
      </ol>
      <div className="absolute bottom-0">
        Note: Use arrow keys to move up and down and enter to select
      </div>
    </main>
  );
}
