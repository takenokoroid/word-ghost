"use client";

import { Player, TurnType } from "@/lib/types";
import { checkWin } from "@/lib/game-logic";

type Props = {
  players: Player[];
  ghostWord: string;
  majorityWord: string;
  turnType: TurnType;
  finalAnswer: string;
  onNewRound: () => void;
};

export default function ResultReveal({
  players,
  ghostWord,
  majorityWord,
  turnType,
  finalAnswer,
  onNewRound,
}: Props) {
  const won = checkWin(finalAnswer, ghostWord);
  const wolf = players.find((p) => p.isWolf);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto min-h-[60vh] justify-center">
      {/* 勝敗 */}
      <div
        className={`text-3xl font-bold ${won ? "text-green-600" : "text-red-500"}`}
      >
        {won ? "全員正解！" : "残念..."}
      </div>

      {/* みんなの回答 vs ゴースト */}
      <div className="w-full flex flex-col gap-3">
        <div className="rounded-2xl border-2 border-zinc-300 dark:border-zinc-600 px-6 py-4 text-center">
          <p className="text-sm text-zinc-500 mb-1">みんなの回答</p>
          <p className="text-2xl font-bold">{finalAnswer}</p>
        </div>
        <div className="rounded-2xl border-2 border-zinc-300 dark:border-zinc-600 px-6 py-4 text-center">
          <p className="text-sm text-zinc-500 mb-1">ゴーストの対抗語</p>
          <p className="text-2xl font-bold">{ghostWord}</p>
        </div>
      </div>

      {/* お題情報 */}
      <div className="text-center text-sm text-zinc-500">
        <p>
          みんなのワード:{" "}
          <span className="font-bold text-foreground">{majorityWord}</span>
        </p>
        <p className="mt-1">{turnType === "wolf" ? "ウルフ回" : "ゴースト回"}</p>
      </div>

      {/* ウルフ正体 */}
      {turnType === "wolf" && wolf && (
        <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 px-6 py-3 text-center w-full">
          <p className="text-sm text-zinc-500">ウルフの正体</p>
          <p className="text-lg font-bold">{wolf.name}</p>
        </div>
      )}

      <button
        onClick={onNewRound}
        className="w-full rounded-full bg-foreground text-background py-3 text-lg font-bold transition-colors hover:opacity-90 mt-4"
      >
        もう一回
      </button>
    </div>
  );
}
